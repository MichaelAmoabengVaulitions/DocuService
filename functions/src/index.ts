import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import PDFParser from "pdf2json";

const MAX_INLINE_BYTES = 20 * 1024 * 1024; // 20MB

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
      console.log("🚀 ~ pages:", pages);
      console.log("🚀 ~ text:", text);

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
