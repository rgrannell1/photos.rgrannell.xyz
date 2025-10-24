
import { parseCountry, parsePlace } from "../parsers/location.ts";
import { readParsedThing, readParsedThings } from "./things.ts";

export const readCountry = readParsedThing.bind(
  null,
  parseCountry,
)

export const readPlace = readParsedThing.bind(
  null,
  parsePlace,
);

export const readParsedCountries = readParsedThings.bind(
  null,
  parseCountry,
);

export const readParsedPlaces = readParsedThings.bind(
  null,
  parsePlace,
);
