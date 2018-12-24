import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import difference from "lodash/difference";

import { decrementArchiveCount, incrementArchiveCount } from "../aggregation/archive";
import { decrementCategoryCount, incrementCategoryCount } from "../aggregation/category";
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
  firestore().runTransaction(async transaction => {
    if (before.created_at._seconds !== after.created_at._seconds) {
      await decrementArchiveCount(transaction, new Date(before.created_at._seconds * 1000));
      await incrementArchiveCount(transaction, new Date(after.created_at._seconds * 1000));
    }

    {
      const diff = difference(before.categories, after.categories);
      for (let category of diff) {
        await decrementCategoryCount(transaction, category);
      }
    }

    {
      const diff = difference(after.categories, before.categories);
      for (let category of diff) {
        await incrementCategoryCount(transaction, category);
      }
    }
  });
});