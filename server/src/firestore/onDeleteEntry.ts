import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

import { decrementArchiveCount } from "../aggregation/archive";
import { decrementCategoryCount } from "../aggregation/category";
import { Entry } from "../types";
import { alreadyTriggerd } from "../utils/cf";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onDelete(async (snapshot, { eventId }) => {
  if (await alreadyTriggerd(eventId)) {
    return;
  }

  const entry = snapshot.data() as Entry;
  firestore().runTransaction(async transaction => {
    await decrementArchiveCount(transaction, new Date(entry.created_at._seconds * 1000));

    for (let category of entry.categories) {
      await decrementCategoryCount(transaction, category);
    }
  });
});