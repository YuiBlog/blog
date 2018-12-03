import * as firebase from "firebase-admin";

export function initializeAppWithProjectId() {
  if (firebase.app.length != 0) {
    return;
  }

  firebase.initializeApp({
    projectId: "blog-mochizuki-moe"
  });
  firebase.firestore().settings({
    timestampsInSnapshots: true,
  });
}

export function initializeApp() {
  if (firebase.app.length != 0) {
    return;
  }

  firebase.initializeApp();
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}
