import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as lodash from "lodash";

import "../bootstrap/initialize";
import { Category } from "../shared/models/category";
import { Entry } from "../shared/models/entry";

async function select(name: string): Promise<FirebaseFirestore.QueryDocumentSnapshot> {
  let category;

  const categories = await admin.firestore().collection("categories")
    .where("name", "==", name).limit(1).get();
  categories.forEach(w => category = w);

  return category;
}

async function up(name: string): Promise<void> {
  const category = await select(name);

  if (category) {
    // count up
    await category.ref.update({
      count: (category.data() as Category).count + 1
    } as Category);

  } else {
    // create document
    await admin.firestore().collection("categories").doc().set({
      name,
      count: 1,
    } as Category);
  }
}

async function down(name: string): Promise<void> {
  const category = await select(name);
  if (category) {
    await category.ref.update({
      count: (category.data() as Category).count - 1
    } as Category);
  } else {
    console.warn("[WARN] not registered category");
  }
}

export const onCreateEntry = functions.runWith({
  memory: "128MB",
  timeoutSeconds: 60
}).firestore.document("entries/{entryId}").onCreate(async (snapshot) => {
  const entry = snapshot.data() as Entry;
  for (let category of entry.categories) {
    await up(category);
  }
});

export const onUpdateEntry = functions.runWith({
  memory: "128MB",
  timeoutSeconds: 60
}).firestore.document("entries/{entryId}").onUpdate(async (change) => {
  const before = change.before.data() as Entry;
  const after = change.after.data() as Entry;

  // before にあって after にないもの
  {
    const diff = lodash.difference(before.categories, after.categories);
    for (let category of diff) {
      await down(category);
    }
  }

  // after にあって、 before にないもの
  {
    const diff = lodash.difference(after.categories, before.categories);
    for (let category of diff) {
      await up(category);
    }
  }
});

export const onDeleteEntry = functions.runWith({
  memory: "128MB",
  timeoutSeconds: 60
}).firestore.document("entries/{entryId}").onDelete(async (snapshot) => {
  const entry = snapshot.data() as Entry;
  for (let category of entry.categories) {
    await down(category);
  }
});