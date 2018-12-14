import * as cors from "cors";
import * as express from "express";
import { Response } from "express";
import * as functions from 'firebase-functions';

import * as query from "../shared/query";
import { asTyped } from "../shared/utils";

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

app.get("/api/archives", cors(corsOptions), async (req, res) => {
  const archives = await query.archive.all();

  pack(res, archives);
});

app.get("/api/archives/:yyyy/:mm", cors(corsOptions), async (req, res) => {
  const { yyyy, mm } = asTyped(req.params);
  const { page } = asTyped(req.query);
  const entries = await query.archive.entries(yyyy, mm, page);

  pack(res, entries);
});

app.get("/api/categories", cors(corsOptions), async (req, res) => {
  const categories = await query.category.all();

  pack(res, categories);
});

app.get("/api/categories/:category", cors(corsOptions), async (req, res) => {
  const { category } = asTyped(req.params);
  const { page } = asTyped(req.query);
  const entries = await query.category.entries(category, page);

  pack(res, entries);
});

app.get("/api/entries", cors(corsOptions), async (req, res) => {
  const { page } = asTyped(req.query);
  const entries = await query.entry.list(page);

  pack(res, entries);
});

app.get("/api/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const { yyyy, mm, slug } = asTyped(req.params);
  const entry = await query.entry.show(yyyy, mm, slug);

  pack(res, entry);
});

app.get("/api/status", cors(corsOptions), async (req, res) => {
  res.status(200).send("OK");
});

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);