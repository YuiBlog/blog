import * as firebase from "firebase-admin";

firebase.initializeApp();
firebase.firestore().settings({
  timestampsInSnapshots: true
});

export { firebase };