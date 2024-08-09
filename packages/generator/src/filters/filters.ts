export const hiddenFromPublishingFilter: Filter["filter"] = (token) => {
  return !token.attributes?.hiddenFromPublishing;
};

import { Filter } from "style-dictionary/types";
import { args, ReleaseType } from "../args";

const getTokenState = (token) =>
  typeof token.attributes?.state === "string"
    ? token.attributes.state
    : "UNKNOWN";

export const alphaFilter: Filter["filter"] = (token) =>
  ["UNPUBLISHED", "CURRENT", "CHANGED"].includes(getTokenState(token));

export const betaFilter: Filter["filter"] = (token) =>
  ["CURRENT", "CHANGED"].includes(getTokenState(token));

export const stableFilter: Filter["filter"] = (token) =>
  ["CURRENT"].includes(getTokenState(token));

export const releaseFilter = (release: ReleaseType): Filter["filter"] =>
  (() => {
    switch (release) {
      case "alpha":
        return alphaFilter;
      case "beta":
        return betaFilter;
      case "stable":
      default:
        return stableFilter;
    }
  })();
