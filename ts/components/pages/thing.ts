import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../thing/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify } from "../../commons/arrays.ts";
import type { Photo as PhotoType, Services } from "../../types.ts";
import { CountryLink } from "../thing/place-links.ts";
import { Video } from "../media/video.ts";
import { AlbumCard } from "../album/album-card.ts";
import { PhotoGrid } from "../media/photo-grid.ts";
import { ThingList } from "../thing/thing-list.ts";
import { setify, setOf } from "../../commons/sets.ts";
import { BinomialTypes, KnownRelations } from "../../constants/data.ts";
import { ListingLink } from "../thing/listing-link.ts";
import { ThingUrls } from "../thing/thing-urls.ts";
import { HeartRain } from "../shell/love.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
};

/*
 * Memoise a read keyed by the page URN. Reads are pure over loaded data, so
 * recompute only when the URN changes, not on every batched redraw.
 */
function cachedByUrn<Value>(
  compute: (things: TripleObject[], services: Services) => Value,
) {
  let lastUrn: string | null = null;
  let value: Value | undefined;

  return (attrs: ThingPageAttrs): Value => {
    if (attrs.urn !== lastUrn) {
      lastUrn = attrs.urn;
      value = compute(attrs.things, attrs.services);
    }
    return value as Value;
  };
}

function readSeenIn(things: TripleObject[], services: Services) {
  return services.readSeenInCountries(setOf<string>("id", things));
}

function readAlbumEntries(
  things: TripleObject[],
  services: Services,
): AlbumEntry[] {
  const urns = setOf<string>("id", things);
  return services.readAlbumsByThingIds(urns).map((album) => ({
    album,
    countries: services.readCountries(setify(album.country)),
  }));
}

function readThingVideos(things: TripleObject[], services: Services) {
  return services.readVideosByThingIds(setOf<string>("id", things));
}

function readThingPhotos(things: TripleObject[], services: Services) {
  return services.readPhotosByThingIds(setOf<string>("id", things));
}

function ThingDetails() {
  const seenInFor = cachedByUrn(readSeenIn);

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

      if (things.length === 1) {
        addSingleThingMetadata(metadata, vnode.attrs);
      }

      if (BinomialTypes.has(asUrn(urn).type)) {
        const seenIn = seenInFor(vnode.attrs);

        if (seenIn.length > 0) {
          metadata["Seen In"] = m(".seen-in-list", seenIn.map((country) =>
            m(CountryLink, { country, mode: "name", key: `seen-in-${country.id}` })
          ));
        }
      }

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

/*
 * Metadata rows that only apply when the page shows a single thing,
 * not a wildcard listing.
 */
function addSingleThingMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
) {
  const { things, services } = attrs;
  const [thing] = things;

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
}

type AlbumEntry = {
  album: ReturnType<Services["readAlbumsByThingIds"]>[number];
  countries: ReturnType<Services["readCountries"]>;
};

function AlbumSection() {
  const entriesFor = cachedByUrn(readAlbumEntries);

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const $albums = entriesFor(vnode.attrs).map(({ album, countries }) =>
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
  const videosFor = cachedByUrn(readThingVideos);

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const videos = videosFor(vnode.attrs);

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
  const photosFor = cachedByUrn(readThingPhotos);

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const photos = photosFor(vnode.attrs);

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
