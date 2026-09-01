/* Resolve album-list routes and retain their streamed source model. */

import { AlbumsPage } from "../../../components/pages/albums/albums.ts";
import type { Country } from "../../../types/domain.ts";
import { services } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import { type Maybe } from "../../../commons/collections/maybe.ts";
import { resolveAlbumsPage } from "./filters.ts";

export const albumsCacheState = {
  albums: services.readAllAlbums(),
  countries: services.readAllCountries(),
  loaded: false,
};

export const albumCountries = new Map<string, Country[]>();

export const yearRecaps = new Map<number, Maybe<string>>();

export const tripNames = new Map<string, Maybe<string>>();

export type AlbumFilters = {
  selectedCountry: Maybe<string>;
  selectedTrip: Maybe<string>;
  tripName: Maybe<string>;
};

export const albumsEntry = pageEntry({
  page: AlbumsPage,
  resolve: resolveAlbumsPage,
});
