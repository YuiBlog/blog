export interface Entry {
  slug: string;
  title: string;
  body: string;
  created_at: {
    _seconds: number;
  };
  categories: string[];
}

export interface Entries {
  entries: Entry[];
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}