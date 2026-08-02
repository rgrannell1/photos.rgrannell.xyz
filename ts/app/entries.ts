/*
 * The route entries: one PageEntry per page, reading params and services to
 * build each page's attrs. Page components stay module-level singletons,
 * created once, so mount semantics are unchanged.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { setify } from "../commons/sets.ts";
import { albumUrn, countryUrn, photoUrn, tripUrn, videoUrn } from "../models/urn.ts";
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

    const tripSlug = m.route.param("trip");
    const selectedTrip = tripSlug ? tripUrn(tripSlug) : undefined;

    let albums = services.readAllAlbums();
    if (selectedCountry) {
      albums = albums.filter((album) => setify(album.country).has(selectedCountry));
    }
    if (selectedTrip) {
      albums = albums.filter((album) => album.trip === selectedTrip);
    }

    return {
      attrs: {
        albums,
        services,
        visible: state.sidebarVisible,
        selectedCountry,
        selectedTrip,
      },
    };
  },
});

/* */
export const albumEntry = pageEntry({
  page: albumPageComponent,
  onmatch(params) {
    const id = params.id;
    state.currentAlbum = typeof id === "string" ? albumUrn(id) : undefined;
  },
  resolve() {
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
// render batches. Loaded per navigation in onmatch, not per redraw. While
// the stream is still loading, each redraw re-reads so new photos appear.
let photoUrns: string[] = [];

/* */
export const photosEntry = pageEntry({
  page: photosPageComponent,
  onmatch() {
    photoUrns = services.readAllPhotoUrns();
  },
  resolve() {
    if (!state.loaded) {
      photoUrns = services.readAllPhotoUrns();
    }

    return {
      attrs: { photoUrns, services, visible: state.sidebarVisible },
    };
  },
});

/* */
export const thingEntry = pageEntry({
  page: thingPageComponent,
  onmatch(params) {
    const pair = params.pair;
    state.currentThing = typeof pair === "string" ? `urn:ró:${pair}` : undefined;
  },
  resolve() {
    // needs pruned, fully-derived data
    if (!state.loaded) {
      return "";
    }

    if (!state.currentThing) {
      return "No thing selected";
    }

    let things: TripleObject[] = [];
    const parsed = asUrn(state.currentThing);
    if (parsed.id === "*") {
      things = services.readNamedTypeThings(parsed.type);
    } else {
      const thing = services.readThing(state.currentThing);
      if (thing) {
        things = [thing];
      }
    }

    return {
      attrs: {
        urn: state.currentThing,
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
    const id = params.id;
    state.currentPhoto = typeof id === "string" ? photoUrn(id) : undefined;
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
    const id = params.id;
    state.currentVideo = typeof id === "string" ? videoUrn(id) : undefined;
  },
  resolve() {
    if (!state.currentVideo) {
      return "No video selected";
    }

    const video = services.readVideo(state.currentVideo);
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
    const type = params.type;
    state.currentType = typeof type === "string" ? type : undefined;
  },
  resolve() {
    // needs pruned, fully-derived data
    if (!state.loaded) {
      return "";
    }

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
    // needs pruned, fully-derived data
    if (!state.loaded) {
      return "";
    }

    return {
      attrs: { visible: state.sidebarVisible, services },
    };
  },
});

/* */
export const checklistEntry = pageEntry({
  page: checklistPageComponent,
  resolve() {
    // needs the pre-prune catalogue stats from the final pass
    if (!state.loaded) {
      return "";
    }

    // The life-list defaults to the Irish view when no filter is in the URL.
    const filter = (m.route.param("filter") as string | undefined) ?? "ireland";
    const entries = services.readWildBirdChecklist();
    const covers = services.readThingCovers("bird");
    const regularCount = state.regularBirdSpecies;
    const mammalEntries = services.readWildMammalChecklist();
    const mammalCovers = services.readThingCovers("mammal");

    return {
      attrs: {
        entries,
        covers,
        regularCount,
        nemesisBirds: state.unphotographedNemesis,
        mammalEntries,
        mammalCovers,
        irishMammalCount: state.irishMammalSpecies,
        nemesisMammals: state.unphotographedNemesisMammals,
        services,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

// map data is loaded per navigation in onmatch, not per redraw. If the page
// is visited before the stream completes, resolve backfills once loaded.
let placesForMap: GeocodedPlaceWithCover[] = [];
let tripPolylines: TripPolyline[] = [];
let mapDataRead = false;

function readMapData() {
  placesForMap = services.readGeocodedPlacesWithCovers();
  tripPolylines = services.readTransferPolylines();
  mapDataRead = true;
}

/* */
export const mapEntry = pageEntry({
  page: mapPageComponent,
  onmatch() {
    if (state.loaded) {
      readMapData();
    }
  },
  resolve() {
    // needs pruned, fully-derived data
    if (!state.loaded) {
      return "";
    }

    if (!mapDataRead) {
      readMapData();
    }

    return {
      attrs: {
        visible: state.sidebarVisible,
        places: placesForMap,
        tripPolylines,
      },
    };
  },
});
