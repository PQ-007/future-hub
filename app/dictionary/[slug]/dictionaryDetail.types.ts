export interface Author {
  id: string;
  display_name: string;
  user_name: string;
  avatar_url: string;
}

export interface Translation {
  id: number;
  language_code: string;
  translated_term: string;
  explanation: string | null;
  created_by: string;
  created_at: string;
}

export interface Example {
  id: number;
  example_text: string;
  source: string | null;
  context: string | null;
  language_code: string;
  created_by: string;
  created_at: string;
}

export interface Revision {
  id: number;
  revision_number: number;
  change_summary: string | null;
  status: string;
  author: string;
  created_at: string;
}

export interface ModerationAction {
  action: string;
  reason: string | null;
  moderator: string;
  created_at: string;
}

export interface RelatedEntry {
  id: number;
  term: string;
  slug: string;
  language_code: string;
}

export interface RelatedArticle {
  article_id: string;
  title: string;
  language_code: string;
  tags: string[];
}

export interface ConvertRequest {
  text: string;
  direction: "to-mng" | "to-cyr";
}

export interface ConvertResponse {
  result?: string;
  error?: string;
}

export interface EntryDetail {
  id: number;
  term: string;
  slug: string;
  reading: string | null;
  language_code: string;
  definition: string;
  status: string;
  views: number;
  saves: number;
  created_at: string;
  updated_at: string;
  author: Author;
  tags: string[];
  saved: boolean;
}

export interface EntryResponse {
  entry: EntryDetail;
  translations: Translation[];
  examples: Example[];
  revisions: Revision[];
  moderationActions: ModerationAction[];
  relatedEntries: RelatedEntry[];
}
