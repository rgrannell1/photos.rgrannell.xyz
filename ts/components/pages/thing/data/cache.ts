/* Support thing operations. */

import m from "mithril";
import type {
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../../../types/domain.ts";
import { CountryLink } from "../../../thing/references/country-link.ts";
import { ThingList, type ThingListKind } from "../../../thing/thing-list/thing-list.ts";
import { setOf } from "../../../../commons/collections/sets.ts";
import { isSome, NONE, some } from "../../../../commons/collections/maybe.ts";
import type {
  AlbumEntry,
  CachedReader,
  SeenInCountry,
  ThingPageAttrs,
  UrnCache,
} from "../view/thing.ts";

export function computeCached<Value extends object>(
  cache: UrnCache<Value>,
  attrs: ThingPageAttrs,
): Value {
  const urn = attrs.urn;
  cache.lastUrn = urn;
  const value = cache.compute(attrs);
  cache.value = some(value);
  return value;
}

export function readCached<Value extends object>(
  cache: UrnCache<Value>,
  attrs: ThingPageAttrs,
): Value {
  const cachedValue = cache.value;
  const hasMatchingUrn = attrs.urn === cache.lastUrn;
  if (hasMatchingUrn && isSome(cachedValue)) {
    return cachedValue;
  }
  return computeCached(cache, attrs);
}

/*
 * Memoise a read against the page URN. Reads are pure over loaded data, so
 * they must not run on every batched redraw.
 */
export function cachedByUrn<Value extends object>(
  compute: (attrs: ThingPageAttrs) => Value,
): CachedReader<Value> {
  const cache: UrnCache<Value> = {
    lastUrn: NONE,
    value: NONE,
    compute,
  };
  const reader = readCached.bind(null, cache) as CachedReader<Value>;
  return reader;
}

export function readSeenIn(attrs: ThingPageAttrs): Country[] {
  return attrs.readSeenInCountries(setOf<string>("id", attrs.things));
}

export function readAlbumEntries(attrs: ThingPageAttrs): AlbumEntry[] {
  return attrs.readAlbumEntries(setOf<string>("id", attrs.things));
}

export function readThingVideos(attrs: ThingPageAttrs): VideoType[] {
  return attrs.readVideos(setOf<string>("id", attrs.things));
}

export function readThingPhotos(attrs: ThingPageAttrs): PhotoType[] {
  return attrs.readPhotos(setOf<string>("id", attrs.things));
}

export function drawSeenInCountry(country: SeenInCountry): m.Children {
  return m(CountryLink, {
    country,
    mode: "name",
    key: `seen-in-${country.id}`,
  });
}

export function drawMetadataRow(
  [key, value]: [string, m.Children],
): m.Children {
  return m("tr", [
    m("th.exif-heading", key),
    m("td", value),
  ]);
}

export function drawThingList(
  attrs: ThingPageAttrs,
  kind: ThingListKind,
  urns: Set<string>,
): m.Children {
  const component = ThingList;
  const list = m(component, {
    kind,
    readItems: attrs.readThingList,
    readEmoji: attrs.readThingEmoji,
    urns,
  });
  return list;
}
