import * as admin from "firebase-admin";
import { Category } from "../../shared/models/category";

export async function selectCategory(name: string): Promise<FirebaseFirestore.QueryDocumentSnapshot> {
  const categories = await admin.firestore().collection("categories")
    .where("name", "==", name).limit(1).get();
  return categories.docs.shift();
}

export async function incrementCategoryCount(name: string): Promise<void> {
  const category = await selectCategory(name);

  if (category) {
    await category.ref.update({
      count: (category.data() as Category).count + 1
    } as Category);

  } else {
    await admin.firestore().collection("categories").doc().set({
      name,
      count: 1,
    } as Category);
  }
}

export async function decrementCategoryCount(name: string): Promise<void> {
  const category = await selectCategory(name);
  if (category) {
    await category.ref.update({
      count: (category.data() as Category).count - 1
    } as Category);
  } else {
    console.warn("[WARN] not registered category");
  }
}