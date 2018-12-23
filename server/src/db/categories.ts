import * as firebase from "firebase-admin";

import { Category, Entries, Entry } from "../types";
import * as _ from "./utils";

export async function all(): Promise<Category[]> {
  const collection = await firebase.firestore()
    .collection("categories")
    .where("count", ">", 0)
    .orderBy("count", "desc")
    .get();

  return _.all(collection);
}

export async function entries(category: string, page: number = 1): Promise<Entries> {
  const collection = await firebase.firestore()
    .collection("entries")
    .where("categories", "array-contains", category)
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  const entries = _.all<Entry>(collection);

  return {
    entries: entries.slice(0, 5).map(w => _.truncate(w)),
    page,
    hasPrev: page > 1,
    hasNext: entries.length > 5
  } as Entries;
}