import { TribbleDB } from "@rgrannell1/tribbledb";
import {
  parseAmphibian,
  parseInsect,
  parseMammal,
  parseReptile,
  parseSubject,
} from "../parsers/subject.ts";
import { readParsedThing, readParsedThings, readThing, readThings } from "./things.ts";

export const readMammal = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseMammal, tdb, id);
};

export const readReptile = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseReptile, tdb, id);
};

export const readAmphibian = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseMammal, tdb, id);
};

export const readInsect = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseInsect, tdb, id);
};

export const readSubject = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(parseSubject, tdb, id);
};

export const readSubjects = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseSubject, tdb, urns);
};

export const readMammals = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseMammal, tdb, urns);
};

export const readReptiles = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseReptile, tdb, urns);
};

export const readAmphibians = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseAmphibian, tdb, urns);
};

export const readInsects = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseInsect, tdb, urns);
};
