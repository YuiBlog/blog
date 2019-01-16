// deployment script for server-side applications.
const child_process = require("child_process");
const functions = require("../lib");
const args = [];

for (const func in functions) {
  args.push(`functions:${func}`);
}

const firebase = child_process.spawn("firebase", `deploy --only ${args.join(",")}`.split(" "), {stdio: "inherit"});
firebase.on("error", (err) => {
  console.error(err);
});
firebase.on("close", (code) => {
  process.exit(code);
});
