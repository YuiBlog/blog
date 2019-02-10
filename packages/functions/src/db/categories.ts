import { Category, Entries, Entry } from "@yuiblog/types";
import * as firebase from "firebase-admin";

import * as _ from "./utils";
import { without } from '../utils/object';

export async function all(): Promise<Category[]> {
  const collection = await firebase
    .firestore()
    .collection("categories")
    .where("count", ">", 0)
    .orderBy("count", "desc")
    .get();

  return _.all(collection, "name");
}

export async function entries(category: string, page: number = 1): Promise<Entries> {
  const collection = await firebase
    .firestore()
    .collection("entries")
    .where("status", "==", "publish")
    .where("categories", "array-contains", category)
    .orderBy("created_at", "desc")
    .limit(6)
    .offset((page - 1) * 5)
    .get();
  // tslint:disable-next-line:no-shadowed-variable
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
