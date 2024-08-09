import StyleDictionary from "style-dictionary";
import { hiddenFromPublishingFilter, releaseFilter } from "./filters";
import { recursiveFilter } from "./filters/utils";

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
              filter: (token, options) =>
                recursiveFilter(token, options, [
                  hiddenFromPublishingFilter,
                  releaseFilter,
                ]),
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

  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();
}

run();
