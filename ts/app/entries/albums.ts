/* Resolve album-list routes and retain their streamed source model. */

import m from "mithril";
import { setify } from "../../commons/sets.ts";
import { countryUrn, tripUrn } from "../../commons/urn.ts";
import {
  AlbumsPage,
  type AlbumsPageAttrs,
} from "../../components/pages/albums.ts";
import type { Album, Country } from "../../types/domain.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";
import {
  fromNullable,
  isSome,
  mapMaybe,
  type Maybe,
  withDefault,
} from "../../commons/maybe.ts";

const albumsPageComponent = AlbumsPage();

let cachedAlbums = services.readAllAlbums();
let cachedCountries = services.readAllCountries();
let cachedAfterLoad = false;
const albumCountries = new Map<string, Country[]>();
const yearRecaps = new Map<number, Maybe<string>>();
const tripNames = new Map<string, Maybe<string>>();

function readAlbumCountries(album: Album): Country[] {
  const cached = albumCountries.get(album.id);
  if (cached) {
    return cached;
  }

  const countries = services.readCountries(setify(fromNullable(album.country)));
  if (state.loaded) {
    albumCountries.set(album.id, countries);
  }
  return countries;
}

function readYearRecap(year: number): Maybe<string> {
  const cached = yearRecaps.get(year);
  if (cached !== undefined) {
    return cached;
  }

  const recap = services.readYearRecap(year);
  if (state.loaded) {
    yearRecaps.set(year, recap);
  }
  return recap;
}

function readTripName(trip: string): Maybe<string> {
  const cached = tripNames.get(trip);
  if (cached !== undefined) {
    return cached;
  }

  const name = services.readTripName(trip);
  if (state.loaded) {
    tripNames.set(trip, name);
  }
  return name;
}

function readTripLabel(trip: string): string {
  return withDefault(readTripName(trip), "Trip");
}

type AlbumFilters = {
  selectedCountry: Maybe<string>;
  selectedTrip: Maybe<string>;
  tripName: Maybe<string>;
};

function refreshAlbumsCache(): void {
  if (state.loaded && cachedAfterLoad) {
    return;
  }
  cachedAlbums = services.readAllAlbums();
  cachedCountries = services.readAllCountries();
  cachedAfterLoad = state.loaded;
}

function readAlbumFilters(): AlbumFilters {
  const countrySlug = fromNullable<string>(m.route.param("country"));
  const selectedCountry = mapMaybe(countrySlug, countryUrn);
  const tripSlug = fromNullable<string>(m.route.param("trip"));
  const selectedTrip = mapMaybe(tripSlug, tripUrn);
  const tripName = mapMaybe(selectedTrip, readTripLabel);
  return { selectedCountry, selectedTrip, tripName };
}

function hasCountry(selectedCountry: string, album: Album): boolean {
  return setify(fromNullable(album.country)).has(selectedCountry);
}

function hasTrip(selectedTrip: string, album: Album): boolean {
  return album.trip === selectedTrip;
}

function filterAlbums(filters: AlbumFilters): Album[] {
  let albums = cachedAlbums;
  if (isSome(filters.selectedCountry)) {
    albums = albums.filter(hasCountry.bind(null, filters.selectedCountry));
  }
  if (isSome(filters.selectedTrip)) {
    albums = albums.filter(hasTrip.bind(null, filters.selectedTrip));
  }
  return albums;
}

function resolveAlbumsPage() {
  refreshAlbumsCache();
  const filters = readAlbumFilters();
  const attrs: AlbumsPageAttrs = {
    albums: filterAlbums(filters),
    countries: cachedCountries,
    readAlbumCountries,
    readYearRecap,
    tripName: filters.tripName,
    visible: state.sidebarVisible,
    selectedCountry: filters.selectedCountry,
    selectedTrip: filters.selectedTrip,
  };
  return { attrs };
}

export const albumsEntry = pageEntry({
  page: albumsPageComponent,
  resolve: resolveAlbumsPage,
});
