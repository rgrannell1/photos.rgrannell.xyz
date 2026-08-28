import m from "mithril";
import { ThingSubtitle } from "../thing/thing-subtitle.ts";
import { ThingTitle } from "../thing/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import type {
  Album,
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../types/domain.ts";
import { CountryLink } from "../thing/country-link.ts";
import { Video } from "../media/video.ts";
import { AlbumCard } from "../album/album-card.ts";
import { PhotoGrid } from "../media/photo-grid.ts";
import {
  ThingList,
  type ReadThingList,
  type ThingListKind,
} from "../thing/thing-list.ts";
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
import { loadingMode, thumbHashDataUrl } from "../../services/rendering/photos.ts";
import { navigate } from "../../services/browser/events.ts";
import { ShareButton } from "../share-button.ts";
import { sharePhotoUrl } from "../../services/browser/window.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import {
  isNone,
  isSome,
  type Maybe,
  NONE,
  some,
  withDefault,
} from "../../commons/maybe.ts";

export type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  listingTitle: Maybe<string>;
  titleEmoji: string;
  isBinomial: boolean;
  readSeenInCountries: (urns: Set<string>) => Country[];
  readAlbumEntries: (urns: Set<string>) => AlbumEntry[];
  readVideos: (urns: Set<string>) => VideoType[];
  readPhotos: (urns: Set<string>) => PhotoType[];
  readThingList: ReadThingList;
  readThingEmoji: ReadThingEmoji;
  readTaxonMembers: (urn: string) => TripleObject[];
  readThingCover: (urn: string) => Maybe<PhotoType>;
  visible: boolean;
};

type UrnCache<Value extends object> = {
  lastUrn: Maybe<string>;
  value: Maybe<Value>;
  compute: (attrs: ThingPageAttrs) => Value;
};

type CachedReader<Value extends object> = (attrs: ThingPageAttrs) => Value;

function readCached<Value extends object>(
  cache: UrnCache<Value>,
  attrs: ThingPageAttrs,
): Value {
  const cachedValue = cache.value;
  const hasCachedValue = attrs.urn === cache.lastUrn && isSome(cachedValue);
  if (hasCachedValue) {
    return cachedValue;
  }

  cache.lastUrn = attrs.urn;
  const value = cache.compute(attrs);
  cache.value = some(value);
  return value;
}

/*
 * Memoise a read against the page URN. Reads are pure over loaded data, so
 * they must not run on every batched redraw.
 */
function cachedByUrn<Value extends object>(
  compute: (attrs: ThingPageAttrs) => Value,
): CachedReader<Value> {
  const cache: UrnCache<Value> = {
    lastUrn: NONE,
    value: NONE,
    compute,
  };
  return readCached.bind(null, cache) as CachedReader<Value>;
}

function readSeenIn(attrs: ThingPageAttrs): Country[] {
  return attrs.readSeenInCountries(setOf<string>("id", attrs.things));
}

type SeenInCountry = ReturnType<typeof readSeenIn>[number];

type AlbumEntry = {
  album: Album;
  countries: Country[];
};

function readAlbumEntries(attrs: ThingPageAttrs): AlbumEntry[] {
  return attrs.readAlbumEntries(setOf<string>("id", attrs.things));
}

function readThingVideos(attrs: ThingPageAttrs): VideoType[] {
  return attrs.readVideos(setOf<string>("id", attrs.things));
}

function readThingPhotos(attrs: ThingPageAttrs): PhotoType[] {
  return attrs.readPhotos(setOf<string>("id", attrs.things));
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

function addLocatedInMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  const locatedIn = setOf<string>(KnownRelations.IN, attrs.things);
  if (locatedIn.size === 0) {
    return;
  }
  metadata["Located In"] = m(ThingList, {
    kind: "place",
    readItems: attrs.readThingList,
    readEmoji: attrs.readThingEmoji,
    urns: locatedIn,
  });
}

function addSeenInMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  seenInFor: CachedReader<SeenInCountry[]>,
): void {
  if (!attrs.isBinomial) {
    return;
  }
  const seenIn = seenInFor(attrs);
  if (seenIn.length > 0) {
    metadata["Seen In"] = m(".seen-in-list", seenIn.map(drawSeenInCountry));
  }
}

function viewThingDetails(
  seenInFor: CachedReader<SeenInCountry[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const metadata: Record<string, m.Children> = {};
  const { urn, things } = vnode.attrs;

  metadata.Classification = m(ListingLink, { urn });
  addLocatedInMetadata(metadata, vnode.attrs);
  if (things.length === 1) {
    addSingleThingMetadata(metadata, vnode.attrs);
  }
  addSeenInMetadata(metadata, vnode.attrs, seenInFor);
  const rows = Object.entries(metadata).map(drawMetadataRow);
  if (rows.length === 0) {
    return null;
  }
  return m("div", [
    m("h3", "Details"),
    m("table.metadata-table", rows),
  ]);
}

function ThingDetails() {
  const seenInFor = cachedByUrn(readSeenIn);

  return { view: viewThingDetails.bind(null, seenInFor) };
}

type ThingMetadata = {
  label: string;
  kind: ThingListKind;
  values: string | string[] | undefined;
};

function addThingListMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
  item: ThingMetadata,
): void {
  if (!item.values) {
    return;
  }
  metadata[item.label] = m(ThingList, {
    kind: item.kind,
    urns: setify(item.values),
    readItems: attrs.readThingList,
    readEmoji: attrs.readThingEmoji,
  });
}

/* Metadata rows for a single thing, not a wildcard listing. */
function addSingleThingMetadata(
  metadata: Record<string, m.Children>,
  attrs: ThingPageAttrs,
): void {
  const [thing] = attrs.things;
  const items: ThingMetadata[] = [
    { label: "Place Type", kind: "feature", values: thing.features },
    { label: "Contains", kind: "place", values: thing.contains },
    { label: "Places", kind: "place", values: thing.placesWithFeature },
    { label: "UNESCO", kind: "unesco", values: thing.unescoId },
  ];
  for (const rank of TAXON_RANKS) {
    items.push({ label: rank.label, kind: "taxon", values: thing[rank.relation] });
  }
  for (const item of items) {
    addThingListMetadata(metadata, attrs, item);
  }
}

function drawThingAlbumCard(entry: AlbumEntry): m.Children {
  return m(AlbumCard, {
    album: entry.album,
    countries: entry.countries,
    loading: "lazy",
    trip: NONE,
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

/* Member species of the page's taxon. Empty for non-taxon things. */
function readMemberSpecies(
  attrs: ThingPageAttrs,
): TripleObject[] {
  const [thing] = attrs.things;
  const urn = thing ? one(thing.id) : NONE;
  const isTaxon = isSome(urn) && TAXON_TYPES.has(asUrn(urn).type);

  if (!isTaxon) {
    return [];
  }

  return attrs.readTaxonMembers(urn);
}

function drawMemberCard(
  readThingCover: (urn: string) => Maybe<PhotoType>,
  member: TripleObject,
  idx: number,
): m.Children[] {
  const id = one(member.id);
  if (isNone(id)) {
    return [];
  }

  const cover = readThingCover(id);
  if (isNone(cover)) {
    return [];
  }

  const { type, id: thingId } = asUrn(id);

  return [m(PhotoAlbum, {
    key: `member-${id}`,
    label: withDefault(one(member.name), thingId),
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(cover.mosaicColours),
    loading: loadingMode(idx),
    trip: NONE,
    child: m(ThingCaption, { thing: member }),
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
    .flatMap(drawMemberCard.bind(null, vnode.attrs.readThingCover));

  return m("div", [
    m("h3", "Species"),
    m("section.album-container", $cards),
  ]);
}

function SpeciesSection() {
  const membersFor = cachedByUrn(readMemberSpecies);

  return { view: viewSpeciesSection.bind(null, membersFor) };
}

/* Wildcard listings have no prebaked social card, so they get no share link. */
function drawShareButton(urn: string, things: TripleObject[]): m.Children {
  const { type, id } = asUrn(urn);

  if (id === "*") {
    return null;
  }

  const [thing] = things;
  const name = withDefault(thing ? one(thing.name) : NONE, id);

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
  const { urn, things, listingTitle, isBinomial, visible } = vnode.attrs;
  const sectionAttrs = vnode.attrs;

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    isOlm(urn) ? m(HeartRain) : null,
    m("section.thing-page", [
      m(ThingTitle, {
        urn,
        things,
        listingTitle,
        emoji: vnode.attrs.titleEmoji,
      }),
      m(ThingSubtitle, {
        urn,
        isBinomial,
      }),
      m("br"),
      m(ThingUrls, { things }),
      m(ThingDetails, sectionAttrs),
      drawShareButton(urn, things),
      m(PhotoSection, sectionAttrs),
      m(SpeciesSection, sectionAttrs),
      m(VideoSection, sectionAttrs),
      m(AlbumSection, sectionAttrs),
    ]),
  ]);
}

export function ThingPage() {
  return { view: viewThingPage };
}
