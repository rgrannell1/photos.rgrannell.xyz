import { TribbleDB } from "@rgrannell1/tribbledb";
import { readParsedThing, readParsedThings, readThing, readThings } from "./things.ts";
import { parseFeature } from "../parsers/feature.ts";

export const readFeature = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parseFeature,
    tdb,
    id,
  );
};

export const readFeatures = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(
    parseFeature,
    tdb,
    urns,
  );
};
