import { Filter } from "style-dictionary/types";

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
