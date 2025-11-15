/* String Utilities */

import { PLURALS } from "../constants.ts";

const CAMEL_CASE_CACHE = new Map<string, string>();

export class Strings {
  static capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static pluralise(str: string): string {
    if (PLURALS.has(str)) {
      return PLURALS.get(str)!;
    }

    return str + "s";
  }
  static camelCase(str: string): string {
    // Caching this since it took about 10ms at load time, so why not eliminate that?
    if (CAMEL_CASE_CACHE.has(str)) {
      return CAMEL_CASE_CACHE.get(str)!;
    }

    const result = str
      .replace(/[-_ ]+([a-z0-9])/g, (_, char) => char.toUpperCase());

    CAMEL_CASE_CACHE.set(str, result);
    return result;
  }

  static binomial(binomial: string) {
    const pretty = binomial.replace(/-/g, " ");
    return Strings.capitalise(pretty);
  }
  /*
   * Markdown renderer is mangling descriptions.
   */
  static preprocessDescription(description: string): string {
    return description.replace(/\\"/g, '"');
  }
}
