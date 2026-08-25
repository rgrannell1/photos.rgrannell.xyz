/* Resolve thing routes and retain their completed base model. */

import m from "mithril";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
  some,
} from "../../commons/maybe.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { thingUrn } from "../../commons/urn.ts";
import { setify } from "../../commons/sets.ts";
import { ThingPage, type ThingPageAttrs } from "../../components/pages/thing.ts";
import type {
  ThingListItem,
  ThingListKind,
} from "../../components/thing/thing-list.ts";
import type { Album, Country } from "../../types.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const thingPageComponent = ThingPage();

let cachedUrn: Maybe<string> = NONE;
let cachedThings: TripleObject[] = [];
let cachedListingTitle: Maybe<string> = NONE;
let cachedIsBinomial = false;
let cachedTitleEmoji = "";

type AlbumEntry = { album: Album; countries: Country[] };

function toAlbumEntry(album: Album): AlbumEntry {
  return {
    album,
    countries: services.readCountries(setify(fromNullable(album.country))),
  };
}

function readAlbumEntries(urns: Set<string>): AlbumEntry[] {
  return services.readAlbumsByThingIds(urns).map(toAlbumEntry);
}

function readThingList(kind: ThingListKind, urns: Set<string>): ThingListItem[] {
  if (kind === "place") {
    return services.readLocations(urns);
  }
  if (kind === "feature") {
    return services.readFeatures(urns);
  }
  if (kind === "unesco") {
    return services.readUnescos(urns);
  }
  return services.readTaxons(urns);
}

function readThings(urn: string): TripleObject[] {
  const parsed = asUrn(urn);
  if (parsed.id === "*") {
    return services.readNamedTypeThings(parsed.type);
  }

  const thing = services.readThing(urn);
  return isNone(thing) ? [] : [thing];
}

export const thingEntry = pageEntry({
  page: thingPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    const pair = m.route.param("pair");
    if (typeof pair !== "string") {
      return "No thing selected";
    }
    const urn = thingUrn(pair);

    if (urn !== cachedUrn) {
      const parsed = asUrn(urn);
      cachedUrn = urn;
      cachedThings = readThings(urn);
      cachedListingTitle = parsed.id === "*"
        ? some(services.readListingLabel(parsed.type))
        : NONE;
      cachedIsBinomial = services.isBinomialType(parsed.type);
      const [thing] = cachedThings;
      cachedTitleEmoji = thing
        ? services.readThingEmoji(urn, "", thing)
        : "";
    }

    const attrs: ThingPageAttrs = {
      urn,
      things: cachedThings,
      listingTitle: cachedListingTitle,
      isBinomial: cachedIsBinomial,
      titleEmoji: cachedTitleEmoji,
      readSeenInCountries: services.readSeenInCountries,
      readAlbumEntries,
      readVideos: services.readVideosByThingIds,
      readPhotos: services.readPhotosByThingIds,
      readThingList,
      readThingEmoji: services.readThingEmoji,
      readTaxonMembers: services.readTaxonMembers,
      readThingCover: services.readThingCover,
      visible: state.sidebarVisible,
    };
    return { attrs };
  },
});
