// useDocProcessor.ts
import { useCallback, useState } from "react";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "@react-native-firebase/functions";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { IS_ANDROID } from "@/constants/Layout";
import { useLLM, LLAMA3_2_1B } from "react-native-executorch";

const TOKENIZER = require("../../assets/executorch/tokenizer.json");
const TOKENIZER_CONFIG = require("../../assets/executorch/tokenizer_config.json");

const HARDCODED_CALLABLE_URL_DEV =
  "http://127.0.0.1:5001/docuservice-4ccef/europe-west1/processDocumentWithDocAI";
export interface ActionItem {
  id: string;
  title: string;
  description: string;
  owner: "user" | "office" | "third_party";
  dueDate: string | null;
  leadTimeDays: number;
  priority: number;
  risk: number;
  effort: number;
  dependencies: string[];
  documentsToPrepare: string[];
  channel: string[];
  evidence?: { quote: string; page: number | null } | null;
  confidenceScore?: number | null;
}

export interface ChecklistItem {
  label: string;
  relatedActionId: string | null;
  status: "pending" | "done" | "n/a";
  confidenceScore: number;
}

export interface DocumentSummary {
  id: string;
  title: string;
  keyFactsSummary: { note: string; legalReferences: string[] };
  actions: ActionItem[];
  checklist: ChecklistItem[];
  summaryLong: string;
  explanationDetailed: string;
  provenance?: { detectedLanguage?: string; processedAt?: string };
}

type LocalFile = { uri: string; name: string; mimeType: string };

const DocumentSummaryJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "title",
    "keyFactsSummary",
    "actions",
    "checklist",
    "summaryLong",
    "explanationDetailed",
  ],
  properties: {
    id: { type: "string" },
    title: { type: "string", minLength: 1 },
    keyFactsSummary: {
      type: "object",
      required: ["note", "legalReferences"],
      additionalProperties: false,
      properties: {
        note: { type: "string" },
        legalReferences: { type: "array", items: { type: "string" } },
      },
    },
    actions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "title",
          "description",
          "owner",
          "dueDate",
          "leadTimeDays",
          "priority",
          "risk",
          "effort",
          "dependencies",
          "documentsToPrepare",
          "channel",
        ],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          owner: { enum: ["user", "office", "third_party"] },
          dueDate: {
            type: ["string", "null"],
            pattern: "^\\d{4}-\\d{2}-\\d{2}$",
          },
          leadTimeDays: { type: "integer", minimum: 0 },
          priority: { type: "integer", minimum: 1 },
          risk: { type: "integer", minimum: 1 },
          effort: { type: "integer", minimum: 1 },
          dependencies: { type: "array", items: { type: "string" } },
          documentsToPrepare: { type: "array", items: { type: "string" } },
          channel: { type: "array", items: { type: "string" } },
          evidence: {
            type: ["object", "null"],
            additionalProperties: false,
            required: ["quote", "page"],
            properties: {
              quote: { type: "string" },
              page: { type: ["integer", "null"] },
            },
          },
          confidenceScore: { type: ["number", "null"], minimum: 0, maximum: 1 },
        },
      },
    },
    checklist: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["label", "relatedActionId", "status", "confidenceScore"],
        properties: {
          label: { type: "string" },
          relatedActionId: { type: ["string", "null"] },
          status: { enum: ["pending", "done", "n/a"] },
          confidenceScore: { type: "number", minimum: 0, maximum: 1 },
        },
      },
    },
    summaryLong: { type: "string" },
    explanationDetailed: { type: "string" },
    provenance: {
      type: "object",
      additionalProperties: true,
      properties: {
        detectedLanguage: { type: "string" },
        processedAt: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}" },
      },
    },
  },
} as const;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function waitUntilLLMReady(
  llm: { isReady: boolean; error: string | null },
  timeoutMs = 180_000,
  pollMs = 250
) {
  const start = Date.now();
  while (!llm.isReady) {
    if (llm.error) throw new Error(llm.error);
    if (Date.now() - start > timeoutMs) {
      throw new Error("LLM model did not load in time.");
    }
    await sleep(pollMs);
  }
}

export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const llm = useLLM({
    model: {
      modelSource: LLAMA3_2_1B,
      tokenizerSource: TOKENIZER,
      tokenizerConfigSource: TOKENIZER_CONFIG,
    },
  });

  const REGION = "europe-west1";
  const getFunctionsInstance = useCallback(() => {
    if (__DEV__) {
      const fns = getFunctions();
      const host = IS_ANDROID ? "10.0.2.2" : "127.0.0.1";
      connectFunctionsEmulator(fns, host, 5001);
      return fns;
    }
    return getFunctions(undefined, REGION);
  }, []);

  const readFileAsBase64 = useCallback(
    async (file: LocalFile): Promise<string> => {
      return FileSystemLegacy.readAsStringAsync(file.uri, {
        encoding: "base64",
      });
    },
    []
  );

  const requestOcrFromServer = useCallback(
    async (primary: LocalFile, includeLayout: boolean) => {
      if (primary.mimeType !== "application/pdf") {
        throw new Error(
          "Only 'application/pdf' is supported for text extraction."
        );
      }

      const fileBase64 = await readFileAsBase64(primary);

      if (__DEV__) {
        const resp = await fetch(HARDCODED_CALLABLE_URL_DEV, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: {
              fileBase64,
              mimeType: primary.mimeType,
              filename: primary.name,
              includeLayout,
            },
          }),
        });
        const json = await resp.json();
        if (!resp.ok || json?.error) {
          const err = json?.error || {};
          throw new Error(
            err?.message || `Callable failed (HTTP ${resp.status})`
          );
        }
        const data =
          (json &&
            (json.result as {
              text: string;
              languageCode?: string;
              documentLayout?: unknown;
            })) ||
          json;

        if (!data?.text) {
          throw new Error("PDF text extraction returned empty text.");
        }
        return data;
      }

      // Production path: keep the SDK call
      const functionsInst = getFunctionsInstance();
      const processFn = httpsCallable(
        functionsInst,
        "processDocumentWithDocAI"
      );
      const res = await processFn({
        fileBase64,
        mimeType: primary.mimeType,
        filename: primary.name,
        includeLayout,
      });
      const data = res.data as {
        text: string;
        languageCode?: string;
        documentLayout?: unknown;
      };
      if (!data?.text) {
        throw new Error("PDF text extraction returned empty text.");
      }
      return data;
    },
    [getFunctionsInstance, readFileAsBase64]
  );

  const generateStructuredSummary = useCallback(
    async (ocrText: string, languageHint: string): Promise<DocumentSummary> => {
      await waitUntilLLMReady(llm);

      const today = new Date().toISOString().slice(0, 10);

      const system = [
        "You are an expert document analyst.",
        "Output MUST be valid JSON exactly matching this schema keys:",
        "id, title, keyFactsSummary{note, legalReferences[]}, actions[], checklist[], summaryLong, explanationDetailed, provenance{detectedLanguage, processedAt}",
        "Use clear paragraphs and bullet points in summary fields.",
        "Derive only from the OCR text. If unknown, use null where the type allows.",
      ].join("\n");

      const user = [
        `Today: ${today}`,
        `Detected language hint: ${languageHint || "und"}`,
        "OCR_TEXT_BEGIN",
        ocrText,
        "OCR_TEXT_END",
        "",
        "Return ONLY the JSON.",
      ].join("\n");

      // Docs: call llm.generate with a chat array; read llm.response after it resolves. :contentReference[oaicite:6]{index=6}
      await llm.generate([
        { role: "system", content: system },
        { role: "user", content: user },
      ]);

      const raw = (llm.response || "").trim();
      if (!raw) throw new Error("Empty model response.");

      let parsed: DocumentSummary;
      try {
        parsed = JSON.parse(raw) as DocumentSummary;
      } catch {
        throw new Error("Model returned non-JSON.");
      }

      parsed.id = parsed.id || "1.0";
      parsed.provenance = {
        ...(parsed.provenance || {}),
        detectedLanguage:
          languageHint || parsed.provenance?.detectedLanguage || "und",
        processedAt: today,
      };

      return parsed;
    },
    [llm]
  );

  /**
   * Public API: process one logical document (ideally one merged PDF).
   */
  const processSingleDocumentFromFiles = useCallback(
    async (
      files: LocalFile[],
      includeLayout = false
    ): Promise<{ summary: DocumentSummary; documentLayout?: unknown }> => {
      setIsProcessing(true);
      setError(null);
      try {
        if (!files.length) throw new Error("No files provided.");
        const primary = files[0];

        const { text, languageCode, documentLayout } =
          await requestOcrFromServer(primary, includeLayout);

        const summary = await generateStructuredSummary(
          text,
          languageCode || "und"
        );
        console.log("🚀 ~ useDocumentProcessor ~ summary:", summary);
        return { summary, documentLayout };
      } catch (err: any) {
        console.log("🚀 ~ useDocumentProcessor ~ err:", err);
        setError(err?.message || "Document processing failed");
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [requestOcrFromServer, generateStructuredSummary]
  );

  return { processSingleDocumentFromFiles, isProcessing, error };
}
