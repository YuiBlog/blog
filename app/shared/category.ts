import * as firebase from "firebase-admin";

import { Category } from "./models/category";
import { Entries, Entry } from "./models/entry";

export async function all(): Promise<Category[]> {
  const categories: Category[] = [];
  const collection = await firebase.firestore()
    .collection("categories")
    .where("count", ">", 0)
    .orderBy("count", "desc")
    .get();
  collection.forEach(category => categories.push(category.data() as Category));

  return categories;
}

export async function entries(category: string, page: number = 1): Promise<Entries> {
  const entries: Entry[] = [];
  const collection = await firebase.firestore()
    .collection("entries")
    .where("categories", "array-contains", category)
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  collection.forEach(entry => entries.push(entry.data() as Entry));

  return {
    entries: entries.slice(0, 5),
    page,
    hasPrev: page > 1,
    hasNext: entries.length > 5
  } as Entries;
}