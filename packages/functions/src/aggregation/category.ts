import { Category } from "@yuiblog/types";
import * as admin from "firebase-admin";

export async function selectCategory(name: string, tx?: FirebaseFirestore.Transaction): Promise<FirebaseFirestore.DocumentSnapshot> {
  const ref = admin
    .firestore()
    .collection("categories")
    .doc(name);
  return await (tx ? tx.get(ref) : ref.get());
}

export async function incrementCategoryCount(category: FirebaseFirestore.DocumentSnapshot, tx: FirebaseFirestore.Transaction): Promise<void> {
  if (category.exists) {
    await tx.update(category.ref, {
      count: (category.data() as Category).count + 1
    } as Category);
  } else {
    await tx.create(category.ref, { count: 1 } as Category);
  }
}

export async function decrementCategoryCount(category: FirebaseFirestore.DocumentSnapshot, tx: FirebaseFirestore.Transaction): Promise<void> {
  if (category.exists) {
    const count = (category.data() as Category).count - 1;
    await tx.update(category.ref, {
      count: count < 0 ? 0 : count
    } as Category);
  }
}
