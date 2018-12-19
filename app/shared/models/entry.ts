import { Nullable } from "../types";

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