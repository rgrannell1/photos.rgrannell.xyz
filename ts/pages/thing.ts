import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../components/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify } from "../commons/arrays.ts";
import type { Services } from "../types.ts";
import { CountryLink, countryFlagLinks } from "../components/place-links.ts";
import { Photo } from "../components/photo.ts";
import { Video } from "../components/video.ts";
import { encodeBitmapDataURL } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { albumRoute, onAlbumClick } from "../commons/album-nav.ts";
import { ThingList } from "../components/thing-list.ts";
import { setify, setOf } from "../commons/sets.ts";
import { BinomialTypes, KnownRelations } from "../constants.ts";
import { ListingLink } from "../components/listing-link.ts";
import { loadingMode } from "../services/photos.ts";
import { ThingUrls } from "../components/thing-urls.ts";
import { HeartRain } from "../components/love.ts";
import { createBatchRenderer } from "../components/batch-render.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
};

function ThingMetadata() {
  let seenInUrn: string | null = null;
  let seenInCache: ReturnType<Services["readSeenInCountries"]> = [];

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const metadata: Record<string, m.Children> = {};
      const { urn, things, services } = vnode.attrs;

      metadata.Classification = m(ListingLink, { urn });

      const locatedIn = setOf<string>(KnownRelations.IN, things);

      if (locatedIn.size > 0) {
        metadata["Located In"] = m(ThingList, {
          kind: "place",
          services,
          urns: locatedIn,
        });
      }

      if (things.length !== 1) {
        return;
      }

      const [thing] = things;
      // The non-wildcard case

      if (thing.features) {
        metadata["Place Type"] = m(ThingList, {
          kind: "feature",
          urns: setify(thing.features),
          services,
        });
      }

      if (thing.contains) {
        metadata["Contains"] = m(ThingList, {
          kind: "place",
          services,
          urns: setify(thing.contains),
        });
      }

      if (thing.placesWithFeature) {
        metadata["Places"] = m(ThingList, {
          kind: "place",
          services,
          urns: setify(thing.placesWithFeature),
        });
      }

      if (thing.unescoId) {
        metadata["UNESCO"] = m(ThingList, {
          kind: "unesco",
          urns: new Set(arrayify(thing.unescoId)),
          services,
        });
      }

      if (BinomialTypes.has(asUrn(urn).type)) {
        // pure over loaded data; compute once per URN, not per redraw
        if (urn !== seenInUrn) {
          seenInUrn = urn;
          seenInCache = services.readSeenInCountries(setOf<string>("id", things));
        }
        const seenIn = seenInCache;

        if (seenIn.length > 0) {
          metadata["Seen In"] = m(".seen-in-list", seenIn.map((country) =>
            m(CountryLink, { country, mode: "name", key: `seen-in-${country.id}` })
          ));
        }
      }

      // TODO add first photographed

      // convert the metadaTa to a table

      const $rows = Object.entries(metadata).map(([key, value]) => {
        return m("tr", [
          m("th.exif-heading", key),
          m("td", value),
        ]);
      });

      return m("div", [
        m("h3", "Details"),
        m("table.metadata-table", $rows),
      ]);
    },
  };
}

type AlbumEntry = {
  album: ReturnType<Services["readAlbumsByThingIds"]>[number];
  countries: ReturnType<Services["readCountries"]>;
};

function AlbumSection() {
  let cachedUrn: string | null = null;
  let cachedEntries: AlbumEntry[] = [];

  // album and country reads are pure over loaded data; compute once per
  // URN rather than on every redraw of the batched photo grid
  function entriesFor(vnode: m.Vnode<ThingPageAttrs>): AlbumEntry[] {
    const { things, services, urn } = vnode.attrs;

    if (urn !== cachedUrn) {
      cachedUrn = urn;
      const urns = setOf<string>("id", things);
      cachedEntries = services.readAlbumsByThingIds(new Set(urns))
        .map((album) => ({
          album,
          countries: services.readCountries(setify(album.country)),
        }));
    }
    return cachedEntries;
  }

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const $albums = entriesFor(vnode).map(({ album, countries }) => {
        const $countryLinks = countryFlagLinks(album.id, countries);

        const $md = m(PhotoAlbumMetadata, {
          title: album.name,
          minDate: album.minDate,
          maxDate: album.maxDate,
          count: album.photosCount,
          countryLinks: $countryLinks,
          dateRange: album.dateRange,
          shortDateRange: album.shortDateRange,
        });

        const $album = m(PhotoAlbum, {
          href: albumRoute(album.id),
          thumbnailUrl: album.thumbnailUrl,
          thumbnailDataUrl: encodeBitmapDataURL(album.mosaic),
          loading: "lazy",
          minDate: album.minDate,
          onclick: onAlbumClick.bind(null, album.id, album.name),
          trip: undefined,
          child: m("p"),
        });

        return m(
          "div",
          $album,
          $md,
        );
      });

      if ($albums.length === 0) {
        return null;
      }

      return m("div", [
        m("h3", "Albums"),
        m(
          "section.album-container",
          $albums,
        ),
      ]);
    },
  };
}

function VideoSection() {
  let cachedUrn: string | null = null;
  let cachedVideos: ReturnType<Services["readVideosByThingIds"]> = [];

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { things, services, urn } = vnode.attrs;

      if (urn !== cachedUrn) {
        cachedUrn = urn;
        const urns = setOf<string>("id", things);
        cachedVideos = services.readVideosByThingIds(new Set(urns));
      }
      const videos = cachedVideos;

      if (videos.length === 0) {
        return null;
      }

      return m("div", [
        m("h3", "Videos"),
        m(
          "section.photo-container",
          videos.map((video) =>
            m(Video, {
              key: `video-${video.id}`,
              video,
              preload: "none",
              interactive: true,
            })
          ),
        ),
      ]);
    },
  };
}

const PHOTO_BATCH_SIZE = 10;

function PhotoSection() {
  const batch = createBatchRenderer(PHOTO_BATCH_SIZE);
  let currentUrn = "";
  let cachedPhotos: ReturnType<Services["readPhotosByThingIds"]> | null = null;

  // reading and parsing every matching photo is expensive on high fan-out
  // pages, so compute once per URN rather than on every batched redraw
  function photosFor(vnode: m.Vnode<ThingPageAttrs>) {
    if (vnode.attrs.urn !== currentUrn || cachedPhotos === null) {
      currentUrn = vnode.attrs.urn;
      batch.reset();
      const urns = setOf<string>("id", vnode.attrs.things);
      cachedPhotos = vnode.attrs.services.readPhotosByThingIds(urns);
    }
    return cachedPhotos;
  }

  return {
    oncreate(vnode: m.VnodeDOM<ThingPageAttrs>) {
      batch.schedule(photosFor(vnode).length);
    },
    onupdate(vnode: m.VnodeDOM<ThingPageAttrs>) {
      batch.schedule(photosFor(vnode).length);
    },
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const photos = photosFor(vnode);

      if (photos.length === 0) {
        return null;
      }

      return m("div", [
        m("h3", "Photos"),
        m(
          "section.photo-container",
          photos.slice(0, batch.count()).map((photo, idx) =>
            m(Photo, {
              key: `photo-${photo.id}`,
              photo,
              loading: loadingMode(idx),
              interactive: true,
            })
          ),
        ),
      ]);
    },
  };
}

function isOlm(urn: string): boolean {
  const parsed = asUrn(urn);
  return parsed.type === "amphibian" && parsed.id === "proteus-anguinus";
}

export function ThingPage() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things, services, visible } = vnode.attrs;

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        isOlm(urn) ? m(HeartRain) : null,
        m("section.thing-page", [
          m(ThingTitle, { urn, things }),
          m(ThingSubtitle, { urn }),
          m("br"),
          m(ThingUrls, { things }),
          m(ThingMetadata, { urn, things, services, visible }),
          m(PhotoSection, { urn, things, services, visible }),
          m(VideoSection, { urn, things, services, visible }),
          m(AlbumSection, { urn, things, services, visible }),
        ]),
      ]);
    },
  };
}
