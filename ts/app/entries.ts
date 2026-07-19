/*
 * The route entries: one PageEntry per page, reading params and services to
 * build each page's attrs. Page components stay module-level singletons,
 * created once, so mount semantics are unchanged.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { setify } from "../commons/sets.ts";
import { albumUrn, countryUrn, photoUrn, videoUrn } from "../models/urn.ts";
import { AlbumsPage } from "../components/pages/albums.ts";
import { AboutPage } from "../components/pages/about.ts";
import { VideosPage } from "../components/pages/videos.ts";
import { AlbumPage } from "../components/pages/album.ts";
import { PhotosPage } from "../components/pages/photos.ts";
import { PhotoPage } from "../components/pages/photo.ts";
import { VideoPage } from "../components/pages/video.ts";
import { ListingPage } from "../components/pages/listing.ts";
import { ListingsPage } from "../components/pages/listings.ts";
import { ChecklistPage } from "../components/pages/checklist.ts";
import { ThingPage } from "../components/pages/thing.ts";
import { MapPage } from "../components/pages/map.ts";
import type { GeocodedPlaceWithCover } from "../services/places.ts";
import type { TripPolyline } from "../services/albums.ts";
import { services, state } from "./context.ts";
import { pageEntry } from "./shell.ts";

const albumsPageComponent = AlbumsPage();
const albumPageComponent = AlbumPage();
const aboutPageComponent = AboutPage();
const videosPageComponent = VideosPage();
const videoPageComponent = VideoPage();
const photosPageComponent = PhotosPage();
const photoPageComponent = PhotoPage();
const listingPageComponent = ListingPage();
const listingsPageComponent = ListingsPage();
const checklistPageComponent = ChecklistPage();
const thingPageComponent = ThingPage();
const mapPageComponent = MapPage();

/* */
export const albumsEntry = pageEntry({
  page: albumsPageComponent,
  resolve() {
    const countrySlug = m.route.param("country");
    const selectedCountry = countrySlug ? countryUrn(countrySlug) : undefined;

    const allAlbums = services.readAllAlbums();
    const albums = selectedCountry
      ? allAlbums.filter((album) => setify(album.country).has(selectedCountry))
      : allAlbums;

    return {
      attrs: {
        albums,
        services,
        visible: state.sidebarVisible,
        selectedCountry,
      },
    };
  },
});

/* */
export const albumEntry = pageEntry({
  page: albumPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (id) {
      state.currentAlbum = albumUrn(id);
    }
    if (!state.currentAlbum) {
      return "No album selected";
    }

    const album = services.readAlbum(state.currentAlbum);
    if (!album) {
      return "Album not found";
    }

    const photos = services.readAlbumPhotosByAlbumId(state.currentAlbum);
    const videos = services.readAlbumVideosByAlbumId(state.currentAlbum);
    const { subjects, locations } = services.readThingsByAlbumId(
      state.currentAlbum,
    );

    const tripPreviousAlbums = album.trip
      ? services.readTripAlbums(album.trip)
        .filter((tripAlbum) => tripAlbum.minDate < album.minDate)
        .sort((albumA, albumB) => albumB.minDate - albumA.minDate)
      : [];

    return {
      appClass: album.albumBanner ? "album-page" : undefined,
      attrs: {
        album,
        subjects,
        country: album.country || [],
        locations,
        photos,
        videos,
        services,
        visible: state.sidebarVisible,
        tripPreviousAlbums,
      },
    };
  },
});

/* */
export const aboutEntry = pageEntry({
  page: aboutPageComponent,
  resolve() {
    return {
      appClass: "album-page",
      attrs: { visible: state.sidebarVisible },
    };
  },
});

/* */
export const videosEntry = pageEntry({
  page: videosPageComponent,
  resolve() {
    return {
      attrs: {
        videos: services.readAllVideos(),
        visible: state.sidebarVisible,
      },
    };
  },
});

// Sort URNs by date without parsing each photo — parsing is deferred to
// render batches. Loaded per navigation in onmatch, not per redraw.
let photoUrns: string[] = [];

/* */
export const photosEntry = pageEntry({
  page: photosPageComponent,
  onmatch() {
    photoUrns = services.readAllPhotoUrns();
  },
  resolve() {
    return {
      attrs: { photoUrns, services, visible: state.sidebarVisible },
    };
  },
});

/* */
export const thingEntry = pageEntry({
  page: thingPageComponent,
  resolve() {
    const pair = m.route.param("pair");
    state.currentUrn = `urn:ró:${pair}`;

    if (!state.currentUrn) {
      return "No thing selected";
    }

    let things: TripleObject[] = [];
    const parsed = asUrn(state.currentUrn);
    if (parsed.id === "*") {
      things = services.readNamedTypeThings(pair.split(":")[0]);
    } else {
      const thing = services.readThing(state.currentUrn);
      if (thing) {
        things = [thing];
      }
    }

    return {
      attrs: {
        urn: state.currentUrn,
        things,
        services,
        visible: state.sidebarVisible,
      },
    };
  },
});

/* */
export const photoEntry = pageEntry({
  page: photoPageComponent,
  onmatch(params) {
    state.currentPhoto = photoUrn(params.id as string);
  },
  resolve() {
    if (!state.currentPhoto) {
      return "No photo selected";
    }

    const photo = services.readPhoto(state.currentPhoto);
    if (!photo) {
      return "Photo not found";
    }

    return {
      attrs: { photo, services, visible: state.sidebarVisible },
    };
  },
});

/* */
export const videoEntry = pageEntry({
  page: videoPageComponent,
  onmatch(params) {
    state.currentUrn = videoUrn(params.id as string);
  },
  resolve() {
    if (!state.currentUrn) {
      return "No video selected";
    }

    const video = services.readVideo(state.currentUrn);
    if (!video) {
      return "Video not found";
    }

    return {
      attrs: { video, services, visible: state.sidebarVisible },
    };
  },
});

/* */
export const listingEntry = pageEntry({
  page: listingPageComponent,
  onmatch(params) {
    state.currentType = params.type as string;
  },
  resolve() {
    if (!state.currentType) {
      return "No type selected";
    }

    const filter = m.route.param("filter") as string | undefined;
    const things = services.readNamedTypeThings(state.currentType);

    return {
      attrs: {
        type: state.currentType,
        things,
        services,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

/* */
export const listingsEntry = pageEntry({
  page: listingsPageComponent,
  resolve() {
    return {
      attrs: { visible: state.sidebarVisible, services },
    };
  },
});

/* */
export const checklistEntry = pageEntry({
  page: checklistPageComponent,
  resolve() {
    // The life-list defaults to the Irish view when no filter is in the URL.
    const filter = (m.route.param("filter") as string | undefined) ?? "ireland";
    const entries = services.readWildBirdChecklist();
    const covers = services.readThingCovers("bird");
    const regularCount = state.regularBirdSpecies;

    return {
      attrs: {
        entries,
        covers,
        regularCount,
        nemesisBirds: state.unphotographedNemesis,
        services,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

// map data is loaded per navigation in onmatch, not per redraw
let placesForMap: GeocodedPlaceWithCover[] = [];
let tripPolylines: TripPolyline[] = [];

/* */
export const mapEntry = pageEntry({
  page: mapPageComponent,
  onmatch() {
    placesForMap = services.readGeocodedPlacesWithCovers();
    tripPolylines = services.readTransferPolylines();
  },
  resolve() {
    return {
      attrs: {
        visible: state.sidebarVisible,
        places: placesForMap,
        tripPolylines,
      },
    };
  },
});
