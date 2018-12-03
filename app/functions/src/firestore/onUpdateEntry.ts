import * as functions from "firebase-functions";
import { difference } from "lodash";

import { Entry } from "../shared/models/entry";
import { down, up } from "../utils/categoryAggregation";

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 30
}).firestore.document("entries/{entryId}").onUpdate(async (change) => {
  const before = change.before.data() as Entry;
  const after = change.after.data() as Entry;

  // before にあって after にないもの
  {
    const diff = difference(before.categories, after.categories);
    for (let category of diff) {
      await down(category);
    }
  }

  // after にあって、 before にないもの
  {
    const diff = difference(after.categories, before.categories);
    for (let category of diff) {
      await up(category);
    }
  }
});