import * as firebase from "firebase-admin";

import { Archive } from "./models/archive";
import { Entries, Entry } from "./models/entry";

export async function all(): Promise<Archive[]> {
  const archives: Archive[] = [];
  const collection = await firebase.firestore()
    .collection("archives")
    .where("count", ">", 0)
    .get();
  collection.forEach(archive => archives.push(archive.data() as Archive));

  return archives.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    return da > db ? -1 : (da < db ? 1 : 0);
  });
}

export async function entries(year: number, month: number, page: number = 1): Promise<Entries> {
  const entries: Entry[] = [];
  const collection = await firebase.firestore()
    .collection("entries")
    .where("created_at", ">=", new Date(year, month - 1))
    .where("created_at", "<", new Date(year, month))
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  collection.forEach(entry => entries.push(entry.data() as Entry));

  return {
    entries,
    page,
    hasPrev: page > 1,
    hasNext: entries.length > 5
  } as Entries;
} 