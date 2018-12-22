import cors from "cors";
import express, { Response } from "express";
import * as functions from 'firebase-functions';

import { archive, category, entry } from "../db";
import { asTyped } from "../utils";

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
  const archives = await archive.all();

  pack(res, archives);
});

app.get("/archives/:yyyy/:mm", cors(corsOptions), async (req, res) => {
  const { yyyy, mm } = asTyped(req.params);
  const { page } = asTyped(req.query);
  const entries = await archive.entries(yyyy, mm, page);

  pack(res, entries);
});

app.get("/categories", cors(corsOptions), async (req, res) => {
  pack(res, await category.all());
});

app.get("/categories/:category", cors(corsOptions), async (req, res) => {
  const { category } = asTyped(req.params);
  const { page } = asTyped(req.query);

  pack(res, await category.entries(category, page));
});

app.get("/entries", cors(corsOptions), async (req, res) => {
  const { page } = asTyped(req.query);

  pack(res, await entry.list(page));
});

app.get("/entries/latest", cors(corsOptions), async (req, res) => {
  pack(res, await entry.latest());
});

app.get("/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const { yyyy, mm, slug } = asTyped(req.params);

  pack(res, await entry.show(yyyy, mm, slug));
});

app.get("/status", cors(corsOptions), async (req, res) => {
  res.status(200).send("OK");
});

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);