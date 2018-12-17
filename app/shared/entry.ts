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

export async function list(page: number = 1): Promise<Entries> {
  const entries: Entry[] = [];
  const collection = await firebase.firestore()
    .collection("entries")
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

export async function previous(createdAt: number): Promise<Entry> {
  let entry!: Entry;
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();
  collection.forEach(w => entry = w.data() as Entry);

  return entry;
}

export async function next(createdAt: number): Promise<Entry> {
  let entry!: Entry;
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "asc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();
  collection.forEach(w => entry = w.data() as Entry);

  return entry;
}