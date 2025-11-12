import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(request: Request) {
  const { text }: { text: string } = await request.json();

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schemaName: "DocumentSummary",
    schema: z.object({
      title: z.string(),
      keyFactsSummary: z.object({
        note: z.string(),
        legalReferences: z.array(z.string()),
      }),
      summaryLong: z.string(),
      explanationDetailed: z.string(),
      actions: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
          })
        )
        .min(1),
      checklist: z
        .array(
          z.object({
            label: z.string(),
          })
        )
        .min(1),
    }),
    prompt:
      "You receive raw OCR text from a scanned official letter or document. Produce a JSON object that strictly matches the provided schema. Do not include keys not present in the schema. Use concise, plain language suitable for a non-expert reader. Populate: title; keyFactsSummary.note with one or two sentences summarising the core issue; keyFactsSummary.legalReferences as zero or more citations found in the text; summaryLong as a clear long-form summary; explanationDetailed as a step-by-step explanation; actions as 3–7 concrete next steps with title and description; checklist as 5–12 short labels. Base everything only on the input text. Input:\n\n" +
      text,
  });

  return Response.json(object);
}
