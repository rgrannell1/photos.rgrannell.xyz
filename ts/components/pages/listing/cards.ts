/* Support listing operations. */

import m from "mithril";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { LIFE_LIST_FILTERS } from "../../../constants/display.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { navigate } from "../../../services/browser/events.ts";
import type { Photo } from "../../../types/domain.ts";
import { PhotoAlbum } from "../../album/photo-album.ts";
import {
  loadingMode,
  thumbHashDataUrl,
} from "../../../services/rendering/year-scroll/photos.ts";
import { one } from "../../../commons/collections/arrays.ts";
import { ThingCaption } from "../../thing/thing-caption.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../../services/rendering/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../../constants/layout.ts";
import { FlagIcon } from "../../flag.ts";
import type { SubjectStats } from "../../../domain/media/stats.ts";
import { readThrough } from "../../../commons/cache.ts";
import {
  isNone,
  type Maybe,
  NONE,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import type {
  AlbumsListAttrs,
  BirdListingDetailsAttrs,
  CoveredThing,
  DrawThingAlbumOptions,
} from "./listing.ts";

/**
 * Inline badge for the listing card title. Irish birds get the Ireland flag.
 */
export function listingTitleExtra(
  thing: TripleObject,
  listingType: string,
): m.Children {
  const showsIrishFlag = listingType === KnownTypes.BIRD &&
    one(thing.irish) === DATA_TRUE;
  if (showsIrishFlag) {
    const flag = m(FlagIcon, { name: "Ireland" });
    return flag;
  }
  return undefined;
}

/** Render a covered subject as a linked photo album card. */
export function drawCoveredThing(
  options: DrawThingAlbumOptions,
  item: CoveredThing,
  idx: number,
): m.Children {
  const { id: thingId, type } = asUrn(item.id);
  return m(PhotoAlbum, {
    key: `thing-${item.id}`,
    label: withDefault(one(item.thing.name), thingId),
    imageUrl: item.cover.fullImage,
    thumbnailUrl: item.cover.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(item.cover.mosaicColours),
    loading: loadingMode(idx),
    trip: NONE,
    child: m(ThingCaption, {
      thing: item.thing,
      titleExtra: listingTitleExtra(item.thing, options.listingType),
    }),
    onclick: navigate(`/thing/${type}:${thingId}`),
  });
}

/** Render a subject card when the subject and its cover photo exist. */
export function drawThingAlbum(
  options: DrawThingAlbumOptions,
  thing: TripleObject,
  idx: number,
): m.Children[] {
  const id = one(thing.id);

  if (isNone(id)) {
    return [];
  }

  const coverPhoto = readThrough(
    options.coverCache,
    options.readThingCover,
    id,
  );
  if (isNone(coverPhoto)) {
    return [];
  }
  return [drawCoveredThing(options, { thing, id, cover: coverPhoto }, idx)];
}

/** Reset progressive card rendering when the listing type changes. */
export function resetListingBatchOnTypeChange(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
  old: m.VnodeDOM<AlbumsListAttrs>,
): void {
  if (vnode.attrs.listingType !== old.attrs.listingType) {
    batch.reset();
  }
}

/** Schedule enough render batches for the current subject count. */
export function scheduleListingBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.things.length);
}

/** Render the currently available batch of subject cards. */
export function viewAlbumsList(
  batch: BatchRenderer,
  coverCache: Map<string, Maybe<Photo>>,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const { readThingCover, things, listingType } = vnode.attrs;
  const options = { coverCache, readThingCover, listingType };
  return m(
    "section.album-container",
    { "data-testid": "listing-cards" },
    things.slice(0, batch.count())
      .flatMap(drawThingAlbum.bind(null, options)),
  );
}

/**
 * Render the albums in batches, so the browser can paint between each one.
 */
export function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);
  const coverCache = new Map<string, Maybe<Photo>>();

  return {
    onbeforeupdate: resetListingBatchOnTypeChange.bind(null, batch),
    oncreate: scheduleListingBatch.bind(null, batch),
    onupdate: scheduleListingBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch, coverCache),
  };
}

/** Render bird totals and the Ireland filter control. */
export function viewBirdListingDetails(
  vnode: m.Vnode<BirdListingDetailsAttrs>,
): m.Children {
  const { stats, filter, onToggleIreland } = vnode.attrs;
  const { wildSpecies, totalSpecies, irishWildSpecies } = stats;
  const irelandActive = filter === LIFE_LIST_FILTERS.IRELAND;

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

/**
 * Bird species counts. Clicking the Ireland flag filters to Irish species.
 */
export function BirdListingDetails() {
  return { view: viewBirdListingDetails };
}

/** Render Irish and worldwide mammal species totals. */
export function viewMammalListingDetails(
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
