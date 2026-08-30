/* Support albums operations. */

/* Resolve album-list routes and retain their streamed source model. */
import m from "mithril";
import { setify } from "../../../commons/collections/sets.ts";
import { countryUrn, tripUrn } from "../../../commons/urn.ts";
import type { Album, Country } from "../../../types/domain.ts";
import { services, state } from "../../context.ts";
import {
  fromNullable,
  mapMaybe,
  type Maybe,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import type { AlbumFilters } from "./albums.ts";
import {
  albumCountries,
  albumsCacheState,
  tripNames,
  yearRecaps,
} from "./albums.ts";

export function cacheWhenLoaded<Key, Value>(
  cache: Map<Key, Value>,
  key: Key,
  value: Value,
): void {
  const target = cache;
  const shouldCache = state.loaded;
  if (!shouldCache) return;
  target.set(key, value);
}

export function readCountriesForAlbum(album: Album): Country[] {
  const countryUrns = setify(fromNullable(album.country));
  const countries = services.readCountries(countryUrns);
  return countries;
}

export function readAlbumCountries(album: Album): Country[] {
  const cached = albumCountries.get(album.id);
  if (cached) return cached;

  const countries = readCountriesForAlbum(album);
  cacheWhenLoaded(albumCountries, album.id, countries);
  return countries;
}

export function readYearRecap(year: number): Maybe<string> {
  const cached = yearRecaps.get(year);
  if (cached !== undefined) return cached;

  const recap = services.readYearRecap(year);
  cacheWhenLoaded(yearRecaps, year, recap);
  return recap;
}

export function readTripName(trip: string): Maybe<string> {
  const cached = tripNames.get(trip);
  if (cached !== undefined) return cached;

  const name = services.readTripName(trip);
  cacheWhenLoaded(tripNames, trip, name);
  return name;
}

export function readTripLabel(trip: string): string {
  return withDefault(readTripName(trip), "Trip");
}

export function refreshAlbumsCache(): void {
  const hasLoadedData = state.loaded && albumsCacheState.loaded;
  if (hasLoadedData) {
    return;
  }
  const albums = services.readAllAlbums();
  const countries = services.readAllCountries();
  albumsCacheState.albums = albums;
  albumsCacheState.countries = countries;
  albumsCacheState.loaded = state.loaded;
}

export function readSelectedCountry(): Maybe<string> {
  const countrySlug = fromNullable<string>(m.route.param("country"));
  return mapMaybe(countrySlug, countryUrn);
}

export function readSelectedTrip(): Maybe<string> {
  const tripSlug = fromNullable<string>(m.route.param("trip"));
  return mapMaybe(tripSlug, tripUrn);
}

export function readAlbumFilters(): AlbumFilters {
  const selectedCountry = readSelectedCountry();
  const selectedTrip = readSelectedTrip();
  const tripName = mapMaybe(selectedTrip, readTripLabel);
  return { selectedCountry, selectedTrip, tripName };
}
