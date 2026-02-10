import { TribbleDB } from "@rgrannell1/tribbledb";
import type { Place } from "../types.ts";
import { KnownTypes } from "../constants.ts";
import { readPlaces } from "./readers.ts";

export type GeocodedPlace = Place & {
  latitude: number;
  longitude: number;
};

function hasValidCoordinates(place: Place): place is GeocodedPlace {
  const latitude = (place as any).latitude as number | undefined;
  const longitude = (place as any).longitude as number | undefined;

  if (latitude === undefined || longitude === undefined) {
    return false;
  }

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return false;
  }

  // Filter out "Null Island" and near-null coordinates
  if (Math.abs(latitude) < 1e-4 && Math.abs(longitude) < 1e-4) {
    return false;
  }

  return true;
}

/*
 * Read all places that have non-null, finite latitude/longitude.
 */
export function readGeocodedPlaces(tdb: TribbleDB): GeocodedPlace[] {
  const placeUrns = new Set<string>(
    tdb.search({
      source: { type: KnownTypes.PLACE },
    }).sources(),
  );

  const places = readPlaces(tdb, placeUrns);

  return places.filter(hasValidCoordinates);
}
