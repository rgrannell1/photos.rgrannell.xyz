import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import {
  parseAmphibian,
  parseBird,
  parseInsect,
  parseMammal,
  parseReptile,
} from "./parsers.ts";
import { parseByType } from "./parser.ts";
import type { Amphibian, Bird, Insect, Mammal, Reptile } from "../types.ts";

/*
 * Parse known subject types
 */
export const parseSubject = parseByType<
  Bird | Mammal | Reptile | Amphibian | Insect
>({
  [KnownTypes.BIRD]: parseBird,
  [KnownTypes.MAMMAL]: parseMammal,
  [KnownTypes.REPTILE]: parseReptile,
  [KnownTypes.AMPHIBIAN]: parseAmphibian,
  [KnownTypes.INSECT]: parseInsect
});
