import StyleDictionary from "style-dictionary";
import { hiddenFromPublishingFilter, releaseFilter } from "./filters";
import { recursiveFilter } from "./filters/utils";
import { ReleaseType } from "./args";

async function run() {
  const releases: ReleaseType[] = ["alpha", "beta", "stable"];
  const styleDictionary = new StyleDictionary(
    {
      source: ["./tokens/**/*.json"],
      platforms: {
        ...releases.reduce(
          (platforms, release) => ({
            ...platforms,
            [`css-${release}`]: {
              transformGroup: "css",
              buildPath: `../../packages/${release}/css/`,
              files: [
                {
                  destination: "_variables.css",
                  format: "css/variables",
                  filter: (token, options) =>
                    recursiveFilter(token, options, [
                      hiddenFromPublishingFilter,
                      releaseFilter(release),
                    ]),
                },
              ],
            },
          }),
          {}
        ),
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
