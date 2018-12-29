import { firestore } from "firebase-admin";

import { User } from "../types";
import * as _ from "./utils";

export async function administrators(tx?: FirebaseFirestore.Transaction): Promise<User[]> {
  const collection = await firestore()
    .collection("users")
    .where("admin", "==", true);
  const users = await (tx ? tx.get(collection) : collection.get());
  return _.all<User>(users);
}

export async function create(user: FirebaseFirestore.DocumentSnapshot, tx?: FirebaseFirestore.Transaction): Promise<void> {
  if (tx) {
    await tx.create(user.ref, {});
  } else {
    await user.ref.create({});
  }
}

export async function select(uid: string, tx?: FirebaseFirestore.DocumentSnapshot): Promise<FirebaseFirestore.DocumentSnapshot> {
  const ref = firestore().collection("users").doc(uid);
  return await (tx ? tx.get(ref) : ref.get());
}

export async function destroy(user: FirebaseFirestore.DocumentSnapshot, tx?: FirebaseFirestore.Transaction): Promise<void> {
  if (tx) {
    await tx.delete(user.ref);
  } else {
    await user.ref.delete();
  }
}

export async function markAsAdmin(user: FirebaseFirestore.DocumentSnapshot, tx?: FirebaseFirestore.Transaction): Promise<void> {
  if (tx) {
    await tx.update(user.ref, { admin: true } as User);
  } else {
    await user.ref.update({ admin: true } as User);
  }
}
