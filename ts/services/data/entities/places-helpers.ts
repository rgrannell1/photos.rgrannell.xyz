/* Support places operations. */

/* Support places operations. */
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Country, Place } from "../../../types/domain.ts";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { one } from "../../../commons/collections/arrays.ts";
import { withDefault } from "../../../commons/collections/maybe.ts";
import type {
  GeocodedPlace,
  GeocodedPlaceWithCover,
} from "../../../domain/places.ts";
import type { PlaceCovers } from "./places.ts";

export function hasFiniteCoordinates(
  latitude: number,
  longitude: number,
): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude);
}

export function isNearNullIsland(latitude: number, longitude: number): boolean {
  const latitudeIsNearZero = Math.abs(latitude) < 1e-4;
  const longitudeIsNearZero = Math.abs(longitude) < 1e-4;
  return latitudeIsNearZero && longitudeIsNearZero;
}

export function hasCoordinates(
  place: Place,
): place is Place & { latitude: number; longitude: number } {
  return place.latitude !== undefined && place.longitude !== undefined;
}

export function hasUsableCoordinates(
  latitude: number,
  longitude: number,
): boolean {
  const isFinite = hasFiniteCoordinates(latitude, longitude);
  if (!isFinite) {
    return false;
  }
  const isNearNull = isNearNullIsland(latitude, longitude);
  return !isNearNull;
}

export function readPlaceUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.PLACE } };
  return tdb.search(query).sources();
}

export function readCountryUrns(tdb: TribbleDB): Set<string> {
  const query = {
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  };
  const urns = tdb.search(query).sources();
  return urns;
}

export function addPlaceCover(
  covers: PlaceCovers,
  place: GeocodedPlace,
): GeocodedPlaceWithCover {
  const placeId = asUrn(place.id).id;
  const cover = covers.get(placeId);
  return { ...place, coverThumbnailUrl: cover?.thumbnailUrl };
}

export function compareCountries(countryA: Country, countryB: Country): number {
  return countryA.name.localeCompare(countryB.name);
}

export function compareCountryThings(
  countryA: TripleObject,
  countryB: TripleObject,
): number {
  const firstName = withDefault(one(countryA.name), "");
  const secondName = withDefault(one(countryB.name), "");
  return firstName.localeCompare(secondName);
}
