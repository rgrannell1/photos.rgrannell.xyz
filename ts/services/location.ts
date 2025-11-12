import { TribbleDB } from "@rgrannell1/tribbledb";
import {
  parseCountry,
  parseLocation,
  parsePlace,
  parseUnesco,
} from "../parsers/location.ts";
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

export const readLocation = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parseLocation,
    tdb,
    id,
  );
};

export const readUnesco = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parseUnesco,
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

export const readParsedLocations = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(
    parseLocation,
    tdb,
    urns,
  );
};
