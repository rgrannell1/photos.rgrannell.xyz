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

/** Reports whether an album belongs to the selected country. */
export function hasCountry(selectedCountry: string, album: Album): boolean {
  return setify(fromNullable(album.country)).has(selectedCountry);
}

/** Reports whether an album belongs to the selected trip. */
export function hasTrip(selectedTrip: string, album: Album): boolean {
  return album.trip === selectedTrip;
}

/** Applies the selected country filter when one exists. */
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

/** Applies the selected trip filter when one exists. */
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

/** Applies active album filters to the cached album list. */
export function filterAlbums(filters: AlbumFilters): Album[] {
  const countryAlbums = filterAlbumsByCountry(albumsCacheState.albums, filters);
  const tripAlbums = filterAlbumsByTrip(countryAlbums, filters);
  return tripAlbums;
}

/** Refreshes album data and resolves attributes for the albums page. */
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
