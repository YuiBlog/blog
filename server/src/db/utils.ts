import { Nullable } from "../types";

export function single<T>(snapshot: FirebaseFirestore.QuerySnapshot): Nullable<T> {
  const doc = snapshot.docs.shift();
  return doc ? doc.data() as T : null;
}

export function all<T>(snapshot: FirebaseFirestore.QuerySnapshot): T[] {
  const collection: T[] = [];
  snapshot.forEach(w => collection.push(w.data() as T));

  return collection;
}
