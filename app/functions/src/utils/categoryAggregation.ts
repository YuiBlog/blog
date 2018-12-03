import * as admin from "firebase-admin";
import { Category } from "../shared/models/category";

export async function select(name: string): Promise<FirebaseFirestore.QueryDocumentSnapshot> {
  let category;

  const categories = await admin.firestore().collection("categories")
    .where("name", "==", name).limit(1).get();
  categories.forEach(w => category = w);

  return category;
}

export async function up(name: string): Promise<void> {
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

export async function down(name: string): Promise<void> {
  const category = await select(name);
  if (category) {
    await category.ref.update({
      count: (category.data() as Category).count - 1
    } as Category);
  } else {
    console.warn("[WARN] not registered category");
  }
}