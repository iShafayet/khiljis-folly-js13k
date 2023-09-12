const fs = require("fs");
const archiver = require("archiver");
const { execSync } = require("child_process");
const path = require("path");

const distDir = process.cwd() + "/dist";
const zippedDir = process.cwd() + "/zipped";

fs.mkdirSync(zippedDir, { recursive: true });
const output = fs.createWriteStream(zippedDir + "/game.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

archive.pipe(output);
archive.file(distDir + "/index.html", { name: "index.html" });

archive.finalize().then(() => {
  const ADVANCED_COMP_DIR = `C:\\Dev\\advancedcomp`;
  const COMMAND = `.\\advzip.exe -z -4 -i 1000 .\\game.zip`;

  if (!fs.existsSync(ADVANCED_COMP_DIR)) {
    console.log("advzip util is not available.");
    return;
  }
  setTimeout(() => {
    fs.renameSync("./zipped/game.zip", ADVANCED_COMP_DIR + "\\game.zip");
    let res = execSync(COMMAND, { cwd: ADVANCED_COMP_DIR });
    console.log(res.toString());
    fs.renameSync(ADVANCED_COMP_DIR + "\\game.zip", "./zipped/game.zip");
  }, 5000);
});
