import { firestore } from "firebase-admin";

import { Archive } from "../types";

export async function selectArchive(date: Date): Promise<FirebaseFirestore.DocumentReference> {
  return await firestore().collection("archives").doc(`${date.getFullYear()}-${date.getMonth() + 1}`);
}

export async function incrementArchiveCount(tx: FirebaseFirestore.Transaction, date: Date): Promise<void> {
  const ref = await selectArchive(date);
  const archive = await tx.get(ref);
  if (archive.exists) {
    await tx.update(ref, {
      count: (archive.data() as Archive).count + 1
    } as Archive);
  } else {
    await tx.create(ref, { count: 1 } as Archive);
  }
}

export async function decrementArchiveCount(tx: FirebaseFirestore.Transaction, date: Date): Promise<void> {
  const ref = await selectArchive(date);
  const archive = await tx.get(ref);
  if (archive.exists) {
    await tx.update(ref, {
      count: (archive.data() as Archive).count - 1
    } as Archive);
  }
}