import { Entries, Entry, EntryCombined, EntryMinified, Nullable } from "@yuiblog/types";
import * as firebase from "firebase-admin";
import pick from "lodash/pick";

import * as _ from "./utils";
import { without } from '../utils/object';

async function previous(createdAt: number): Promise<Nullable<EntryMinified>> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("status", "==", "publish")
    .orderBy("created_at", "desc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();

  const entry = _.single<Entry>(collection);
  return entry ? toMinified(entry) : null;
}

async function next(createdAt: number): Promise<Nullable<EntryMinified>> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("status", "==", "publish")
    .orderBy("created_at", "asc")
    .startAfter(new Date(createdAt * 1000))
    .limit(1)
    .get();

  const entry = _.single<Entry>(collection);
  return entry ? toMinified(entry) : null;
}

export async function show(url: string): Promise<EntryCombined> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("url", "==", url)
    .where("status", "==", "publish")
    .limit(1)
    .get();
  const entry = _.single<Entry>(collection);
  if (entry == null) {
    throw new Error("404");
  }

  return {
    entry: entry.has_passphrase ? without(entry, "passphrase", "body") : without(entry, "passphrase"),
    next: await next(entry.created_at._seconds),
    previous: await previous(entry.created_at._seconds)
  } as EntryCombined;
}

export async function verify(url: string, passphrase: string): Promise<Entry> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("url", "==", url)
    .where("status", "==", "publish")
    .limit(1)
    .get();
  const entry = _.single<Entry>(collection);
  if (entry == null) {
    throw new Error("404");
  }

  const verified = entry.passphrase === passphrase;
  return verified ? without(entry, "passphrase") : without(entry, "passphrase", "body");
}

export async function list(page: number = 1): Promise<Entries> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("status", "==", "publish")
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  const entries = _.all<Entry>(collection)
    .map(w => w.passphrase ? without(w, "body") : w)
    .map(w => without(w, "passphrase"));

  return {
    entries: entries.slice(0, 5).map(w => _.truncate(w)),
    hasNext: entries.length > 5,
    hasPrev: page > 1,
    page
  } as Entries;
}

export async function latest(): Promise<EntryMinified[]> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("status", "==", "publish")
    .orderBy("created_at", "desc")
    .limit(5)
    .get();

  return _.all<Entry>(collection).map(w => toMinified(w));
}

function toMinified(entry: Entry): EntryMinified {
  return pick(entry, "slug", "title", "created_at", "url") as EntryMinified;
}
