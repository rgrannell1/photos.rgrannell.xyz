import { TribbleDB } from "@rgrannell1/tribbledb";
import { parseCountry, parsePlace } from "../parsers/location.ts";
import { readParsedThing, readParsedThings } from "./things.ts";

export const readCountry = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parseCountry,
    tdb,
    id,
  );
};

export const readPlace = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parsePlace,
    tdb,
    id,
  );
};

export const readParsedCountries = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(
    parseCountry,
    tdb,
    urns,
  );
};

export const readParsedPlaces = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(
    parsePlace,
    tdb,
    urns,
  );
};
