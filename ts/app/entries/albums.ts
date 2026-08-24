/* Resolve album-list routes and retain their streamed source model. */

import m from "mithril";
import { setify } from "../../commons/sets.ts";
import { countryUrn, tripUrn } from "../../commons/urn.ts";
import { AlbumsPage } from "../../components/pages/albums.ts";
import type { Album, Country } from "../../types.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const albumsPageComponent = AlbumsPage();

let cachedAlbums = services.readAllAlbums();
let cachedCountries = services.readAllCountries();
let cachedAfterLoad = false;
const albumCountries = new Map<string, Country[]>();
const yearRecaps = new Map<number, string | undefined>();
const tripNames = new Map<string, string | undefined>();

function readAlbumCountries(album: Album): Country[] {
  const cached = albumCountries.get(album.id);
  if (cached) {
    return cached;
  }

  const countries = services.readCountries(setify(album.country));
  if (state.loaded) {
    albumCountries.set(album.id, countries);
  }
  return countries;
}

function readYearRecap(year: number): string | undefined {
  if (yearRecaps.has(year)) {
    return yearRecaps.get(year);
  }

  const recap = services.readYearRecap(year);
  if (state.loaded) {
    yearRecaps.set(year, recap);
  }
  return recap;
}

function readTripName(trip: string): string | undefined {
  if (tripNames.has(trip)) {
    return tripNames.get(trip);
  }

  const name = services.readTripName(trip);
  if (state.loaded) {
    tripNames.set(trip, name);
  }
  return name;
}

export const albumsEntry = pageEntry({
  page: albumsPageComponent,
  resolve() {
    if (!state.loaded || !cachedAfterLoad) {
      cachedAlbums = services.readAllAlbums();
      cachedCountries = services.readAllCountries();
      cachedAfterLoad = state.loaded;
    }

    const countrySlug = m.route.param("country");
    const selectedCountry = countrySlug ? countryUrn(countrySlug) : undefined;

    const tripSlug = m.route.param("trip");
    const selectedTrip = tripSlug ? tripUrn(tripSlug) : undefined;

    let albums = cachedAlbums;
    if (selectedCountry) {
      albums = albums.filter((album) => setify(album.country).has(selectedCountry));
    }
    if (selectedTrip) {
      albums = albums.filter((album) => album.trip === selectedTrip);
    }

    return {
      attrs: {
        albums,
        countries: cachedCountries,
        readAlbumCountries,
        readYearRecap,
        tripName: selectedTrip ? readTripName(selectedTrip) ?? "Trip" : undefined,
        visible: state.sidebarVisible,
        selectedCountry,
        selectedTrip,
      },
    };
  },
});
