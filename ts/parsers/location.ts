import { z } from "zod";
import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../constants";
import { Country, Place } from "../types";

const PlaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  feature: z.union([z.string(), z.array(z.string())]).optional(),
  in:   z.union([z.string(), z.array(z.string())]).optional(),
  shortName: z.string().optional(),
  wikipedia: z.string().optional()
});

export function parsePlace(_: TribbleDB, place: TripleObject): Place | undefined {
  const result = PlaceSchema.safeParse(place);
  if (!result.success) {
    console.error(result.error.issues)
    return
  }

  return {
    id: result.data.id,
    name: result.data.name,
    feature: result.data.feature,
    in: result.data.in,
    shortName: result.data.shortName,
    wikipedia: result.data.wikipedia,
  }
}

const CountrySchema = z.object({

})

export function parseCountry(_: TribbleDB, place: TripleObject): Country | undefined {
  const result = PlaceSchema.safeParse(place);
  if (!result.success) {
    console.error(result.error.issues)
    return
  }

  return {
    id: result.data.id
  }
}

export function parseLocation(tdb: TribbleDB, location: TripleObject) {
  if (!location.id) {
    return undefined;
  }

  const id = asUrn(location.id as string);

  if (id.type === KnownTypes.PLACE) {
    return parsePlace(tdb, location)
  } else if (id.type === KnownTypes.COUNTRY) {
    return parseCountry(tdb, location)
  }

  return undefined
}
