import * as cors from "cors";
import * as express from "express";
import { Response } from "express";
import * as functions from 'firebase-functions';

import * as query from "../shared/query";

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

app.get("/api/categories", cors(corsOptions), async (req, res) => {
  const categories = await query.category.all();

  pack(res, categories);
});

app.get("/api/categories/:category", cors(corsOptions), async (req, res) => {
  const entries = await query.category.entries(req.params.category, 0);

  pack(res, entries);
});

app.get("/api/entries", cors(corsOptions), async (req, res) => {
  const entries = await query.entry.list(0);

  pack(res, entries);
});

app.get("/api/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const entry = await query.entry.show(req.params.yyyy, req.params.mm, req.params.slug);

  pack(res, entry);
});

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);