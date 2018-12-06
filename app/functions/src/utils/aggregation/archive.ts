import * as admin from "firebase-admin";
import { Archive } from "../../shared/models/archive";

export async function selectArchive(date: Date): Promise<FirebaseFirestore.QueryDocumentSnapshot> {
  const archives = await admin.firestore().collection("archives")
    .where("date", "==", `${date.getFullYear()}-${date.getMonth() + 1}`).limit(1).get();
  return archives.docs.shift();
}

export async function incrementArchiveCount(date: Date): Promise<void> {
  const archive = await selectArchive(date);

  if (archive) {
    await archive.ref.update({
      count: (archive.data() as Archive).count + 1
    } as Archive);
  } else {
    await admin.firestore().collection("archives").doc().set({
      date: `${date.getFullYear()}-${date.getMonth() + 1}`,
      count: 1
    } as Archive);
  }
}

export async function decrementArchiveCount(date: Date): Promise<void> {
  const archive = await selectArchive(date);

  if (archive) {
    await archive.ref.update({
      count: (archive.data() as Archive).count - 1
    } as Archive);
  } else {
    console.warn("[WARN] not registered archive");
  }
}