import * as admin from "firebase-admin";
import { Archive, Nullable } from "../../types";

export async function selectArchive(date: Date): Promise<FirebaseFirestore.DocumentSnapshot> {
  const archive = await admin.firestore().collection("archives")
    .doc(`${date.getFullYear()}-${date.getMonth() + 1}`).get();
  return archive;
}

export async function incrementArchiveCount(date: Date): Promise<void> {
  const archive = await selectArchive(date);

  if (archive.exists) {
    await archive.ref.update({
      count: (archive.data() as Archive).count + 1
    } as Archive);
  } else {
    await archive.ref.set({
      count: 1
    } as Archive);
  }
}

export async function decrementArchiveCount(date: Date): Promise<void> {
  const archive = await selectArchive(date);

  if (archive.exists) {
    await archive.ref.update({
      count: (archive.data() as Archive).count - 1
    } as Archive);
  } else {
    console.warn("[WARN] not registered archive");
  }
}