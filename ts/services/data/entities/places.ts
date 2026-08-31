import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Country, Place } from "../../../types/domain.ts";
import { KnownTypes } from "../../../constants/data.ts";

import { readThings } from "./things.ts";
import { readCountries, readPlaces } from "../readers.ts";
import { readThingCovers } from "../media/photos.ts";

import type {
  GeocodedPlace,
  GeocodedPlaceWithCover,
} from "../../../domain/places.ts";
import {
  addPlaceCover,
  compareCountries,
  compareCountryThings,
  hasCoordinates,
  hasUsableCoordinates,
  readCountryUrns,
  readPlaceUrns,
} from "./places-helpers.ts";

export type PlaceCovers = ReturnType<typeof readThingCovers>;

/** Accepts places with usable coordinates outside the near-null area. */
export function hasValidCoordinates(place: Place): place is GeocodedPlace {
  if (!hasCoordinates(place)) {
    return false;
  }
  const { latitude, longitude } = place;
  // Filter out "Null Island" and near-null coordinates
  return hasUsableCoordinates(latitude, longitude);
}

/** Reads places and keeps only those with valid coordinates. */
export function readGeocodedPlaces(tdb: TribbleDB): GeocodedPlace[] {
  const placeUrns = readPlaceUrns(tdb);
  const places = readPlaces(tdb, placeUrns);
  return places.filter(hasValidCoordinates);
}

/** Bulk search for covers. One lookup replaces a lookup per place. */
export function readGeocodedPlacesWithCovers(
  tdb: TribbleDB,
): GeocodedPlaceWithCover[] {
  const covers = readThingCovers(tdb, KnownTypes.PLACE);
  const places = readGeocodedPlaces(tdb);
  const addCover = addPlaceCover.bind(null, covers);

  return places.map(addCover);
}

/** Reads every country and sorts them for display. */
export function readAllCountries(tdb: TribbleDB): Country[] {
  const ids = readCountryUrns(tdb);
  const countries = readCountries(tdb, ids);

  return countries.sort(compareCountries);
}

/** For the country listing page. */
export function readAllCountryThings(tdb: TribbleDB): TripleObject[] {
  const ids = readCountryUrns(tdb);
  const countries = readThings(tdb, ids);

  return countries.sort(compareCountryThings);
}
