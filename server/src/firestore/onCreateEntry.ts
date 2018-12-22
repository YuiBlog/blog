import * as functions from "firebase-functions";

import { Entry } from "../types";
import { incrementArchiveCount } from "../utils/aggregation/archive";
import { incrementCategoryCount } from "../utils/aggregation/category";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onCreate(async (snapshot) => {
  const entry = snapshot.data() as Entry;

  // archive
  await incrementArchiveCount(new Date(entry.created_at._seconds * 1000));

  // category
  for (let category of entry.categories) {
    await incrementCategoryCount(category);
  }
});