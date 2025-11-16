import type { Triple } from "@rgrannell1/tribbledb";

/* */
export class Triples {
  static src(triple: Triple): string {
    return triple[0];
  }

  static rel(triple: Triple): string {
    return triple[1];
  }

  static tgt(triple: Triple): string {
    return triple[2];
  }
}
