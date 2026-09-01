/* Support places operations. */

/* Support places operations. */
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Country, Place } from "../../../types/domain.ts";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { NULL_ISLAND_TOLERANCE_DEGREES } from "../../../constants/map.ts";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { withDefault } from "../../../commons/collections/maybe.ts";
import type {
  GeocodedPlace,
  GeocodedPlaceWithCover,
} from "../../../domain/places.ts";
import type { PlaceCovers } from "./places.ts";

/** Tests whether both coordinates are finite numbers. */
export function hasFiniteCoordinates(
  latitude: number,
  longitude: number,
): boolean {
  return Number.isFinite(latitude) && Number.isFinite(longitude);
}

/** Rejects coordinates within the site's null-island tolerance. */
export function isNearNullIsland(latitude: number, longitude: number): boolean {
  const latitudeIsNearZero = Math.abs(latitude) < NULL_ISLAND_TOLERANCE_DEGREES;
  const longitudeIsNearZero = Math.abs(longitude) <
    NULL_ISLAND_TOLERANCE_DEGREES;
  return latitudeIsNearZero && longitudeIsNearZero;
}

/** Narrows a place to one with both coordinate values. */
export function hasCoordinates(
  place: Place,
): place is Place & { latitude: number; longitude: number } {
  return place.latitude !== undefined && place.longitude !== undefined;
}

/** Accepts finite coordinates outside the null-island tolerance. */
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

/** Reads every place URN present as a triple source. */
export function readPlaceUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.PLACE } };
  return tdb.search(query).sources();
}

/** Reads place URNs that have a country flag relation. */
export function readCountryUrns(tdb: TribbleDB): Set<string> {
  const query = {
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  };
  const urns = tdb.search(query).sources();
  return urns;
}

/** Adds a matching cover thumbnail URL to a geocoded place. */
export function addPlaceCover(
  covers: PlaceCovers,
  place: GeocodedPlace,
): GeocodedPlaceWithCover {
  const placeId = asUrn(place.id).id;
  const cover = covers.get(placeId);
  return { ...place, coverThumbnailUrl: cover?.thumbnailUrl };
}

/** Orders countries by their display names. */
export function compareCountries(countryA: Country, countryB: Country): number {
  return countryA.name.localeCompare(countryB.name);
}

/** Orders country triple objects by their first names. */
export function compareCountryThings(
  countryA: TripleObject,
  countryB: TripleObject,
): number {
  const firstName = withDefault(selectFirst(countryA.name), "");
  const secondName = withDefault(selectFirst(countryB.name), "");
  return firstName.localeCompare(secondName);
}
