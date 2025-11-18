import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import { arrayify } from "../commons/arrays.ts";
import { PlaceSchema } from "./schemas.ts";
import { logParseWarning } from "../commons/logger.ts";
import { type InferOutput, safeParse } from "valibot";
import { readLocations } from "../services/readers.ts";
import type { Location } from "../types.ts";
import { parseCountry, parseUnesco } from "./parsers.ts";
import { parseByType } from "./parser.ts";

type PlaceType = InferOutput<typeof PlaceSchema> & {
  type: "place";
  in: Location[];
};

/* */
export function parsePlace(
  tdb: TribbleDB,
  place: TripleObject,
): PlaceType | undefined {
  const result = safeParse(PlaceSchema, place);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }

  const refs = arrayify(result.output.in);
  const lookedUpRefs = readLocations(tdb, new Set(refs));

  return {
    ...result.output,
    type: "place",
    in: lookedUpRefs, // TODO
  };
}

/*
 * Parse on object identified by a location relation. At the moment, that'
 * countries and places
 */
export const parseLocation = parseByType<Location>({
  [KnownTypes.PLACE]: parsePlace,
  [KnownTypes.COUNTRY]: parseCountry,
  [KnownTypes.UNESCO]: parseUnesco,
});
