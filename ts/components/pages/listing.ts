import m from "mithril";
import { KnownTypes } from "../../constants/data.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { broadcast, navigate } from "../../commons/events.ts";
import type { Photo } from "../../types.ts";
import { PhotoAlbum } from "../album/photo-album.ts";
import { thumbHashDataUrl, loadingMode } from "../../services/photos.ts";
import { one } from "../../commons/arrays.ts";
import { ThingCaption } from "../thing/thing-caption.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../services/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import { FlagIcon } from "../flag.ts";
import type { SubjectStats } from "../../services/stats.ts";
import { readThrough } from "../../commons/cache.ts";
import {
  isNone,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../../commons/maybe.ts";

/*
 * Inline badge for the listing card title. Irish birds get the Ireland flag.
 */
function listingTitleExtra(
  thing: TripleObject,
  listingType: string,
): m.Children {
  const showsIrishFlag = listingType === KnownTypes.BIRD &&
    one(thing.irish) === "true";
  if (showsIrishFlag) {
    return m(FlagIcon, { name: "Ireland" });
  }
  return undefined;
}

type ReadThingCover = (urn: string) => Maybe<Photo>;

function drawThingAlbum(
  coverCache: Map<string, Maybe<Photo>>,
  readThingCover: ReadThingCover,
  listingType: string,
  thing: TripleObject,
  idx: number,
): m.Children[] {
  const id = one(thing.id);

  if (isNone(id)) {
    return [];
  }

  const coverPhoto = readThrough(coverCache, readThingCover, id);
  if (isNone(coverPhoto)) {
    return [];
  }

  const { id: thingId, type } = asUrn(id);

  return [m(PhotoAlbum, {
    key: `thing-${id}`,
    label: withDefault(one(thing.name), thingId),
    imageUrl: coverPhoto.fullImage,
    thumbnailUrl: coverPhoto.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(coverPhoto.mosaicColours),
    loading: loadingMode(idx),
    trip: NONE,
    child: m(ThingCaption, {
      thing,
      titleExtra: listingTitleExtra(thing, listingType),
    }),
    onclick: navigate(`/thing/${type}:${thingId}`),
  })];
}

type AlbumsListAttrs = {
  readThingCover: ReadThingCover;
  things: TripleObject[];
  listingType: string;
};

function resetListingBatchOnTypeChange(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
  old: m.VnodeDOM<AlbumsListAttrs>,
): void {
  if (vnode.attrs.listingType !== old.attrs.listingType) {
    batch.reset();
  }
}

function scheduleListingBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.things.length);
}

function viewAlbumsList(
  batch: BatchRenderer,
  coverCache: Map<string, Maybe<Photo>>,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const { readThingCover, things, listingType } = vnode.attrs;
  return m(
    "section.album-container",
    { "data-testid": "listing-cards" },
    things.slice(0, batch.count())
      .flatMap(drawThingAlbum.bind(null, coverCache, readThingCover, listingType)),
  );
}

/*
 * Render the albums in batches, so the browser can paint between each one.
 */
function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);
  const coverCache = new Map<string, Maybe<Photo>>();

  return {
    onbeforeupdate: resetListingBatchOnTypeChange.bind(null, batch),
    oncreate: scheduleListingBatch.bind(null, batch),
    onupdate: scheduleListingBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch, coverCache),
  };
}

type BirdListingDetailsAttrs = {
  stats: SubjectStats;
  filter: Maybe<string>;
  onToggleIreland: () => void;
};

function viewBirdListingDetails(
  vnode: m.Vnode<BirdListingDetailsAttrs>,
): m.Children {
  const { stats, filter, onToggleIreland } = vnode.attrs;
  const { wildSpecies, totalSpecies, irishWildSpecies } = stats;
  const irelandActive = filter === "ireland";

  return m(
    "p.listing-details",
    { "data-testid": "listing-details" },
    m("span.listing-filter-flag", {
      title: "Filter to Irish species",
      class: irelandActive ? "listing-filter-flag--selected" : undefined,
      onclick: onToggleIreland,
    }, m(FlagIcon, { name: "Ireland" })),
    ` ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
  );
}

/*
 * Bird species counts. Clicking the Ireland flag filters to Irish species.
 */
function BirdListingDetails() {
  return { view: viewBirdListingDetails };
}

function viewMammalListingDetails(
  vnode: m.Vnode<{ stats: SubjectStats }>,
): m.Children {
  const { wildSpecies, totalSpecies, irishWildSpecies } = vnode.attrs.stats;

  return m(
    "p.listing-details",
    { "data-testid": "listing-details" },
    m(FlagIcon, { name: "Ireland" }),
    ` ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
  );
}

/*
 * Mammal species counts, by wild, total, and Irish wild.
 */
function MammalListingDetails() {
  return { view: viewMammalListingDetails };
}

type ListingDetailsAttrs = {
  type: string;
  stats: Maybe<SubjectStats>;
  filter: Maybe<string>;
  onToggleIreland: () => void;
};

function viewListingDetails(
  vnode: m.Vnode<ListingDetailsAttrs>,
): m.Children {
  const { type, stats, filter, onToggleIreland } = vnode.attrs;
  const showsBirdDetails = type === KnownTypes.BIRD && isSome(stats);
  const showsMammalDetails = type === KnownTypes.MAMMAL && isSome(stats);

  if (showsBirdDetails) {
    return m(BirdListingDetails, { stats, filter, onToggleIreland });
  }

  if (showsMammalDetails) {
    return m(MammalListingDetails, { stats });
  }

  return null;
}

function ListingDetails() {
  return { view: viewListingDetails };
}

function viewListingTitle(
  vnode: m.Vnode<{ type: string; label: string }>,
): m.Children {
  const { type, label } = vnode.attrs;
  return m(
    "h1.albums-header",
    { "data-testid": "listing-title", "data-listing-type": type },
    label,
  );
}

/*
 * The listing's plural label as the page title, e.g "Countries"
 */
function ListingTitle() {
  return { view: viewListingTitle };
}

function viewListingThingsButton(vnode: m.Vnode<{ type: string }>): m.Children {
  const { type } = vnode.attrs;
  return m("a", {
    href: `#/thing/${type}:*`,
    onclick: navigate(`/thing/${type}:*`),
    "data-testid": "listing-things-link",
  }, `See all ${type} photos`);
}

/*
 * Link to the things page for this type (wildcard)
 */
function ListingThingsButton() {
  return { view: viewListingThingsButton };
}

export type ListingPageAttrs = {
  type: string;
  things: TripleObject[];
  label: string;
  isListable: boolean;
  stats: Maybe<SubjectStats>;
  readThingCover: ReadThingCover;
  visible: boolean;
  filter: Maybe<string>;
};

function toggleIrelandFilter(type: string, filter: Maybe<string>): void {
  const isActive = filter === "ireland";
  broadcast("navigate", {
    route: isActive ? `/listing/${type}` : `/listing/${type}/ireland`,
  });
}

function isIrishThing(thing: TripleObject): boolean {
  return one(thing.irish) === "true";
}

function viewListingPage(vnode: m.Vnode<ListingPageAttrs>): m.Children {
  const attrs = vnode.attrs;
  const { type, things, label, isListable, stats, visible, filter } = attrs;

  const onToggleIreland = toggleIrelandFilter.bind(null, type, filter);

  const showsIrishBirds = type === KnownTypes.BIRD && filter === "ireland";
  const displayThings = showsIrishBirds
    ? things.filter(isIrishThing)
    : things;

  const $md = [
    m(ListingTitle, { type, label }),
    m(ListingDetails, { type, stats, filter, onToggleIreland }),
  ];

  // the published listable flag gates the "see all <type> photos" link
  if (isListable) {
    $md.push(
      m("section.album-metadata", [
        m(ListingThingsButton, { type }),
      ]),
    );
  }

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m("section.album-metadata", $md),
    m(AlbumsList, {
      readThingCover: attrs.readThingCover,
      things: displayThings,
      listingType: type,
    }),
  ]);
}

/*
 * Each member of a category, e.g countries.
 */
export function ListingPage() {
  return { view: viewListingPage };
}
