const fs = require("fs");
const path = require("path");

function transform(str) {
  if (!str) return "";
  return (str.match(/<svg[\w\W]+<\/svg>/g) || [""])[0];
}

(() => {
  const files = fs.readdirSync("./svgs", { encoding: "utf-8" });
  if (!files) {
    return console.log("[error] no files found.");
  }

  for (const file of files) {
    if (path.extname(file).toLowerCase() === ".vue") {
      const fabPath = path.join(__dirname, "svgs", file);
      const f2wPath = fabPath.replace(/\.vue$/g, ".svg");
      const fstr = fs.readFileSync(fabPath, { encoding: "utf-8" });
      if (!fs.existsSync(f2wPath)) {
        fs.writeFileSync(f2wPath, transform(fstr), { encoding: "utf-8" });
      }

      fs.unlinkSync(fabPath);
    }
  }
})();
