import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import { arrayify } from "../commons/arrays.ts";
import { CountrySchema, PlaceSchema, UnescoSchema } from "./schemas.ts";
import { parseObject } from "./parser.ts";
import { logParseWarning } from "../commons/logger.ts";
import { type InferOutput, safeParse } from "valibot";
import { readLocations } from "../services/readers.ts";
import type { Location } from "../types.ts";

// TODO type this function more strongly

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

export function parseCountry(
  _: TribbleDB,
  country: TripleObject,
) {
  return parseObject(CountrySchema, "country", country);
}

export function parseUnesco(
  _: TribbleDB,
  unesco: TripleObject,
) {
  return parseObject(UnescoSchema, "unesco", unesco);
}

/*
 * Parse on object identified by a location relation. At the moment, that'
 * countries and places
 */
export function parseLocation(
  tdb: TribbleDB,
  location: TripleObject,
) {
  if (!location.id) {
    return undefined;
  }
  const id = asUrn(location.id as string);

  if (id.type === KnownTypes.PLACE) {
    return parsePlace(tdb, location);
  } else if (id.type === KnownTypes.COUNTRY) {
    return parseCountry(tdb, location);
  } else if (id.type === KnownTypes.UNESCO) {
    return parseUnesco(tdb, location);
  }

  return undefined;
}
