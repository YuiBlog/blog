import * as express from "express";
import * as functions from 'firebase-functions';
import { Nuxt } from "nuxt";

const app = express();

const nuxt = new Nuxt({
  dev: false,
  buildDir: "./lib/.nuxt",
  build: {
    publicPath: "/assets/"
  }
});

function handleRequest(req, res) {
  res.set("Cache-Control", "public, max-age=600, s-maxage=1200");
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, (promise) => {
      promise.then(resolve).catch(reject);
    });
  });
}

app.use(handleRequest);

export const render = functions.https.onRequest(app);
