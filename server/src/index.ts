import "./bootstrap/initialize";

// == Firestore Triggers ========================
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onCreateEntry") {
  exports.onCreateEntry = require("./firestore/onCreateEntry");
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onUpdateEntry") {
  exports.onUpdateEntry = require("./firestore/onUpdateEntry");
}
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "onDeleteEntry") {
  exports.onDeleteEntry = require("./firestore/onDeleteEntry");
}

// == HTTPS Triggers ============================
if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "api") {
  exports.api = require("./https/api");
}
