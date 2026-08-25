import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Country, Place } from "../types.ts";
import { KnownRelations, KnownTypes } from "../constants/data.ts";
import { one } from "../commons/arrays.ts";
import { readThings } from "../commons/things.ts";
import { readCountries, readPlaces } from "./readers.ts";
import { readThingCovers } from "./photos.ts";
import { withDefault } from "../commons/maybe.ts";

export type GeocodedPlace = Place & {
  latitude: number;
  longitude: number;
};

export type GeocodedPlaceWithCover = GeocodedPlace & {
  coverThumbnailUrl?: string;
};

export function hasValidCoordinates(place: Place): place is GeocodedPlace {
  const latitude = place.latitude;
  const longitude = place.longitude;
  const hasMissingCoordinates = latitude === undefined || longitude === undefined;

  if (hasMissingCoordinates) {
    return false;
  }

  const hasInvalidCoordinates = !Number.isFinite(latitude) ||
    !Number.isFinite(longitude);
  if (hasInvalidCoordinates) {
    return false;
  }

  // Filter out "Null Island" and near-null coordinates
  const isNearNullIsland = Math.abs(latitude) < 1e-4 && Math.abs(longitude) < 1e-4;
  if (isNearNullIsland) {
    return false;
  }

  return true;
}

export function readGeocodedPlaces(tdb: TribbleDB): GeocodedPlace[] {
  const placeUrns = new Set<string>(
    tdb.search({
      source: { type: KnownTypes.PLACE },
    }).sources(),
  );

  const places = readPlaces(tdb, placeUrns);

  return places.filter(hasValidCoordinates);
}

/* Bulk search for covers. One lookup replaces a lookup per place. */
export function readGeocodedPlacesWithCovers(
  tdb: TribbleDB,
): GeocodedPlaceWithCover[] {
  const covers = readThingCovers(tdb, "place");

  return readGeocodedPlaces(tdb).map((place) => {
    const cover = covers.get(asUrn(place.id).id);
    return { ...place, coverThumbnailUrl: cover?.thumbnailUrl };
  });
}

export function readAllCountries(tdb: TribbleDB): Country[] {
  const ids = tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  }).sources();

  return readCountries(tdb, ids).sort((countryA, countryB) => {
    return countryA.name.localeCompare(countryB.name);
  });
}

/* For the country listing page. */
export function readAllCountryThings(tdb: TribbleDB): TripleObject[] {
  const ids = new Set(tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  }).sources());

  return readThings(tdb, ids).sort((countryA, countryB) => {
    const firstName = withDefault(one(countryA.name), "");
    const secondName = withDefault(one(countryB.name), "");
    return firstName.localeCompare(secondName);
  });
}
