import * as firebase from "firebase-admin";

export function initializeAppWithProjectId() {
  if (firebase.apps.length) {
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
  if (firebase.apps.length) {
    return;
  }

  firebase.initializeApp();
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}
