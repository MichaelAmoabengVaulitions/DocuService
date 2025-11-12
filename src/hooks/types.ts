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

export type LocalFile = { uri: string; name: string; mimeType: string };

export const DocumentSummaryJsonSchema = {
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
