export interface Archive {
  date: string;
  count: number;
}

export declare namespace Settings {
  export interface Blog {
    description: string;
    name: string;
  }

  export interface User {
    bio: string;
    icon: string;
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
  has_passphrase: string;
  passphrase: Nullable<string>;
  id: string;
  status: "publish" | "draft";
}

export interface EntryMinified {
  created_at: {
    _seconds: number;
  }
  slug: string;
  title: string;
  url: string;
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

export interface User {
  admin: boolean;
}

export type Nullable<T> = T | null;
