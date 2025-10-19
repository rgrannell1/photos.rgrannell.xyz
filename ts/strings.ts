/* String Utilities */

import { PLURALS } from "./constants.ts";

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
    return str
      .replace(/[-_ ]+([a-zA-Z0-9])/g, (_, char) => char.toUpperCase());
  }
}
