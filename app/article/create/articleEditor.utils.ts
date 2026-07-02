import type { ArticleStatus } from "./articleSave.utils";

/**
 * Best-effort extraction of a human-readable message from an API error body,
 * which may be JSON (`{ error }` / `{ message }`) or plain text.
 */
export function getFriendlyApiError(raw: string, fallback: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return fallback;

  try {
    const parsed = JSON.parse(trimmed) as {
      error?: unknown;
      message?: unknown;
    };
    if (typeof parsed.error === "string" && parsed.error.trim()) {
      return parsed.error;
    }
    if (typeof parsed.message === "string" && parsed.message.trim()) {
      return parsed.message;
    }
  } catch {
    // Not JSON, return plain text below.
  }

  return trimmed;
}

export type TranslationInfo = {
  lang: string;
  title?: string;
  subTitle?: string;
};

export interface EditPayload {
  article?: {
    id: string;
    status?: ArticleStatus;
  };
  translations?: Array<{
    language_code?: string;
    title?: string;
    sub_title?: string;
    body?: string;
  }>;
  tags?: string[];
  settings?: {
    base_lang_code?: string | null;
  };
  error?: string;
}
