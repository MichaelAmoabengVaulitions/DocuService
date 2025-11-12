import { useState } from "react";
import * as FileSystemLegacy from "expo-file-system/legacy";
import { DocumentSummary, LocalFile } from "./types";
import Constants from "expo-constants";
import { fetch as expoFetch } from "expo/fetch";

const HARDCODED_CALLABLE_URL_DEV =
  "https://processdocumentwithdocai-johrfgfuja-ew.a.run.app/processDocumentWithDocAI";

const generateApiUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl.replace("exp://", "http://");
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  if (process.env.NODE_ENV === "development") {
    return origin.concat(path);
  }
  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error("EXPO_PUBLIC_API_BASE_URL is not defined");
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};

const summarizeWithAiSdk = async (text: string) => {
  const url = generateApiUrl("/api/document-summary");
  const res = await (expoFetch as unknown as typeof fetch)(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    throw new Error(`Summarization failed with status ${res.status}`);
  }
  const data = await res.json();
  return data;
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
      const fileBase64 = await readFileAsBase64(primary);
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
      const data = json?.data as { text: string; languageCode: string };

      if (!data?.text) {
        throw new Error("PDF text extraction returned empty text.");
      }
      return data;
    } catch (err: any) {
      console.log("requestOcrFromServer ~ err:", err);
    }
  };

  const generateStructuredSummary = async (
    ocrText: string,
    languageHint?: string
  ): Promise<DocumentSummary> => {
    let finalSummary: DocumentSummary;

    return finalSummary;
  };

  const processSingleDocumentFromFiles = async (
    files: LocalFile[],
    includeLayout = false
  ): Promise<{ summary: DocumentSummary; documentLayout?: unknown }> => {
    setIsProcessing(true);
    setError(null);
    try {
      if (!files.length) throw new Error("No files provided.");
      const primary = files[0];

      const { text, languageCode } = await requestOcrFromServer(
        primary,
        includeLayout
      );

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
