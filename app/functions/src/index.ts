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

async function handleRequest(req, res) {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  return await nuxt.render(req, res);
}

app.use(handleRequest);

export const render = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);
