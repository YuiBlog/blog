import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import difference from "lodash/difference";

import { decrementArchiveCount, incrementArchiveCount, selectArchive } from "../aggregation/archive";
import { decrementCategoryCount, incrementCategoryCount, selectCategory } from "../aggregation/category";
import { Entry } from "../types";
import { alreadyTriggerd } from "../utils/cf";

// TODO: use transaction
// ref: https://firebase.google.com/docs/firestore/manage-data/transactions?hl=ja
module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onUpdate(async (change, { eventId }) => {
  if (await alreadyTriggerd(eventId)) {
    return;
  }

  const before = change.before.data() as Entry;
  const after = change.after.data() as Entry;
  await firestore().runTransaction(async transaction => {
    const categories = {
      before: difference(before.categories, after.categories).map(async w => await selectCategory(w, transaction)),
      after: difference(after.categories, before.categories).map(async w => await selectCategory(w, transaction))
    }

    if (before.created_at._seconds !== after.created_at._seconds) {
      const archive = {
        before: await selectArchive(new Date(before.created_at._seconds * 1000), transaction),
        after: await selectArchive(new Date(after.created_at._seconds * 1000), transaction)
      };

      await decrementArchiveCount(archive.before, transaction);
      await incrementArchiveCount(archive.after, transaction);
    }

    for (let category of categories.before) {
      await decrementCategoryCount(await category, transaction);
    }

    for (let category of categories.after) {
      await incrementCategoryCount(await category, transaction);
    }
  });
});