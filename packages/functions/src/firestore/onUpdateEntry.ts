import { Entry } from "@yuiblog/types";
import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import difference from "lodash/difference";

import { decrementArchiveCount, incrementArchiveCount, selectArchive } from "../aggregation/archive";
import { decrementCategoryCount, incrementCategoryCount, selectCategory } from "../aggregation/category";
import { alreadyTriggerd } from "../utils/cf";
import { createUrl } from "../utils/url";

async function onUpdate(change: functions.Change<firestore.DocumentSnapshot>, { eventId }: functions.EventContext): Promise<void> {
  if (await alreadyTriggerd(eventId)) {
    return;
  }

  const before = change.before.data() as Entry;
  const after = change.after.data() as Entry;

  // 両方 draft だったら更新の意味が無いので
  if (before.status !== "publish" && after.status !== "publish") {
    return;
  }

  await firestore().runTransaction(async transaction => {
    const categories = {
      after: difference(after.categories, before.categories).map(async w => await selectCategory(w, transaction)),
      before: difference(before.categories, after.categories).map(async w => await selectCategory(w, transaction))
    };

    transaction.update(change.after.ref, {
      url: createUrl(after)
    });

    // update archive and categories
    if (before.created_at._seconds !== after.created_at._seconds) {
      const archive = {
        after: await selectArchive(new Date(after.created_at._seconds * 1000), transaction),
        before: await selectArchive(new Date(before.created_at._seconds * 1000), transaction)
      };

      await decrementArchiveCount(archive.before, transaction);
      await incrementArchiveCount(archive.after, transaction);
    }

    for (const category of categories.before) {
      await decrementCategoryCount(await category, transaction);
    }

    for (const category of categories.after) {
      await incrementCategoryCount(await category, transaction);
    }
  });
}

// tslint:disable:prettier
module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onUpdate(onUpdate);
