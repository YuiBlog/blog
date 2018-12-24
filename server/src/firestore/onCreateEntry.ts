import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

import { incrementArchiveCount } from "../aggregation/archive";
import { incrementCategoryCount } from "../aggregation/category";
import { Entry } from "../types";
import { alreadyTriggerd } from "../utils/cf";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onCreate(async (snapshot, { eventId }) => {
  if (await alreadyTriggerd(eventId)) {
    return;
  }

  const entry = snapshot.data() as Entry;
  firestore().runTransaction(async transaction => {
    await incrementArchiveCount(transaction, new Date(entry.created_at._seconds * 1000));

    for (let category of entry.categories) {
      await incrementCategoryCount(transaction, category);
    }
  });
});