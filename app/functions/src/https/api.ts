import * as cors from "cors";
import * as express from "express";
import * as functions from 'firebase-functions';

import * as query from "../shared/query";

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: "*",
  maxAge: 36000
};

app.options("*", cors(corsOptions));

app.get("/api/categories", cors(corsOptions), async (req, res) => {
  const categories = await query.category.all();

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(categories);
});

app.get("/api/entries", cors(corsOptions), async (req, res) => {
  const entries = await query.entry.list(0);

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(entries);
});

app.get("/api/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const entry = await query.entry.show(req.params.yyyy, req.params.mm, req.params.slug);

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(entry);
});

module.exports = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);