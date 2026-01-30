/* String Utilities */

import { PLURALS } from "../constants.ts";

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralise(str: string): string {
  if (PLURALS.has(str)) {
    return PLURALS.get(str)!;
  }

  return str + "s";
}

const CAMEL_CASE_CACHE = new Map<string, string>();

export function camelCase(str: string): string {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }

  // Caching this since it took about 10ms at load time, so why not eliminate that?
  if (CAMEL_CASE_CACHE.has(str)) {
    return CAMEL_CASE_CACHE.get(str)!;
  }

  const result = str.replace(
    /[-_ ]+([a-z0-9])/g,
    (_, char) => char.toUpperCase(),
  );

  CAMEL_CASE_CACHE.set(str, result);
  return result;
}

export function binomial(binomial: string) {
  const pretty = binomial.replace(/-/g, " ");
  return capitalise(pretty);
}

/**
 * Humanise an id for display (e.g. "train station" -> "Train station",
 * "national-park" -> "National park").
 */
export function humanise(str: string): string {
  const spaced = str.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/*
 * Markdown renderer is mangling descriptions.
 */
export function preprocessDescription(description: string): string {
  return description.replace(/\\"/g, '"');
}
