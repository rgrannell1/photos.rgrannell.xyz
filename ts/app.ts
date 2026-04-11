/*
 * Mithril's Router wants components, so for the moment each page has a
 * wrapper app.
 */

import m from "mithril";
import { Header } from "./components/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import {
  getTripAlbums,
  readAlbumPhotosByAlbumId,
  readAlbumVideosByAlbumId,
  readAllAlbums,
  readThingsByAlbumId,
} from "./services/albums.ts";
import { AboutPage } from "./pages/about.ts";
import { VideosPage } from "./pages/videos.ts";
import { readAllVideos } from "./services/videos.ts";
import { listen } from "./commons/events.ts";
import { setify } from "./commons/sets.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { AlbumPage } from "./pages/album.ts";
import { PhotosPage } from "./pages/photos.ts";
import { PhotoPage } from "./pages/photo.ts";
import { chooseThingCover, readAllPhotos } from "./services/photos.ts";
import { readAlbum, readPhoto } from "./services/readers.ts";
import { ListingPage } from "./pages/listing.ts";
import { ListingsPage } from "./pages/listings.ts";
import { readNamedTypeThings, readThing } from "./commons/things.ts";
import type { Album } from "./types.ts";
import { ThingPage } from "./pages/thing.ts";
import { MapPage } from "./pages/map.ts";
import type { GeocodedPlace } from "./services/places.ts";

type AppAttrs = {};
const state = await loadState();

const headerComponent: m.Component<any> = Header();
const sidebarComponent: m.Component<any> = Sidebar();
const albumsPageComponent: m.Component<any> = AlbumsPage();
const albumPageComponent: m.Component<any> = AlbumPage();
const aboutPageComponent: m.Component<any> = AboutPage();
const videosPageComponent: m.Component<any> = VideosPage();
const photosPageComponent: m.Component<any> = PhotosPage();
const photoPageComponent: m.Component<any> = PhotoPage();
const listingPageComponent: m.Component<any> = ListingPage();
const listingsPageComponent: m.Component<any> = ListingsPage();
const thingPageComponent: m.Component<any> = ThingPage();
const mapPageComponent: m.Component<any> = MapPage();

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;
  console.info(`navigating to route: ${route}`);

  state.sidebarVisible = false;
  m.route.set(route);
});

listen("switch_theme", () => {
  state.darkMode = !state.darkMode;
});

listen("click_burger_menu", () => {
  state.sidebarVisible = !state.sidebarVisible;
});

/* */
export function AlbumsApp(): m.Component<AppAttrs> {
  return {
    oninit() {
    },
    view() {
      const countrySlug = m.route.param("country");
      const selectedCountry = countrySlug ? `urn:ró:country:${countrySlug}` : undefined;

      const allAlbums = readAllAlbums(state.data);
      const albums = selectedCountry
        ? allAlbums.filter((album) => setify(album.country).has(selectedCountry))
        : allAlbums;

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(albumsPageComponent, {
              albums,
              services: state.services,
              visible: state.sidebarVisible,
              selectedCountry,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function AlbumApp(): m.Component<AppAttrs> {
  return {
    view() {
      const id = m.route.param("id");
      if (id) {
        state.currentAlbum = `urn:ró:album:${id}`;
      }
      if (!state.currentAlbum) {
        return m("p", "No album selected");
      }
      const album = readAlbum(state.data, state.currentAlbum) as Album;
      const photos = readAlbumPhotosByAlbumId(state.data, state.currentAlbum);
      const videos = readAlbumVideosByAlbumId(state.data, state.currentAlbum);

      if (!album) {
        return m("p", "Album not found");
      }

      const { subjects, locations } = readThingsByAlbumId(
        state.data,
        state.currentAlbum,
      );

      const tripPreviousAlbums = album.trip
        ? getTripAlbums(state.data, album.trip)
          .filter((a) => a.minDate < album.minDate)
          .sort((a, b) => b.minDate - a.minDate)
        : [];

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(albumPageComponent, {
              album,
              subjects,
              country: album.country || [],
              locations,
              photos,
              videos,
              services: state.services,
              visible: state.sidebarVisible,
              tripPreviousAlbums,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function AboutApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(aboutPageComponent, { visible: state.sidebarVisible }),
          ]),
        ],
      );
    },
  };
}

/* */
export function VideosApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(videosPageComponent, {
              videos: readAllVideos(state.data),
              visible: state.sidebarVisible,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function PhotosApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(photosPageComponent, {
              photos: readAllPhotos(state.data),
              visible: state.sidebarVisible,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function ThingApp(): m.Component<AppAttrs> {
  let things: TripleObject[] = [];

  return {
    view() {
      const pair = m.route.param("pair");
      state.currentUrn = `urn:ró:${pair}`;

      const parsed = asUrn(state.currentUrn);
      if (parsed.id === "*") {
        things = readNamedTypeThings(state.data, pair.split(":")[0]);
      } else {
        const thing = readThing(state.data, state.currentUrn);
        if (thing) {
          things = [thing];
        }
      }

      if (!state.currentUrn) {
        return m("p", "No thing selected");
      }

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(thingPageComponent, {
              urn: state.currentUrn,
              things,
              services: state.services,
              visible: state.sidebarVisible,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function PhotoApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const id = m.route.param("id");
      state.currentPhoto = `urn:ró:photo:${id}`;
    },
    view() {
      if (!state.currentPhoto) {
        return m("p", "No photo selected");
      }
      const photo = readPhoto(state.data, state.currentPhoto);

      if (!photo) {
        return m("p", "Photo not found");
      }

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(photoPageComponent, {
              photo,
              services: state.services,
              visible: state.sidebarVisible,
            }),
          ]),
        ],
      );
    },
  };
}

/* */
export function ListingApp(): m.Component<AppAttrs> {
  return {
    oninit() {
      const type = m.route.param("type");
      state.currentType = type;
    },

    view() {
      if (!state.currentType) {
        return m("p", "No type selected");
      }

      const things = readNamedTypeThings(state.data, state.currentType);

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(listingPageComponent, {
              type: state.currentType,
              things,
              services: state.services,
              visible: state.sidebarVisible,
            }),
          ]),
        ],
      );
    },
  };
}

export function ListingsApp(): m.Component<AppAttrs> {
  return {
    view() {
      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(listingsPageComponent, { visible: state.sidebarVisible }),
          ]),
        ],
      );
    },
  };
}

/* */
export function MapApp(): m.Component<AppAttrs> {
  return {
    view() {
      const geocodedPlaces: GeocodedPlace[] = state.services
        .readGeocodedPlaces();

      const placesForMap = geocodedPlaces.map((place) => {
        const cover = chooseThingCover(state.data, place.id);
        return {
          ...place,
          coverThumbnailUrl: cover?.thumbnailUrl,
        };
      });

      const tripPolylines = state.services.readTransferPolylines();

      return m(
        "div.photos-app",
        { class: state.darkMode ? "dark-mode" : undefined },
        [
          m(headerComponent, state),
          m("div.app-container", {
            class: state.sidebarVisible ? "sidebar-visible" : undefined,
          }, [
            m(sidebarComponent, { visible: state.sidebarVisible }),
            m(mapPageComponent, {
              visible: state.sidebarVisible,
              places: placesForMap,
              tripPolylines,
            }),
          ]),
        ],
      );
    },
  };
}
