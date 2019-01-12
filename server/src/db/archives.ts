import * as firebase from "firebase-admin";

import { Archive, Entries, Entry } from "../types";
import * as _ from "./utils";

export async function all(): Promise<Archive[]> {
  const collection = await firebase.firestore()
    .collection("archives")
    .where("count", ">", 0)
    .get();
  const archives = _.all<Archive>(collection, "date");

  return archives.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return da > db ? -1 : (da < db ? 1 : 0);
  });
}

export async function entries(year: number, month: number, page: number = 1): Promise<Entries> {
  const collection = await firebase.firestore()
    .collection("entries")
    .where("created_at", ">=", new Date(year, month - 1))
    .where("created_at", "<", new Date(year, month))
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