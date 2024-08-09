import { createCommand } from "commander";

export type ReleaseType = "alpha" | "beta" | "stable";

const program = createCommand("style-dictionary");
program.option<ReleaseType>(
  "--release <type>",
  "Release type",
  (value) => {
    return value as ReleaseType;
  },
  "stable"
);

program.parse();

const options = program.opts();

export const args = {
  release: options.release as ReleaseType,
};
