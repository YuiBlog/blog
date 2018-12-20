import "./bootstrap/initialize";

// == Firestore ========================
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onCreateEntry") {
  exports.onCreateEntry = require("./firestore/onCreateEntry");
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onUpdateEntry") {
  exports.onUpdateEntry = require("./firestore/onUpdateEntry");
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onDeleteEntry") {
  exports.onDeleteEntry = require("./firestore/onDeleteEntry");
}

// == HTTPS ============================
exports.https = {};

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "https-api") {
  exports.https.api = require("./https/api");
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "https-render") {
  exports.https.render = require("./https/render");
}

// == PubSub ===========================
exports.pubsub = {};

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "pubsub-warmup") {
  exports.pubsub.warmup = require("./pubsub/warmup");
}