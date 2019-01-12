import { firestore } from "firebase-admin";

import { Archive } from "../types";

export async function selectArchive(date: Date, tx?: FirebaseFirestore.Transaction): Promise<FirebaseFirestore.DocumentSnapshot> {
  const ref = firestore().collection("archives").doc(`${date.getFullYear()}-${date.getMonth() + 1}`);
  return await (tx ? tx.get(ref) : ref.get());
}

export async function incrementArchiveCount(archive: FirebaseFirestore.DocumentSnapshot, tx: FirebaseFirestore.Transaction): Promise<void> {
  if (archive.exists) {
    await tx.update(archive.ref, {
      count: (archive.data() as Archive).count + 1
    } as Archive);
  } else {
    await tx.create(archive.ref, { count: 1 } as Archive);
  }
}

export async function decrementArchiveCount(archive: FirebaseFirestore.DocumentSnapshot, tx: FirebaseFirestore.Transaction): Promise<void> {
  if (archive.exists) {
    await tx.update(archive.ref, {
      count: (archive.data() as Archive).count - 1
    } as Archive);
  }
}