import * as functions from "firebase-functions";

import { Entry } from "../shared/models/entry";
import { up } from "../utils/categoryAggregation";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onCreate(async (snapshot) => {
  const entry = snapshot.data() as Entry;
  for (let category of entry.categories) {
    await up(category);
  }
});