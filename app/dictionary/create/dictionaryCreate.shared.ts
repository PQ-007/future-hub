export interface TranslationInput {
  language_code: string;
  translated_term: string;
  explanation: string;
}

export interface ExampleInput {
  example_text: string;
  source: string;
  context: string;
  language_code: string;
}

export interface DuplicateMatch {
  id: number;
  term: string;
  slug: string;
  language_code: string;
  status: string;
  similarity: number | null;
}

export const LANG_OPTIONS = [
  { value: "mn", label: "Монгол" },
  { value: "ja", label: "日本語" },
];
