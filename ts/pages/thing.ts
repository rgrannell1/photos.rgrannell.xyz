import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../components/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify } from "../commons/arrays.ts";
import type { Services } from "../types.ts";
import { CountryLink } from "../components/place-links.ts";
import { Photo } from "../components/photo.ts";
import { Video } from "../components/video.ts";
import { encodeBitmapDataURL } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { block, broadcast, isModifiedClick } from "../commons/events.ts";
import { PlacesList } from "../components/places-list.ts";
import { setify, setOf } from "../commons/sets.ts";
import { BinomialTypes, KnownRelations } from "../constants.ts";
import { ListingLink } from "../components/listing-link.ts";
import { FeaturesList } from "../components/features-list.ts";
import { UnescoList } from "../components/unesco-list.ts";
import { loadingMode } from "../services/photos.ts";
import { ThingUrls } from "../components/thing-urls.ts";
import { readCountries } from "../services/readers.ts";
import { HeartRain } from "../components/love.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
};

function _ThingPlaces() {
  return {
    view() {
    },
  };
}

function _ThingTypeLink() {
  return {
    view() {
    },
  };
}

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
        metadata["Located In"] = m(PlacesList, { services, urns: locatedIn });
      }

      if (things.length !== 1) {
        return;
      }

      const [thing] = things;
      // The non-wildcard case

      if (thing.features) {
        metadata["Place Type"] = m(FeaturesList, {
          urns: setify(thing.features),
          services,
        });
      }

      if (thing.contains) {
        metadata["Contains"] = m(PlacesList, {
          services,
          urns: setify(thing.contains),
        });
      }

      if (thing.placesWithFeature) {
        metadata["Places"] = m(PlacesList, {
          services,
          urns: setify(thing.placesWithFeature),
        });
      }

      if (thing.unescoId) {
        metadata["UNESCO"] = m(UnescoList, {
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

// hashbang route to an album's page, used as the anchor href so albums can be
// opened in a new tab
function albumRoute(id: string): string {
  const parsed = asUrn(id);
  return `#!/album/${parsed.id}`;
}

function onAlbumClick(id: string, title: string, event: Event) {
  // let modified/middle clicks fall through to the browser so the album route
  // opens in a new tab
  if (isModifiedClick(event as MouseEvent)) {
    return;
  }

  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
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
        // duplicated model. move to render(model) code
        const $countryLinks = countries.map((country) => {
          return m(CountryLink, {
            country,
            key: `album-country-${album.id}-${country.id}`,
            mode: "flag",
          });
        });

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
  let rendered = PHOTO_BATCH_SIZE;
  let batchScheduled = false;
  let currentUrn = "";
  let cachedPhotos: ReturnType<Services["readPhotosByThingIds"]> | null = null;

  // reading and parsing every matching photo is expensive on high fan-out
  // pages, so compute once per URN rather than on every batched redraw
  function photosFor(vnode: m.Vnode<ThingPageAttrs>) {
    if (vnode.attrs.urn !== currentUrn || cachedPhotos === null) {
      currentUrn = vnode.attrs.urn;
      rendered = PHOTO_BATCH_SIZE;
      batchScheduled = false;
      const urns = setOf<string>("id", vnode.attrs.things);
      cachedPhotos = vnode.attrs.services.readPhotosByThingIds(urns);
    }
    return cachedPhotos;
  }

  function scheduleBatch(total: number) {
    if (rendered >= total || batchScheduled) return;
    batchScheduled = true;
    setTimeout(() => {
      rendered = Math.min(rendered + PHOTO_BATCH_SIZE, total);
      batchScheduled = false;
      m.redraw();
    }, 1);
  }

  return {
    oncreate(vnode: m.VnodeDOM<ThingPageAttrs>) {
      scheduleBatch(photosFor(vnode).length);
    },
    onupdate(vnode: m.VnodeDOM<ThingPageAttrs>) {
      scheduleBatch(photosFor(vnode).length);
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
          photos.slice(0, rendered).map((photo, idx) =>
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
