import StyleDictionary from "style-dictionary";
import { alphaFilter, betaFilter, stableFilter } from "./filters";
import { args } from "./args";

const releaseFilter = (() => {
  console.log("📦 Release type:", args.release);
  switch (args.release) {
    case "alpha":
      return alphaFilter;
    case "beta":
      return betaFilter;
    case "stable":
    default:
      return stableFilter;
  }
})();

async function run() {
  const styleDictionary = new StyleDictionary(
    {
      source: ["./tokens/**/*.json"],
      platforms: {
        css: {
          transformGroup: "css",
          buildPath: "dist/css/",
          files: [
            {
              destination: "_variables.css",
              format: "css/variables",
              filter: releaseFilter,
            },
          ],
        },
      },
    },
    {
      verbosity: "verbose",
    }
  );

  await styleDictionary.hasInitialized;

  console.log("Build started...");
  console.log("\n==============================================");

  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();

  console.log("\n==============================================");
  console.log("\nBuild completed!");
}

run();
