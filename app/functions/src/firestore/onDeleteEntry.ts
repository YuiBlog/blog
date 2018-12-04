import * as functions from "firebase-functions";

import { Entry } from "../shared/models/entry";
import { decrementArchiveCount } from "../utils/aggregation/archive";
import { decrementCategoryCount } from "../utils/aggregation/category";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onDelete(async (snapshot) => {
  const entry = snapshot.data() as Entry;

  // archive
  await decrementArchiveCount(new Date(entry.created_at._seconds * 1000));

  // category
  for (let category of entry.categories) {
    await decrementCategoryCount(category);
  }
});