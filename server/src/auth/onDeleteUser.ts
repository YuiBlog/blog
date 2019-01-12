import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

import { users } from "../db";
import { alreadyTriggerd } from "../utils/cf";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).auth.user().onDelete(async (snapshot, { eventId }) => {
  if (await alreadyTriggerd(eventId)) {
    return;
  }

  await firestore().runTransaction(async transaction => {
    const admin = await users.administrators(transaction);
    // if alread registered admin user, does not auto register as admin
    if (admin.length > 0) {
      return;
    }

    const user = await users.select(snapshot.uid);
    await users.destroy(user, transaction);
  });
});