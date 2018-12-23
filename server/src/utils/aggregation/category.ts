import * as admin from "firebase-admin";
import { Category, Nullable } from "../../types";

export async function selectCategory(name: string): Promise<FirebaseFirestore.DocumentSnapshot> {
  const category = await admin.firestore().collection("categories")
    .doc(name).get();
  return category;
}

export async function incrementCategoryCount(name: string): Promise<void> {
  const category = await selectCategory(name);

  if (category.exists) {
    await category.ref.update({
      count: (category.data() as Category).count + 1
    } as Category);

  } else {
    await category.ref.set({
      count: 1,
    } as Category);
  }
}

export async function decrementCategoryCount(name: string): Promise<void> {
  const category = await selectCategory(name);
  if (category.exists) {
    await category.ref.update({
      count: (category.data() as Category).count - 1
    } as Category);
  } else {
    console.warn("[WARN] not registered category");
  }
}