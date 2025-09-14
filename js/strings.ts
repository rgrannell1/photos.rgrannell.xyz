/* String Utilities */

export class Strings {
  static capitalise(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static pluralise(str: string): string {
    return str + 's'; // Y
  }
}
