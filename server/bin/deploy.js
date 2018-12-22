const child_process = require("child_process");

function run (command, callback) {
  const firebase = child_process.spawn("firebase", command.split(" "), {stdio: "inherit"});
  firebase.on("error", (err) => {
    console.error(err);
  });
  firebase.on("close", (code) => {
    if (code !== 0) {
      process.exit(code);
    }
    if (callback) {
      callback();
    }
  });
}

const functions = require("../lib");
const args = [];

for (let func in functions) {
  if (func === "renderNuxt") {
    continue;
  }
  args.push(`functions:${func}`);
}

run(`deploy --only ${args.join(",")}`, () => {
  run(`deploy --only hosting:api`, () => {
    process.exit(0);
  });
});
