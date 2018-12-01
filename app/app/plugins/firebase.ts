import { Context } from "nuxt";

export default ({ app }: Context) => {
  if ((process as any).server) {
    const firebase = require("firebase-admin");

    try {
      firebase.initializeApp({
        projectId: "blog-mochizuki-moe"
      });

      firebase.firestore().settings({
        timestampsInSnapshots: true
      });
    } catch (err) {
      // console.error(err);
    }

    app.$firebase = firebase;

  }
};
