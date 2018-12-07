// サーバーでのみ firebase-admin を inject しているけど、多分ダメだと思う
// 動いてはいるけどね
// tslint:disable
import { Context } from "nuxt";

export default ({ app, isDev }: Context) => {
  if (process.server) {
    import("../shared/bootstrap").then(w => {
      try {
        if (isDev) {
          w.initializeAppWithProjectId();
        } else {
          w.initializeApp();
        }
      } catch (err) {
        // ...?
        console.error(err);
      }

      import("../shared/query").then(w => app.$firebase = w);
    });
  }
}