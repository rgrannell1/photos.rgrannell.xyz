import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../thing/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify, one } from "../../commons/arrays.ts";
import type {
  Photo as PhotoType,
  Services,
  Video as VideoType,
} from "../../types.ts";
import { CountryLink } from "../thing/place-links.ts";
import { Video } from "../media/video.ts";
import { AlbumCard } from "../album/album-card.ts";
import { PhotoGrid } from "../media/photo-grid.ts";
import { ThingList } from "../thing/thing-list.ts";
import { setify, setOf } from "../../commons/sets.ts";
import {
  KnownRelations,
  TAXON_RANKS,
  TAXON_TYPES,
} from "../../constants/data.ts";
import { ListingLink } from "../thing/listing-link.ts";
import { ThingUrls } from "../thing/thing-urls.ts";
import { HeartRain } from "../shell/love.ts";
import { PhotoAlbum } from "../album/photo-album.ts";
import { ThingCaption } from "../thing/thing-caption.ts";
import { loadingMode, thumbHashDataUrl } from "../../services/photos.ts";
import { navigate } from "../../commons/events.ts";
import { ShareButton } from "../share-button.ts";
import { sharePhotoUrl } from "../../services/window.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
};

type UrnCache<Value> = {
  // URN the cached value was computed for
  lastUrn: string | null;
  value: Value | undefined;
  compute: (things: TripleObject[], services: Services) => Value;
};

type CachedReader<Value> = (attrs: ThingPageAttrs) => Value;

function readCached<Value>(
  cache: UrnCache<Value>,
  attrs: ThingPageAttrs,
): Value {
  if (attrs.urn !== cache.lastUrn) {
    cache.lastUrn = attrs.urn;
    cache.value = cache.compute(attrs.things, attrs.services);
  }
  return cache.value as Value;
}

/*
 * Memoise a read keyed by the page URN. Reads are pure over loaded data, so
 * recompute only when the URN changes, not on every batched redraw.
 */
function cachedByUrn<Value>(
  compute: (things: TripleObject[], services: Services) => Value,
): CachedReader<Value> {
  const cache: UrnCache<Value> = {
    lastUrn: null,
    value: undefined,
    compute,
  };
  return readCached.bind(null, cache) as CachedReader<Value>;
}

function readSeenIn(things: TripleObject[], services: Services) {
  return services.readSeenInCountries(setOf<string>("id", things));
}

type SeenInCountry = ReturnType<typeof readSeenIn>[number];

type AlbumEntry = {
  album: ReturnType<Services["readAlbumsByThingIds"]>[number];
  countries: ReturnType<Services["readCountries"]>;
};

function toAlbumEntry(
  services: Services,
  album: ReturnType<Services["readAlbumsByThingIds"]>[number],
): AlbumEntry {
  return {
    album,
    countries: services.readCountries(setify(album.country)),
  };
}

function readAlbumEntries(
  things: TripleObject[],
  services: Services,
): AlbumEntry[] {
  const urns = setOf<string>("id", things);
  return services.readAlbumsByThingIds(urns).map(toAlbumEntry.bind(null, services));
}

function readThingVideos(things: TripleObject[], services: Services) {
  return services.readVideosByThingIds(setOf<string>("id", things));
}

function readThingPhotos(things: TripleObject[], services: Services) {
  return services.readPhotosByThingIds(setOf<string>("id", things));
}

function drawSeenInCountry(country: SeenInCountry): m.Children {
  return m(CountryLink, {
    country,
    mode: "name",
    key: `seen-in-${country.id}`,
  });
}

function drawMetadataRow([key, value]: [string, m.Children]): m.Children {
  return m("tr", [
    m("th.exif-heading", key),
    m("td", value),
  ]);
}

function viewThingDetails(
  seenInFor: CachedReader<SeenInCountry[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
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

  if (services.isBinomialType(asUrn(urn).type)) {
    const seenIn = seenInFor(vnode.attrs);

    if (seenIn.length > 0) {
      metadata["Seen In"] = m(".seen-in-list", seenIn.map(drawSeenInCountry));
    }
  }

  const $rows = Object.entries(metadata).map(drawMetadataRow);

  if ($rows.length === 0) {
    return null;
  }

  return m("div", [
    m("h3", "Details"),
    m("table.metadata-table", $rows),
  ]);
}

function ThingDetails() {
  const seenInFor = cachedByUrn(readSeenIn);

  return { view: viewThingDetails.bind(null, seenInFor) };
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

  for (const rank of TAXON_RANKS) {
    const taxa = thing[rank.relation];

    if (taxa) {
      metadata[rank.label] = m(ThingList, {
        kind: "taxon",
        urns: setify(taxa) as Set<string>,
        services,
      });
    }
  }
}

function drawThingAlbumCard(entry: AlbumEntry): m.Children {
  return m(AlbumCard, {
    album: entry.album,
    countries: entry.countries,
    loading: "lazy",
    trip: undefined,
    child: m("p"),
  });
}

function viewAlbumSection(
  entriesFor: CachedReader<AlbumEntry[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const $albums = entriesFor(vnode.attrs).map(drawThingAlbumCard);

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
}

function AlbumSection() {
  const entriesFor = cachedByUrn(readAlbumEntries);

  return { view: viewAlbumSection.bind(null, entriesFor) };
}

function drawThingVideo(video: VideoType): m.Children {
  return m(Video, {
    key: `video-${video.id}`,
    video,
    preload: "none",
    interactive: true,
  });
}

function viewVideoSection(
  videosFor: CachedReader<VideoType[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const videos = videosFor(vnode.attrs);

  if (videos.length === 0) {
    return null;
  }

  return m("div", [
    m("h3", "Videos"),
    m(
      "section.photo-container",
      videos.map(drawThingVideo),
    ),
  ]);
}

function VideoSection() {
  const videosFor = cachedByUrn(readThingVideos);

  return { view: viewVideoSection.bind(null, videosFor) };
}

function slicePhotos(photos: PhotoType[], limit: number): PhotoType[] {
  return photos.slice(0, limit);
}

function viewPhotoSection(
  photosFor: CachedReader<PhotoType[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
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
}

function PhotoSection() {
  const photosFor = cachedByUrn(readThingPhotos);

  return { view: viewPhotoSection.bind(null, photosFor) };
}

/*
 * Member species of the page's taxon; empty for non-taxon things.
 */
function readMemberSpecies(
  things: TripleObject[],
  services: Services,
): TripleObject[] {
  const [thing] = things;
  const urn = thing ? (one(thing.id) as string | undefined) : undefined;

  if (!urn || !TAXON_TYPES.has(asUrn(urn).type)) {
    return [];
  }

  return services.readTaxonMembers(urn);
}

function drawMemberCard(
  services: Services,
  member: TripleObject,
  idx: number,
): m.Children[] {
  const id = one(member.id) as string | undefined;
  if (!id) {
    return [];
  }

  const cover = services.readThingCover(id);
  if (!cover) {
    return [];
  }

  const { type, id: thingId } = asUrn(id);

  return [m(PhotoAlbum, {
    key: `member-${id}`,
    label: (one(member.name) ?? thingId) as string,
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(cover.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: m(ThingCaption, { thing: member, titleExtra: undefined }),
    onclick: navigate(`/thing/${type}:${thingId}`),
  })];
}

function viewSpeciesSection(
  membersFor: CachedReader<TripleObject[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const members = membersFor(vnode.attrs);

  if (members.length === 0) {
    return null;
  }

  const $cards = members
    .flatMap(drawMemberCard.bind(null, vnode.attrs.services));

  return m("div", [
    m("h3", "Species"),
    m("section.album-container", $cards),
  ]);
}

/*
 * The species folder grid on taxon pages: one cover card per member species.
 */
function SpeciesSection() {
  const membersFor = cachedByUrn(readMemberSpecies);

  return { view: viewSpeciesSection.bind(null, membersFor) };
}

/*
 * The share control for a concrete thing page. Wildcard listings have no
 * prebaked social card, so they get no share link.
 */
function drawShareButton(urn: string, things: TripleObject[]): m.Children {
  const { type, id } = asUrn(urn);

  if (id === "*") {
    return null;
  }

  const [thing] = things;
  const name = ((thing ? one(thing.name) : undefined) ?? id) as string;

  return m(ShareButton, {
    url: sharePhotoUrl(`thing/${type}:${id}`),
    name,
  });
}

function isOlm(urn: string): boolean {
  const parsed = asUrn(urn);
  return parsed.type === "amphibian" && parsed.id === "proteus-anguinus";
}

function viewThingPage(vnode: m.Vnode<ThingPageAttrs>): m.Children {
  const { urn, things, services, visible } = vnode.attrs;

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    isOlm(urn) ? m(HeartRain) : null,
    m("section.thing-page", [
      m(ThingTitle, { urn, things }),
      m(ThingSubtitle, {
        urn,
        isBinomial: services.isBinomialType(asUrn(urn).type),
      }),
      m("br"),
      m(ThingUrls, { things }),
      m(ThingDetails, { urn, things, services, visible }),
      drawShareButton(urn, things),
      m(PhotoSection, { urn, things, services, visible }),
      m(SpeciesSection, { urn, things, services, visible }),
      m(VideoSection, { urn, things, services, visible }),
      m(AlbumSection, { urn, things, services, visible }),
    ]),
  ]);
}

export function ThingPage() {
  return { view: viewThingPage };
}
