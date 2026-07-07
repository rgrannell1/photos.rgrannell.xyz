import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Place } from "../types.ts";
import { KnownRelations, KnownTypes } from "../constants.ts";
import { readCountries, readPlaces } from "./readers.ts";
import { readPlaceCovers } from "./photos.ts";

export type GeocodedPlace = Place & {
  latitude: number;
  longitude: number;
};

export type GeocodedPlaceWithCover = GeocodedPlace & {
  coverThumbnailUrl?: string | undefined;
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

/*
 * Read all geocoded places, each joined with its cover photo thumbnail.
 * The covers come from one bulk search rather than a per-place lookup.
 */
export function readGeocodedPlacesWithCovers(
  tdb: TribbleDB,
): GeocodedPlaceWithCover[] {
  const covers = readPlaceCovers(tdb);

  return readGeocodedPlaces(tdb).map((place) => {
    const cover = covers.get(asUrn(place.id).id);
    return { ...place, coverThumbnailUrl: cover?.thumbnailUrl };
  });
}

/*
 * Read all countries from the TribbleDB, sorted by name
 */
export function readAllCountries(tdb: TribbleDB): Country[] {
  const ids = tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  }).sources();

  const countries = readCountries(tdb, ids) as Country[];

  const flagToName = new Map(
    countries
      .filter((country) => country.flag)
      .map((country) => [country.flag!, country.name]),
  );

  return countries.sort((countryA, countryB) => {
    const nameA = flagToName.get(countryA.flag ?? "") ?? countryA.name;
    const nameB = flagToName.get(countryB.flag ?? "") ?? countryB.name;
    return nameA.localeCompare(nameB);
  });
}
