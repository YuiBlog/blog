import * as firebase from "firebase-admin";

import { Entries, Entry } from "./models/entry";

export async function show(year: number, month: number, slug: string): Promise<Entry> {
  let entry!: Entry;
  const collection = await firebase.firestore()
    .collection("entries")
    .where("created_at", ">=", new Date(year, month - 1))
    .where("created_at", "<", new Date(year, month))
    .where("slug", "==", slug)
    .limit(1)
    .get();
  collection.forEach(w => entry = w.data() as Entry);

  return entry;
}

export async function list(offset: number): Promise<Entries> {
  const entries: Entry[] = [];
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .limit(6)
    .offset(offset)
    .get();
  collection.forEach(entry => entries.push(entry.data() as Entry));

  return {
    entries,
    offset,
    hasPrev: offset > 0,
    hasNext: entries.length > 5
  } as Entries;
}

export async function latest(): Promise<Entry[]> {
  const entries: Entry[] = [];
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .limit(5)
    .get();
  collection.forEach(entry => {
    entries.push(entry.data() as Entry);
  });

  return entries;
}