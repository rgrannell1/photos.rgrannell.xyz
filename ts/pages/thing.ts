import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../components/thing/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify } from "../commons/arrays.ts";
import type { Photo as PhotoType, Services } from "../types.ts";
import { CountryLink } from "../components/thing/place-links.ts";
import { Video } from "../components/media/video.ts";
import { AlbumCard } from "../components/album/album-card.ts";
import { PhotoGrid } from "../components/media/photo-grid.ts";
import { ThingList } from "../components/thing/thing-list.ts";
import { setify, setOf } from "../commons/sets.ts";
import { BinomialTypes, KnownRelations } from "../constants/data.ts";
import { ListingLink } from "../components/thing/listing-link.ts";
import { ThingUrls } from "../components/thing/thing-urls.ts";
import { HeartRain } from "../components/shell/love.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
};

function ThingDetails() {
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
      const $albums = entriesFor(vnode).map(({ album, countries }) =>
        m(AlbumCard, {
          album,
          countries,
          loading: "lazy",
          trip: undefined,
          child: m("p"),
        })
      );

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

/* */
function slicePhotos(photos: PhotoType[], limit: number): PhotoType[] {
  return photos.slice(0, limit);
}

function PhotoSection() {
  let currentUrn = "";
  let cachedPhotos: ReturnType<Services["readPhotosByThingIds"]> | null = null;

  // reading and parsing every matching photo is expensive on high fan-out
  // pages, so compute once per URN rather than on every batched redraw
  function photosFor(vnode: m.Vnode<ThingPageAttrs>) {
    if (vnode.attrs.urn !== currentUrn || cachedPhotos === null) {
      currentUrn = vnode.attrs.urn;
      const urns = setOf<string>("id", vnode.attrs.things);
      cachedPhotos = vnode.attrs.services.readPhotosByThingIds(urns);
    }
    return cachedPhotos;
  }

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const photos = photosFor(vnode);

      if (photos.length === 0) {
        return null;
      }

      return m("div", [
        m("h3", "Photos"),
        m(PhotoGrid, {
          total: photos.length,
          getPhotos: slicePhotos.bind(null, photos),
          resetKey: vnode.attrs.urn,
        }),
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
          m(ThingDetails, { urn, things, services, visible }),
          m(PhotoSection, { urn, things, services, visible }),
          m(VideoSection, { urn, things, services, visible }),
          m(AlbumSection, { urn, things, services, visible }),
        ]),
      ]);
    },
  };
}
