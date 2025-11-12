import { TribbleDB } from "@rgrannell1/tribbledb";
import { readParsedThing, readParsedThings } from "./things.ts";
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

export const readParsedFeatures = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(
    parseFeature,
    tdb,
    urns,
  );
};
