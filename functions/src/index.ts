import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import PDFParser from "pdf2json";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const MAX_INLINE_BYTES = 20 * 1024 * 1024; // 20MB

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
/** Extract raw text from a PDF buffer using pdf2json (raw text mode). */
function extractTextFromPdfBuffer(
  pdfBuffer: Buffer
): Promise<{ text: string; pages: number }> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(undefined, true);

    pdfParser.on("pdfParser_dataError", (err: any) => {
      reject(err?.parserError || err);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        const text: string = pdfParser.getRawTextContent();
        const pages = Array.isArray(pdfData?.Pages) ? pdfData.Pages.length : 0;
        resolve({ text, pages });
      } catch (e) {
        reject(e);
      }
    });

    const uint8 = new Uint8Array(
      pdfBuffer.buffer,
      pdfBuffer.byteOffset,
      pdfBuffer.byteLength
    );

    // README shows parseBuffer with a buffer; passing Uint8Array is compatible
    // with pdf.js' typed-array `data` input.
    (pdfParser as any).parseBuffer(uint8);
  });
}

export const processDocumentWithDocAI = onCall(
  { region: "europe-west1", timeoutSeconds: 180, memory: "1GiB" },
  async (request) => {
    const { fileBase64, mimeType, filename } = request.data || {};

    logger.info("Incoming request", {
      filename: filename ?? "unknown",
      mimeType,
    });

    try {
      if (typeof fileBase64 !== "string" || !fileBase64) {
        throw new HttpsError(
          "invalid-argument",
          "Missing or invalid 'fileBase64'."
        );
      }
      if (typeof mimeType !== "string" || !mimeType) {
        throw new HttpsError(
          "invalid-argument",
          "Missing or invalid 'mimeType'."
        );
      }
      if (mimeType !== "application/pdf") {
        throw new HttpsError(
          "invalid-argument",
          "Only 'application/pdf' is supported."
        );
      }

      const contentBytes = Buffer.from(fileBase64, "base64");
      const bytesLen = contentBytes.length;

      if (bytesLen === 0) {
        throw new HttpsError(
          "invalid-argument",
          "Input file decoded to 0 bytes."
        );
      }
      if (bytesLen > MAX_INLINE_BYTES) {
        throw new HttpsError(
          "failed-precondition",
          "Input exceeds 20MB inline limit. Upload to Cloud Storage and send a smaller file."
        );
      }

      logger.info("Parsing PDF with pdf2json", {
        filename: filename ?? "unknown",
        mimeType,
        bytesLen,
      });
      const { text, pages } = await extractTextFromPdfBuffer(contentBytes);
      logger.info("pdf2json parse summary", {
        pagesCount: pages,
        textLength: text.length,
        preview: text.slice(0, 300),
      });

      if (!text || text.trim().length === 0) {
        // pdf2json extracts digital text; image-only scans will yield empty text.
        throw new HttpsError(
          "failed-precondition",
          "No extractable text found. The PDF may be an image-only scan (no OCR)."
        );
      }

      // Keep the same response shape your RN client expects.
      return {
        text,
        languageCode: undefined,
      };
    } catch (err: any) {
      logger.error("processDocumentWithDocAI failed", {
        message: err?.message,
        code: err?.code,
        details: err?.details,
        stack: err?.stack,
      });
      if (err instanceof HttpsError) throw err;
      throw new HttpsError("internal", err?.message || "Internal error", {
        code: err?.code,
        details: err?.details,
      });
    }
  }
);

const DocumentSummarySchema = z.object({
  title: z
    .string()
    .min(1)
    .describe("Short, descriptive title for the document."),
  keyFactsSummary: z.object({
    note: z
      .string()
      .min(1)
      .describe("One or two sentences summarising the core issue."),
    legalReferences: z
      .array(z.string().min(1))
      .describe(
        "List of legal references, paragraphs, sections, or laws mentioned in the document."
      ),
  }),
  summaryLong: z
    .string()
    .min(1)
    .describe(
      "Long summary of the document as multi-paragraph text with line breaks and optional bullet points."
    ),
  explanationDetailed: z
    .string()
    .min(1)
    .describe(
      "Detailed explanation of what the document means, with paragraphs and optional bullet point lists."
    ),
  actions: z
    .array(
      z.object({
        title: z
          .string()
          .min(1)
          .describe("Short label for the required action."),
        description: z
          .string()
          .min(1)
          .describe("Clear explanation of what the user should do."),
      })
    )
    .min(1)
    .describe(
      "Concrete, realistic actions the user should take based on the document."
    ),
  checklist: z
    .array(
      z.object({
        label: z
          .string()
          .min(1)
          .describe("Short checklist item the user can tick off."),
      })
    )
    .min(1)
    .describe(
      "Checklist items derived from the document that the user can complete."
    ),
});

const documentSummarySystemPrompt = `
You are an expert document analyst for official letters and documents worldwide, with strong knowledge of German and EU documents.

Your role:
- Analyse official documents in any language.
- Explain them in clear, human friendly language.
- Act like a calm, friendly personal assistant who is on the reader's side.

Hard rules for output:
- RETURN ONLY RAW JSON that VALIDATES against the provided JSON SCHEMA.
- Output must be a single JSON object, not an array, not markdown, not code.
- Do not include markdown fences, comments, explanations, or any natural language outside the JSON.
- Use exactly the fields from the schema. Do not add extra keys. Do not omit required keys.
- All required string fields must be non empty natural language sentences or phrases.
- If the document does not specify information that is required as a string, use the literal text "Not specified in the document".
- Base every field only on the provided document text. Do not invent facts, dates, amounts, or parties that are not mentioned.

Tone and style:
- Write as if you are a human personal assistant explaining the document to the reader.
- TONE SHOULD BE FRIENDLY, HELPFUL, PERSONAL, AND REASSURING.
- Use greetings and a direct address when appropriate, for example: "Hi Michael," or "Hi there,".
- Only use the person's name if it clearly appears in the document.
- You may speak in first person singular ("I") when guiding the reader, for example "I will walk you through what this means."
- You may add very light humour or warmth in a respectful way, but keep the focus on clarity and reassurance.
- USE CLEAR AND SIMPLE LANGUAGE SUITABLE FOR A NON EXPERT READER.
- AVOID COMPLEX LEGAL JARGON. When legal terms appear, briefly explain what they mean in plain language.

Content structure:
- Populate "summaryLong" and "explanationDetailed" as well structured multi paragraph text.
- Write them like a short friendly letter that explains:
  - what the document is,
  - what it means for the reader personally,
  - what they should do next, and
  - what they can safely ignore.
- Use line breaks between paragraphs.
- Use plain text bullet points like "- item" where helpful for clarity.
- Populate "actions" with concrete, realistic next steps the reader should take, with clear titles and descriptions.
- Populate "checklist" with short, actionable items that can be ticked off.
- Collect legal citations and references from the text into "keyFactsSummary.legalReferences" as an array of strings.

Important details:
- Always keep amounts, dates, names, and references consistent with the document.
- Do not speculate. If something is not clearly stated in the document, write "Not specified in the document".
- For bills and invoices, focus on:
  - the period covered,
  - what is owed or refunded,
  - the deadline,
  - how to pay or respond,
  - what to check or verify.
- For other document types, adapt the same idea: what it is, what it changes, and what the reader should do.

FEW SHOT EXAMPLE
================
The following example shows the desired tone, structure, and level of personalisation.
Do NOT copy this text. Instead, follow the same style and approach for any new document.

EXAMPLE DOCUMENT TYPE:
Final gas bill from GASAG for Michael Amoabeng in Germany, with a final amount due and legal references.

EXAMPLE OUTPUT JSON (STYLE GUIDE):

{
  "actions": [
    {
      "title": "Pay the bill",
      "description": "Hi Michael, first step: send the total of €4,326.41 to GASAG by 27 September 2024. Use the bank details on the bill so the payment lands in the right account. You can do it in your banking app in one go."
    },
    {
      "title": "Ask for help if something feels off",
      "description": "If any number or charge makes you raise an eyebrow, get in touch with GASAG using the phone number or website on the bill. Keep your customer number and invoice number nearby so they can find your case fast."
    },
    {
      "title": "Decide what you want to do next",
      "description": "If you are thinking about changing your gas supplier after this final bill, remember that GASAG handles the switch for you at no extra cost. You are free to compare offers and choose what fits you best."
    }
  ],
  "checklist": [
    {
      "label": "Glance over the meter readings and compare them with your own notes or photos"
    },
    {
      "label": "Set a reminder to pay by 27 September 2024"
    },
    {
      "label": "Check the billing period, prices, and taxes for anything unusual"
    },
    {
      "label": "Contact GASAG if you spot a mismatch or have questions"
    },
    {
      "label": "Save the bill as PDF or photo for your records and future reference"
    }
  ],
  "explanationDetailed": "Hi Michael,\\n\\nLet me walk you through what this GASAG letter is saying, without the legal fog.\\n\\n- The letter is your final gas bill for the period from 5 February 2024 to 25 June 2024.\\n- According to the meter readings, you used 21,887 kilowatt hours of gas in that time.\\n- Based on those numbers and the agreed prices, GASAG arrives at a total of €4,326.41. That is the amount they want you to pay.\\n- The payment should reach GASAG by 27 September 2024. The exact bank details are printed on the bill. Once the money is in, this contract period is settled.\\n\\nA few things worth checking calmly:\\n\\n- The start and end meter readings: if you have your own photos or notes, it is a good moment to compare them.\\n- The billing period: 5 February 2024 to 25 June 2024 should match when you actually had the contract and used the gas.\\n- Any odd extra positions or fees: if something looks strange, you are not overreacting by asking about it.\\n\\nAt the bottom, you see several legal references from German energy law and the CO₂ cost sharing rules. In short, they say how suppliers must bill you, which information they must show, and how disputes are handled. They look heavy, but they exist to protect you as a customer.\\n\\nIf something does not add up in your view, you can call or write to GASAG and ask for a breakdown in plain language. Sadly, I cannot negotiate the price for you, but I can at least confirm that the structure of the bill is normal: usage, price per unit, basic charges, taxes, and legal info.\\n\\nOnce you have checked the readings, paid the amount, and saved a copy of the bill, you are done with this chapter unless you decide to switch to a different supplier.",
  "keyFactsSummary": {
    "legalReferences": [
      "§ 40 Abs. 2 Nr. 13 EnWG",
      "§ 40a Abs. 2 EnWG",
      "§ 3 Kohlendioxidkostenaufteilungsgesetz (CO2 KostAufG)"
    ],
    "note": "Final GASAG bill for Michael Amoabeng: 21,887 kWh used between 5 February 2024 and 25 June 2024, with €4,326.41 due by 27 September 2024."
  },
  "summaryLong": "Hi Michael,\\n\\nHere is the short version of what this document wants from you and what you can safely ignore for now.\\n\\n- It closes your gas supply period from 5 February 2024 to 25 June 2024 with GASAG.\\n- Over that time, your recorded gas usage is 21,887 kilowatt hours.\\n- The final amount you owe is €4,326.41, payable by 27 September 2024.\\n- The bill shows how this total is built: basic fee, consumption price, taxes, and CO₂ cost share.\\n\\nWhat matters most for you in practice:\\n\\n- Check that the meter readings and dates are in line with your own records. A quick look is enough.\\n- Pay the amount to the bank account listed, before the deadline. If you already paid, you can simply tick this mentally and keep the proof.\\n- If something feels off, use the contact details on the bill and ask for a clear explanation. You are not expected to decode every legal paragraph alone.\\n- Keep the bill somewhere safe. It may be useful later for your records, for your tax documents, or if there is any follow up.\\n\\nThose legal references at the end are standard and come from German energy law and CO₂ cost rules. They spell out what suppliers must do and which rights you have. You do not need to read them line by line unless you are curious.\\n\\nSo, in friendly terms: one payment to make, a few quick checks, maybe one call if something looks odd, then you can move on to more pleasant topics than gas billing.",
  "title": "Erdgas Schlussrechnung für Michael Amoabeng"
}

END OF EXAMPLE
================

When you receive a NEW document:
- Follow the same tone, structure, and level of personalisation as in the example.
- Adapt all content to the new document only.
- Do NOT copy sentences from the example, except for fixed phrases required by the schema.
- Always output only one JSON object that matches the schema.

SCHEMA (informational, not for repetition in the output):
${DocumentSummarySchema}
`.trim();

export const generateDocumentSummary = onRequest(
  {
    region: "europe-west1",
    timeoutSeconds: 180,
    memory: "1GiB",
  },
  async (req, res) => {
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }
    if (req.method !== "POST") {
      res.status(405).end();
      return;
    }

    const { text } =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (typeof text !== "string" || text.trim().length === 0) {
      res.status(400).json({ error: "Missing or invalid 'text'." });
      return;
    }

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: DocumentSummarySchema,
      schemaName: "DocumentSummary",
      system: documentSummarySystemPrompt,
      prompt: text,
    });

    res.json(object);
    console.log("🚀 ~ Generated Document Summary:", object);
  }
);
