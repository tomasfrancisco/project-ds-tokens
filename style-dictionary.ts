import StyleDictionary from "style-dictionary";

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
