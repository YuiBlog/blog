import * as firebase from "firebase-admin";
import pick from "lodash/pick";

import { Entries, Entry, EntryCombined, EntryMinified, Nullable } from "../types";
import * as _ from "./utils";

async function previous(createdAt: number): Promise<Nullable<EntryMinified>> {
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();

  const entry = _.single<Entry>(collection);
  return entry ? pick(entry, "slug", "title", "created_at") : null;
}

async function next(createdAt: number): Promise<Nullable<EntryMinified>> {
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "asc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();

  const entry = _.single<Entry>(collection);
  return entry ? pick(entry, "slug", "title", "created_at") : null;
}

export async function show(year: number, month: number, slug: string): Promise<EntryCombined> {
  const collection = await firebase.firestore()
    .collection("entries")
    .where("created_at", ">=", new Date(year, month - 1))
    .where("created_at", "<", new Date(year, month))
    .where("slug", "==", slug)
    .limit(1)
    .get();
  const entry = _.single<Entry>(collection);
  if (entry == null) {
    throw new Error("404");
  }

  return {
    entry,
    next: await next(entry.created_at._seconds),
    previous: await previous(entry.created_at._seconds)
  } as EntryCombined;
}

export async function list(page: number = 1): Promise<Entries> {
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  const entries = _.all(collection);

  return {
    entries: entries.slice(0, 5),
    page,
    hasPrev: page > 1,
    hasNext: entries.length > 5
  } as Entries;
}

export async function latest(): Promise<Entry[]> {
  const collection = await firebase.firestore()
    .collection("entries")
    .orderBy("created_at", "desc")
    .limit(5)
    .get();

  return _.all(collection);
}
