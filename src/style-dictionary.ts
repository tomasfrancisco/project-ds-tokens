import { createCommand } from "commander";
import StyleDictionary from "style-dictionary";
import { alphaFilter, betaFilter, stableFilter } from "./filters";

type ReleaseType = "alpha" | "beta" | "stable";

const program = createCommand("style-dictionary");
program.option<ReleaseType>(
  "--release <type>",
  "Release type",
  (value) => {
    console.log("Release type:", value);
    return value as ReleaseType;
  },
  "stable"
);

program.parse();

const options = program.opts();

const releaseFilter = (() => {
  switch (options.release) {
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
