/* Support albums operations. */

/* Support albums operations. */
import { setify } from "../../../commons/collections/sets.ts";
import { type AlbumsPageAttrs } from "../../../components/pages/albums/albums.ts";
import type { Album } from "../../../types/domain.ts";
import { state } from "../../context.ts";
import { fromNullable, isSome } from "../../../commons/collections/maybe.ts";
import type { AlbumFilters } from "./albums.ts";
import { albumsCacheState } from "./albums.ts";
import {
  readAlbumCountries,
  readAlbumFilters,
  readYearRecap,
  refreshAlbumsCache,
} from "./cache.ts";

export function hasCountry(selectedCountry: string, album: Album): boolean {
  return setify(fromNullable(album.country)).has(selectedCountry);
}

export function hasTrip(selectedTrip: string, album: Album): boolean {
  return album.trip === selectedTrip;
}

export function filterAlbumsByCountry(
  albums: Album[],
  filters: AlbumFilters,
): Album[] {
  const selectedCountry = filters.selectedCountry;
  if (isSome(selectedCountry)) {
    const matchesCountry = hasCountry.bind(null, selectedCountry);
    return albums.filter(matchesCountry);
  }
  return albums;
}

export function filterAlbumsByTrip(
  albums: Album[],
  filters: AlbumFilters,
): Album[] {
  const selectedTrip = filters.selectedTrip;
  if (isSome(selectedTrip)) {
    const matchesTrip = hasTrip.bind(null, selectedTrip);
    return albums.filter(matchesTrip);
  }
  return albums;
}

export function filterAlbums(filters: AlbumFilters): Album[] {
  const countryAlbums = filterAlbumsByCountry(albumsCacheState.albums, filters);
  const tripAlbums = filterAlbumsByTrip(countryAlbums, filters);
  return tripAlbums;
}

export function resolveAlbumsPage() {
  refreshAlbumsCache();
  const filters = readAlbumFilters();
  const attrs: AlbumsPageAttrs = {
    albums: filterAlbums(filters),
    countries: albumsCacheState.countries,
    readAlbumCountries,
    readYearRecap,
    tripName: filters.tripName,
    visible: state.sidebarVisible,
    selectedCountry: filters.selectedCountry,
    selectedTrip: filters.selectedTrip,
  };
  return { attrs };
}
