export interface Entry {
  slug: string;
  title: string;
  body: string;
  created_at: {
    _seconds: number;
  };
}

export interface Entries {
  entries: Entry[];
  offset: number;
  hasPrev: boolean;
  hasNext: boolean;
}