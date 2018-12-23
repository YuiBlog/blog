import set from "lodash/set";
import { Entry, Nullable } from "../types";

type Indexer<T> = { [P in keyof T]: any };

export function extract<T>(doc: FirebaseFirestore.DocumentSnapshot, id?: string): T {
  const obj = { ...doc.data() as T } as Indexer<T>;
  return id ? set(obj, id, doc.id) : obj;
}

export function single<T>(snapshot: FirebaseFirestore.QuerySnapshot, id?: keyof T): Nullable<T> {
  const doc = snapshot.docs.shift();
  return doc ? extract(doc, id as string) : null;
}

export function all<T>(snapshot: FirebaseFirestore.QuerySnapshot, id?: keyof T): T[] {
  const collection: T[] = [];
  snapshot.forEach(w => collection.push(extract(w, id as string)));

  return collection;
}

export function truncate(entry: Entry): Entry {
  const index = entry.body.indexOf("<!-- more -->");
  if (index < 0) {
    return entry;
  }
  return Object.assign(entry, { body: entry.body.substring(0, index + "<!-- more -->".length) });
}