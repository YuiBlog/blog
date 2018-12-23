import { Entry, Nullable } from "../types";

export function single<T>(snapshot: FirebaseFirestore.QuerySnapshot): Nullable<T> {
  const doc = snapshot.docs.shift();
  return doc ? doc.data() as T : null;
}

export function all<T>(snapshot: FirebaseFirestore.QuerySnapshot): T[] {
  const collection: T[] = [];
  snapshot.forEach(w => collection.push(w.data() as T));

  return collection;
}

export function truncate(entry: Entry): Entry {
  const index = entry.body.indexOf("<!-- more -->");
  if (index < 0) {
    return entry;
  }
  return Object.assign(entry, { body: entry.body.substring(0, index + "<!-- more -->".length) });
}