import { z } from "zod";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants";
import { Country, Place } from "../types";
import { readThing } from "../services/things";
import { arrayify } from "../arrays";

const PlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  feature: z.union([z.string(), z.array(z.string())]).optional(),
  in: z.union([z.string(), z.array(z.string())]).optional(),
  shortName: z.string().optional(),
  wikipedia: z.string().optional(),
  unescoId: z.string().optional(),
});

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

const CountrySchema = z.object({
  id: z.string(),
  flag: z.string().optional(),
  name: z.string(),
  contains: z.union([z.string(), z.array(z.string())]).optional(),
});

/* */
export function parseCountry(
  _: TribbleDB,
  country: TripleObject,
): Country | undefined {
  const result = CountrySchema.safeParse(country);
  if (!result.success) {
    console.error(result.error.issues);
    return;
  }

  return {
    id: result.data.id,
    type: "country",
    flag: result.data.flag,
    name: result.data.name,
    contains: result.data.contains,
  };
}

/* */
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
