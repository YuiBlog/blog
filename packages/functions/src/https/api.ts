import cors from "cors";
import express, { Response } from "express";
import * as functions from "firebase-functions";

import { archives, categories, entries, settings } from "../db";
import { asTyped } from "../utils/type";

const app = express();
const corsOptions: cors.CorsOptions = {
  maxAge: 36000,
  origin: "*"
};

function pack(res: Response, object: any): void {
  res.set("Cache-Control", "public, max-age=60, s-maxage=120");
  res.status(200).send(object);
}

app.options("*", cors(corsOptions));

app.get("/api/archives", cors(corsOptions), async (req, res) => {
  pack(res, await archives.all());
});

app.get("/api/archives/:yyyy/:mm", cors(corsOptions), async (req, res) => {
  const { yyyy, mm } = asTyped(req.params);
  const { page } = asTyped(req.query);

  pack(res, await archives.entries(yyyy, mm, page));
});

app.get("/api/blog/settings", cors(corsOptions), async (req, res) => {
  pack(res, {
    blog: await settings.blog(),
    user: await settings.user()
  });
});

app.get("/api/categories", cors(corsOptions), async (req, res) => {
  pack(res, await categories.all());
});

app.get("/api/categories/:category", cors(corsOptions), async (req, res) => {
  const { category } = asTyped(req.params);
  const { page } = asTyped(req.query);

  pack(res, await categories.entries(category, page));
});

app.get("/api/entries", cors(corsOptions), async (req, res) => {
  const { page } = asTyped(req.query);

  pack(res, await entries.list(page));
});

app.get("/api/entries/latest", cors(corsOptions), async (req, res) => {
  pack(res, await entries.latest());
});

app.get("/api/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const { yyyy, mm, slug } = req.params;

  try {
    pack(res, await entries.show(`${yyyy}/${mm}/${slug}`));
  } catch (err) {
    // 404
    pack(res, { next: null, previous: null, entry: null });
  }
});

app.get("/api/status", cors(corsOptions), async (req, res) => {
  res.status(200).send({ status: "OK" });
});

if (process.env.NODE_ENV === "development") {
  app.listen(3001);
} else {
  // tslint:disable:prettier
  module.exports = functions.runWith({
    memory: "256MB",
    timeoutSeconds: 10
  }).https.onRequest(app);
}