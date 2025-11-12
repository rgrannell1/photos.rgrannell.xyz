import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants.ts";
import type { Country, Place, Unesco } from "../types.ts";
import { readThing } from "../services/things.ts";
import { arrayify } from "../commons/arrays.ts";
import { CountrySchema, PlaceSchema, UnescoSchema } from "./schemas.ts";
import { parseObject } from "./parser.ts";
import { logParseWarning } from "../commons/logger.ts";
import { safeParse } from "valibot";

/* */
export function parsePlace(
  tdb: TribbleDB,
  place: TripleObject,
): Place | undefined {
  const result = safeParse(PlaceSchema, place);
  if (!result.success) {
    logParseWarning(result.issues);
    return;
  }

  const refs = arrayify(result.output.in);

  const lookedUpRefs = refs.flatMap((ref) => {
    const obj = readThing(tdb, ref);
    if (!obj) {
      return [];
    }

    const parsed = parseLocation(tdb, obj);
    if (!parsed) {
      return [];
    }

    return [parsed];
  });

  return {
    ...result.output,
    type: "place",
    in: lookedUpRefs,
  };
}

export function parseCountry(
  _: TribbleDB,
  country: TripleObject,
): Country | undefined {
  return parseObject(CountrySchema, "country", country);
}

export function parseUnesco(_: TribbleDB, unesco: TripleObject): Unesco | undefined {
  return parseObject(UnescoSchema, "unesco", unesco);
}

/*
 * Parse on object identified by a location relation. At the moment, that'
 * countries and places
 */
export function parseLocation(
  tdb: TribbleDB,
  location: TripleObject,
): Country | Place | undefined {
  if (!location.id) {
    return undefined;
  }

  const id = asUrn(location.id as string);

  if (id.type === KnownTypes.PLACE) {
    return parsePlace(tdb, location);
  } else if (id.type === KnownTypes.COUNTRY) {
    return parseCountry(tdb, location);
  }

  return undefined;
}
