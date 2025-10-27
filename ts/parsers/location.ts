import { z } from "zod";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants";
import { Country, Place } from "../types";
import { readThing } from "../services/things";
import { arrayify } from "../arrays";
import { CountrySchema, PlaceSchema } from "./schemas";
import { parseObject } from "./parser";

/* */
export function parsePlace(
  tdb: TribbleDB,
  place: TripleObject,
): Place | undefined {
  const result = PlaceSchema.safeParse(place);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  const refs = arrayify(result.data.in);

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
    ...result.data,
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
