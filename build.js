const { generateFromFolder, generateIndex } = require("svg-to-svelte");
const { name, version } = require("./package.json");

(async () => {
  const { moduleNames } = await generateFromFolder(`svgs`);

  await generateIndex({
    moduleNames,
    pkgName: name,
    pkgVersion: version,
    outputFile: "ICON_INDEX.md",
  });
})();
