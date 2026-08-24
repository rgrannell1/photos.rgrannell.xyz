/*
 * Route entries. Each page component is made once, to preserve mount semantics.
 */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { setify } from "../commons/sets.ts";
import { albumUrn, countryUrn, photoUrn, thingUrn, tripUrn, videoUrn } from "../commons/urn.ts";
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
import { COUNTRY_LISTING_TYPE } from "../constants/display.ts";
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

export const albumEntry = pageEntry({
  page: albumPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No album selected";
    }
    const urn = albumUrn(id);

    const album = services.readAlbum(urn);
    if (!album) {
      return "Album not found";
    }

    const photos = services.readAlbumPhotosByAlbumId(urn);
    const videos = services.readAlbumVideosByAlbumId(urn);

    const tripPreviousAlbums = album.trip
      ? services.readTripAlbums(album.trip)
        .filter((tripAlbum) => tripAlbum.minDate < album.minDate)
        .sort((albumA, albumB) => albumB.minDate - albumA.minDate)
      : [];

    return {
      appClass: album.albumBanner ? "album-page" : undefined,
      attrs: {
        album,
        photos,
        videos,
        services,
        visible: state.sidebarVisible,
        tripPreviousAlbums,
      },
    };
  },
});

export const aboutEntry = pageEntry({
  page: aboutPageComponent,
  resolve() {
    return {
      appClass: "album-page",
      attrs: { visible: state.sidebarVisible },
    };
  },
});

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

// Photo URNs loaded per navigation, not redraw. Re-read until stream completes.
let photoUrns: string[] = [];

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

export const thingEntry = pageEntry({
  page: thingPageComponent,
  resolve() {
    // Requires fully-derived, pruned data.
    if (!state.loaded) {
      return "";
    }

    const pair = m.route.param("pair");
    if (typeof pair !== "string") {
      return "No thing selected";
    }
    const urn = thingUrn(pair);

    let things: TripleObject[] = [];
    const parsed = asUrn(urn);
    if (parsed.id === "*") {
      things = services.readNamedTypeThings(parsed.type);
    } else {
      const thing = services.readThing(urn);
      if (thing) {
        things = [thing];
      }
    }

    return {
      attrs: {
        urn,
        things,
        services,
        visible: state.sidebarVisible,
      },
    };
  },
});

export const photoEntry = pageEntry({
  page: photoPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No photo selected";
    }

    const photo = services.readPhoto(photoUrn(id));
    if (!photo) {
      return "Photo not found";
    }

    return {
      attrs: { photo, services, visible: state.sidebarVisible },
    };
  },
});

export const videoEntry = pageEntry({
  page: videoPageComponent,
  resolve() {
    const id = m.route.param("id");
    if (typeof id !== "string") {
      return "No video selected";
    }

    const video = services.readVideo(videoUrn(id));
    if (!video) {
      return "Video not found";
    }

    return {
      attrs: { video, services, visible: state.sidebarVisible },
    };
  },
});

export const listingEntry = pageEntry({
  page: listingPageComponent,
  resolve() {
    // Requires fully-derived, pruned data.
    if (!state.loaded) {
      return "";
    }

    const type = m.route.param("type");
    if (typeof type !== "string") {
      return "No type selected";
    }

    const filter = m.route.param("filter") as string | undefined;
    const things = type === COUNTRY_LISTING_TYPE
      ? services.readAllCountryThings()
      : services.readNamedTypeThings(type);

    return {
      attrs: {
        type,
        things,
        services,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

export const listingsEntry = pageEntry({
  page: listingsPageComponent,
  resolve() {
    // Requires fully-derived, pruned data.
    if (!state.loaded) {
      return "";
    }

    return {
      attrs: { visible: state.sidebarVisible, services },
    };
  },
});

export const checklistEntry = pageEntry({
  page: checklistPageComponent,
  resolve() {
    // Requires pre-pruned catalogue stats.
    if (!state.loaded) {
      return "";
    }

    const filter = (m.route.param("filter") as string | undefined) ?? "ireland";
    const entries = services.readWildBirdChecklist();
    const covers = services.readThingCovers("bird");
    const regularCount = state.catalogue.regularBirdSpecies;
    const mammalEntries = services.readWildMammalChecklist();
    const mammalCovers = services.readThingCovers("mammal");

    return {
      attrs: {
        entries,
        covers,
        regularCount,
        nemesisBirds: state.catalogue.nemesisBirds,
        mammalEntries,
        mammalCovers,
        irishMammalCount: state.catalogue.irishMammalSpecies,
        nemesisMammals: state.catalogue.nemesisMammals,
        services,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

// Map data loaded per navigation, backfilled on resolve if needed.
let placesForMap: GeocodedPlaceWithCover[] = [];
let tripPolylines: TripPolyline[] = [];
let mapDataRead = false;

function readMapData() {
  placesForMap = services.readGeocodedPlacesWithCovers();
  tripPolylines = services.readTransferPolylines();
  mapDataRead = true;
}

export const mapEntry = pageEntry({
  page: mapPageComponent,
  onmatch() {
    if (state.loaded) {
      readMapData();
    }
  },
  resolve() {
    // Requires fully-derived, pruned data.
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
