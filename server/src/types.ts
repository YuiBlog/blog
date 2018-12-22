export interface Archive {
  date: string;
  count: number;
}

export interface Category {
  name: string;
  count: number;
}

export interface Categories {
  categories: Category[];
}

export interface EntryCombined {
  next: Nullable<EntryMinified>;
  entry: Entry;
  previous: Nullable<EntryMinified>;
}

export interface Entry extends EntryMinified {
  body: string;
  categories: string[];
}

export interface EntryMinified {
  slug: string;
  title: string;
  created_at: {
    _seconds: number;
  }
}

export interface Entries {
  entries: Entry[];
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export type Nullable<T> = T | null;
