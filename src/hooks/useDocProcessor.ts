import { useState } from "react";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { DocumentSummary, LocalFile } from "./types";
import { fetch as expoFetch } from "expo/fetch";

const summarizeWithAiSdk = async (text: string) => {
  try {
    const url =
      "https://generatedocumentsummary-johrfgfuja-ew.a.run.app/generateDocumentSummary";
    const res = await (expoFetch as unknown as typeof fetch)(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) {
      console.log("summarizeWithAiSdk HTTP error:", res.status, res.statusText);
      throw new Error(`Summarization failed with status ${res.status}`);
    }
    const data = (await res.json()) as DocumentSummary;
    console.log("🚀 ~ summarizeWithAiSdk ~ data:-------------🎉", data);
    return data;
  } catch (err) {
    console.log("🚀 ~ summarizeWithAiSdk ~ err:", err);
    //throw err;
  }
};

export function useDocumentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFileAsBase64 = async (file: LocalFile): Promise<string> => {
    return FileSystemLegacy.readAsStringAsync(file.uri, {
      encoding: "base64",
    });
  };

  const requestOcrFromServer = async (
    primary: LocalFile,
    includeLayout: boolean
  ) => {
    try {
      // if (!process.env.EXPO_PUBLIC_PROCESS_DOCUMENT_WITH_DOC_AI_URL) {
      //   throw new Error(
      //     "EXPO_PUBLIC_PROCESS_DOCUMENT_WITH_DOC_AI_URL is not defined"
      //   );
      // }
      const fileBase64 = await readFileAsBase64(primary);
      const resp = await expoFetch(
        "https://processdocumentwithdocai-johrfgfuja-ew.a.run.app/processDocumentWithDocAI",
        {
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
        }
      );

      const json = await resp.json();

      if (!resp.ok || json?.error) {
        const err = json?.error || {};
        throw new Error(
          err?.message || `Callable failed (HTTP ${resp.status})`
        );
      }

      const result = json?.result as { text: string; languageCode?: string };

      if (!result?.text) {
        throw new Error("PDF text extraction returned empty text.");
      }

      return result;
    } catch (err: any) {
      console.log("requestOcrFromServer ~ err:", err);
    }
  };

  const generateStructuredSummary = async (
    ocrText: string
  ): Promise<DocumentSummary> => {
    const summary = await summarizeWithAiSdk(ocrText);
    console.log("🎉🎉🎉🎉 ~ generateStructuredSummary ~ summary:", summary);
    return summary;
  };

  const processSingleDocumentFromFiles = async (
    files: LocalFile[],
    includeLayout = false
  ): Promise<{ summary: DocumentSummary; documentLayout?: unknown }> => {
    console.log("🚀 ~ processSingleDocumentFromFiles ~ files:", "triggered");
    setIsProcessing(true);
    setError(null);
    try {
      if (!files.length) throw new Error("No files provided.");
      const primary = files[0];
      console.log("🚀 ~ processSingleDocumentFromFiles ~ primary:", primary);

      const { text, languageCode } = await requestOcrFromServer(
        primary,
        includeLayout
      );
      console.log("🚀 ~ processSingleDocumentFromFiles ~ text:", text);

      const summary = await generateStructuredSummary(text);

      return { summary };
    } catch (err: any) {
      console.log("🚀 ~ useDocumentProcessor ~ err:", err);
      setError(err?.message || "Document processing failed");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processSingleDocumentFromFiles, isProcessing, error };
}
