// Utilty Functions for Cloud Functions

import { firestore } from "firebase-admin";

export async function alreadyTriggerd(eventId: string): Promise<boolean> {
  return await firestore().runTransaction(async transaction => {
    const ref = firestore().collection("events").doc(eventId);
    const doc = await transaction.get(ref);
    if (doc.exists) {
      return true;
    } else {
      await transaction.set(ref, {});
      return false;
    }
  });
}