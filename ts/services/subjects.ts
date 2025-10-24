import {
  parseAmphibian,
  parseInsect,
  parseMammal,
  parseReptile,
} from "../parsers/subject.ts";
import { readParsedThing, readParsedThings } from "./things.ts";

export const readMammal = readParsedThing.bind(null, parseMammal);

export const readReptile = readParsedThing.bind(null, parseReptile);

export const readAmphibian = readParsedThing.bind(null, parseAmphibian);

export const readInsect = readParsedThing.bind(null, parseInsect);

export const readParsedMammals = readParsedThings.bind(null, parseMammal);

export const readParsedReptiles = readParsedThings.bind(null, parseReptile);

export const readParsedAmphibians = readParsedThings.bind(null, parseAmphibian);

export const readParsedInsects = readParsedThings.bind(null, parseInsect);
