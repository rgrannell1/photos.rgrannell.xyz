/* Resolve thing routes and retain their completed base model. */

import m from "mithril";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
  some,
} from "../../../commons/collections/maybe.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { buildThingUrn } from "../../../commons/urn.ts";
import { setify } from "../../../commons/collections/sets.ts";
import {
  ThingPage,
  type ThingPageAttrs,
} from "../../../components/pages/thing/view/thing.ts";
import type {
  ThingListItem,
} from "../../../components/thing/thing-list/thing-list.ts";
import type { Album, Country } from "../../../types/domain.ts";
import { services, state } from "../../context.ts";
import { pageEntry } from "../../shell.ts";
import { ThingListKind } from "../../../constants/data.ts";

let cachedUrn: Maybe<string> = NONE;
let cachedThings: TripleObject[] = [];
let cachedListingTitle: Maybe<string> = NONE;
let cachedIsBinomial = false;
let cachedTitleEmoji = "";

type AlbumEntry = { album: Album; countries: Country[] };

type ThingListReader = (urns: Set<string>) => ThingListItem[];

const THING_LIST_READERS: Partial<Record<ThingListKind, ThingListReader>> = {
  [ThingListKind.PLACE]: services.readLocations,
  [ThingListKind.FEATURE]: services.readFeatures,
  [ThingListKind.UNESCO]: services.readUnescos,
};

const THING_PAGE_READERS = {
  readSeenInCountries: services.readSeenInCountries,
  readAlbumEntries,
  readVideos: services.readVideosByThingIds,
  readPhotos: services.readPhotosByThingIds,
  readThingList,
  readThingEmoji: services.readThingEmoji,
  readTaxonMembers: services.readTaxonMembers,
  readThingCover: services.readThingCover,
};

/** Adds the countries associated with an album. */
function toAlbumEntry(album: Album): AlbumEntry {
  return {
    album,
    countries: services.readCountries(setify(fromNullable(album.country))),
  };
}

/** Reads albums for the requested things and attaches their countries. */
function readAlbumEntries(urns: Set<string>): AlbumEntry[] {
  return services.readAlbumsByThingIds(urns).map(toAlbumEntry);
}

/** Reads list items with the reader for their thing kind. */
function readThingList(
  kind: ThingListKind,
  urns: Set<string>,
): ThingListItem[] {
  const readList = THING_LIST_READERS[kind] ?? services.readTaxons;
  const items = readList(urns);
  return items;
}

/** Returns the requested thing as a zero-or-one-item array. */
function readSingleThing(urn: string): TripleObject[] {
  const thing = services.readThing(urn);
  if (isNone(thing)) return [];
  const things = [thing];
  return things;
}

/** Expands a wildcard URN or reads one exact thing. */
function readThings(urn: string): TripleObject[] {
  const parsed = asUrn(urn);
  if (parsed.id === "*") return services.readNamedTypeThings(parsed.type);
  const things = readSingleThing(urn);
  return things;
}

/** Refreshes cached page data only when the requested URN changes. */
function refreshThingCache(urn: string): void {
  if (urn === cachedUrn) {
    return;
  }
  const parsed = asUrn(urn);
  cachedUrn = urn;
  cachedThings = readThings(urn);
  cachedListingTitle = parsed.id === "*"
    ? some(services.readListingLabel(parsed.type))
    : NONE;
  cachedIsBinomial = services.isBinomialType(parsed.type);
  const [thing] = cachedThings;
  cachedTitleEmoji = thing ? services.readThingEmoji(urn, "", thing) : "";
}

/** Builds page attributes from the current thing cache and services. */
function buildThingPageAttrs(urn: string): ThingPageAttrs {
  return {
    urn,
    things: cachedThings,
    listingTitle: cachedListingTitle,
    isBinomial: cachedIsBinomial,
    titleEmoji: cachedTitleEmoji,
    ...THING_PAGE_READERS,
    visible: state.sidebarVisible,
  };
}

/** Resolves the current route to loaded thing-page attributes or a status message. */
function resolveThingPage() {
  if (!state.loaded) {
    return "";
  }
  const pair = m.route.param("pair");
  if (typeof pair !== "string") {
    return "No thing selected";
  }
  const urn = buildThingUrn(pair);
  refreshThingCache(urn);
  return { attrs: buildThingPageAttrs(urn) };
}

export const thingEntry = pageEntry({
  page: ThingPage,
  resolve: resolveThingPage,
});
