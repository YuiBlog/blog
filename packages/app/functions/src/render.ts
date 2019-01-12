import express from "express";
import * as functions from "firebase-functions";
import { Nuxt } from "nuxt";

const app = express();

const nuxt = new Nuxt({
  build: {
    publicPath: "/assets/"
  },
  buildDir: "./lib/.nuxt",
  dev: false
});

async function handleRequest(req: express.Request, res: express.Response) {
  // NOTE: If url path ends with .css or .js, Nuxt / Vue Router interept url as assets path.
  if (/\.(js|css)$/.test(req.url)) {
    if (req.url.indexOf("?") > 0) {
      req.url += "&assets=false";
    } else {
      req.url += "?assets=false";
    }
  }
  return await nuxt.render(req, res);
}

app.use(handleRequest);

// tslint:disable:prettier
module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 20
}).https.onRequest(app);
