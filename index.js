const { spawn } = require("child_process");
const path = require("node:path");
const setup = require("./setup.json");

function run(token, channel, music) {
  const process = spawn("node", [
    path.join(__dirname, "src", "radio.js"),
    token,
    channel,
    music,
  ]);

  process.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

setup.forEach(({ token, channel, music }) => {
  run(token, channel, music);
});
