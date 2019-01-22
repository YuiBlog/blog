// tslint:disable:no-var-requires
import dotenv from "dotenv";
import * as firebase from "firebase-admin";

dotenv.config({ path: "../../.env" });

firebase.initializeApp({
  credential: firebase.credential.cert(require("../credentials.json")),
  databaseURL: process.env.FIREBASE_CLIENT_DATABASE_URL,
  projectId: process.env.FIREBASE_CLIENT_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CLIENT_STORAGE_BUCKET
});
firebase.firestore().settings({
  timestampsInSnapshots: true
});

import "./https/api";
