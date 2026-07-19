/*
 * The route table and shared page shell. Each route is a PageEntry: an
 * optional `onmatch` hook for per-navigation work (param reads, per-visit
 * loads) and a `resolve` function building the page's attrs on each redraw.
 * One RouteResolver renders every page inside the same header/sidebar shell —
 * Mithril's documented pattern for wrapping a layout. Page components stay
 * module-level singletons, created once, so mount semantics are unchanged.
 */

import m from "mithril";
import { Header } from "./components/shell/header.ts";
import { loadState } from "./state.ts";
import { Sidebar } from "./components/shell/sidebar.ts";
import { AlbumsPage } from "./pages/albums.ts";
import { AboutPage } from "./pages/about.ts";
import { VideosPage } from "./pages/videos.ts";
import { listen } from "./commons/events.ts";
import { setify } from "./commons/sets.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { albumUrn, countryUrn, photoUrn, videoUrn } from "./models/urn.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { AlbumPage } from "./pages/album.ts";
import { PhotosPage } from "./pages/photos.ts";
import { PhotoPage } from "./pages/photo.ts";
import { VideoPage } from "./pages/video.ts";
import { ListingPage } from "./pages/listing.ts";
import { ListingsPage } from "./pages/listings.ts";
import { ChecklistPage } from "./pages/checklist.ts";
import type { Album } from "./types.ts";
import { ThingPage } from "./pages/thing.ts";
import { MapPage } from "./pages/map.ts";
import type { GeocodedPlaceWithCover } from "./services/places.ts";
import type { TripPolyline } from "./services/albums.ts";

const state = await loadState();
const services = state.services;

const headerComponent = Header();
const sidebarComponent = Sidebar();
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

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;
  console.info(`navigating to route: ${route}`);

  state.sidebarVisible = false;
  m.route.set(route);
});

listen("click_burger_menu", () => {
  state.sidebarVisible = !state.sidebarVisible;
});

/*
 * A resolved page render: the page's attrs, plus an optional extra class on
 * the shell root (e.g the album-banner layout).
 */
type ResolvedPage<PageAttrs> = {
  attrs: PageAttrs;
  appClass?: string | undefined;
};

type PageEntry<PageAttrs> = {
  page: m.Component<PageAttrs>;
  // runs once per navigation: read params, do per-visit loads
  onmatch?: (params: m.Params) => void;
  // builds the page attrs each redraw; a string is an error rendered bare
  resolve: () => ResolvedPage<NoInfer<PageAttrs>> | string;
};

/*
 * Identity helper: infers the attrs type from the page component, so each
 * entry's resolve() is checked against what its page actually accepts.
 */
function pageEntry<PageAttrs>(entry: PageEntry<PageAttrs>): PageEntry<PageAttrs> {
  return entry;
}

/*
 * Wrap a PageEntry in the shared shell. Using a RouteResolver `render` (not a
 * per-route component) is what lets one layout serve every route without
 * remounting the header and sidebar on navigation.
 */
function routeResolver<PageAttrs>(entry: PageEntry<PageAttrs>): m.RouteResolver {
  return {
    onmatch(params: m.Params) {
      entry.onmatch?.(params);
    },
    render() {
      const resolved = entry.resolve();

      if (typeof resolved === "string") {
        return m("p", resolved);
      }

      return m("div.photos-app", { class: resolved.appClass }, [
        m(headerComponent),
        m("div.app-container", {
          class: state.sidebarVisible ? "sidebar-visible" : undefined,
        }, [
          m(sidebarComponent, { visible: state.sidebarVisible }),
          // The generic attrs satisfy the page's attrs by construction, but
          // m()'s overloads cannot see through the type parameter
          m(entry.page, resolved.attrs as PageAttrs & m.Attributes),
        ]),
      ]);
    },
  };
}

/* */
const albumsEntry = pageEntry({
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
const albumEntry = pageEntry({
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
const aboutEntry = pageEntry({
  page: aboutPageComponent,
  resolve() {
    return {
      appClass: "album-page",
      attrs: { visible: state.sidebarVisible },
    };
  },
});

/* */
const videosEntry = pageEntry({
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
const photosEntry = pageEntry({
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
const thingEntry = pageEntry({
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
const photoEntry = pageEntry({
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
const videoEntry = pageEntry({
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
const listingEntry = pageEntry({
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
const listingsEntry = pageEntry({
  page: listingsPageComponent,
  resolve() {
    return {
      attrs: { visible: state.sidebarVisible, services },
    };
  },
});

/* */
const checklistEntry = pageEntry({
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
const mapEntry = pageEntry({
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

export const routes: Record<string, m.RouteResolver> = {
  "/albums": routeResolver(albumsEntry),
  "/albums/:country": routeResolver(albumsEntry),
  "/about": routeResolver(aboutEntry),
  "/map": routeResolver(mapEntry),
  "/videos": routeResolver(videosEntry),
  "/photos": routeResolver(photosEntry),
  "/album/:id": routeResolver(albumEntry),
  "/thing/:pair": routeResolver(thingEntry),
  "/photo/:id": routeResolver(photoEntry),
  "/video/:id": routeResolver(videoEntry),
  "/listing/:type": routeResolver(listingEntry),
  "/listing/:type/:filter": routeResolver(listingEntry),
  "/listings": routeResolver(listingsEntry),
  "/life-list": routeResolver(checklistEntry),
  "/life-list/:filter": routeResolver(checklistEntry),
};
