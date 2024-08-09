import { Config, TransformedToken } from "style-dictionary";
import { Filter } from "style-dictionary/types";

export async function recursiveFilter(
  token: TransformedToken,
  options: Config,
  arrayFilters: Filter["filter"][],
  index = 0
) {
  if (arrayFilters.length === 0) {
    return token;
  }

  const filter = arrayFilters[index];
  const isIncluded = await filter(token, options);
  if (index === arrayFilters.length - 1) {
    return isIncluded;
  }

  if (isIncluded === true) {
    // The filter didn't exclude the token yet, so we continue the filtering chain
    return recursiveFilter(token, options, arrayFilters, index + 1);
  }

  // The filter excluded the token, so we return immediately
  return isIncluded;
}
