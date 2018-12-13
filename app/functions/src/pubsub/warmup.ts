import axios from "axios";
import * as functions from "firebase-functions";

module.exports = functions.runWith({
  memory: "128MB",
  timeoutSeconds: 60,
}).pubsub.topic("WarmupFunction").onPublish(async (msg) => {
  const urls = [
    "https://blog.mochizuki.moe/", // render
    "https://blog.mochizuki.moe/api/status", // api
  ];

  for (let url of urls) {
    const res = await axios.get(url);
    console.log(`http function ${url} called with status ${res.status}`);
  }
});