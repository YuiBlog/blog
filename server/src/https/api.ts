import cors from "cors";
import express, { Response } from "express";
import * as functions from "firebase-functions";

import { archives, categories, entries, settings } from "../db";
import { asTyped } from "../utils/type";

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: "*",
  maxAge: 36000
};

function pack(res: Response, object: any): void {
  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(object);
}

app.options("*", cors(corsOptions));

app.get("/archives", cors(corsOptions), async (req, res) => {
  pack(res, await archives.all());
});

app.get("/archives/:yyyy/:mm", cors(corsOptions), async (req, res) => {
  const { yyyy, mm } = asTyped(req.params);
  const { page } = asTyped(req.query);

  pack(res, await archives.entries(yyyy, mm, page));
});

app.get("/blog/settings", cors(corsOptions), async (req, res) => {
  pack(res, {
    blog: await settings.blog(),
    user: await settings.user()
  });
});

app.get("/categories", cors(corsOptions), async (req, res) => {
  pack(res, await categories.all());
});

app.get("/categories/:category", cors(corsOptions), async (req, res) => {
  const { category } = asTyped(req.params);
  const { page } = asTyped(req.query);

  pack(res, await categories.entries(category, page));
});

app.get("/entries", cors(corsOptions), async (req, res) => {
  const { page } = asTyped(req.query);

  pack(res, await entries.list(page));
});

app.get("/entries/latest", cors(corsOptions), async (req, res) => {
  pack(res, await entries.latest());
});

app.get("/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const { yyyy, mm, slug } = asTyped(req.params);

  pack(res, await entries.show(yyyy, mm, slug));
});

app.get("/status", cors(corsOptions), async (req, res) => {
  res.status(200).send({ status: "OK" });
});

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);