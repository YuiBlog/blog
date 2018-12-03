import * as cors from "cors";
import * as express from "express";
import * as firebase from "firebase-admin";
import * as functions from 'firebase-functions';

import "../bootstrap/initialize";
import * as query from "../shared/entry";

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: "*",
  maxAge: 36000
};

app.options("*", cors(corsOptions));

app.get("/api/entries", cors(corsOptions), async (req, res) => {
  const entries = await query.list(0);

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(entries);
});

app.get("/api/entries/:yyyy/:mm/:slug", cors(corsOptions), async (req, res) => {
  const entry = await query.show(req.params.yyyy, req.params.mm, req.params.slug);

  res.set("Cache-Control", "public, max-age=60, s-maxage=300");
  res.status(200).send(entry);
});

export const api = functions.runWith({
  memory: "256MB",
  timeoutSeconds: 10
}).https.onRequest(app);