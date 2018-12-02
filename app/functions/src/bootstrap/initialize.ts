import * as express from "express";
import * as firebase from "firebase-admin";

firebase.initializeApp();
firebase.firestore().settings({
  timestampsInSnapshots: true
});

const app = express();

export { firebase };