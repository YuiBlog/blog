export interface Archive {
  date: string;
  count: number;
}

export declare module Settings {
  export interface Blog {
    description: string;
    name: string;
  }

  export interface User {
    bio: string;
    name: string;
  }
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

export interface Settings {
  blog: Settings.Blog;
  user: Settings.User;
}

export type Nullable<T> = T | null;
