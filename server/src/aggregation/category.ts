import * as admin from "firebase-admin";
import { Category } from "../../types";

export async function selectCategory(name: string): Promise<FirebaseFirestore.DocumentReference> {
  return await admin.firestore().collection("categories").doc(name);
}

export async function incrementCategoryCount(tx: FirebaseFirestore.Transaction, name: string): Promise<void> {
  const ref = await selectCategory(name);
  const category = await tx.get(ref);

  if (category.exists) {
    await tx.update(ref, {
      count: (category.data() as Category).count + 1
    } as Category);
  } else {
    await tx.create(ref, { count: 1 } as Category);
  }
}

export async function decrementCategoryCount(tx: FirebaseFirestore.Transaction, name: string): Promise<void> {
  const ref = await selectCategory(name);
  const category = await tx.get(ref);

  if (category.exists) {
    await tx.update(ref, {
      count: (category.data() as Category).count - 1
    } as Category);
  }
}
