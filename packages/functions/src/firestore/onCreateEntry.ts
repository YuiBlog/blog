import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";

import { incrementArchiveCount, selectArchive } from "../aggregation/archive";
import { incrementCategoryCount, selectCategory } from "../aggregation/category";
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
  await firestore().runTransaction(async transaction => {
    const archive = await selectArchive(new Date(entry.created_at._seconds * 1000), transaction);
    const categories = entry.categories.map(async w => await selectCategory(w, transaction));

    await incrementArchiveCount(archive, transaction);
    for (let category of categories) {
      await incrementCategoryCount(await category, transaction);
    }
  });
});