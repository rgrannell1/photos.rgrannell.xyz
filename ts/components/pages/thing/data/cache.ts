/* Support thing operations. */

import m from "mithril";
import type {
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../../../types/domain.ts";
import { CountryLinkMode } from "../../../../constants/display.ts";
import { CountryLink } from "../../../thing/references/country-link.ts";
import { ThingList } from "../../../thing/thing-list/thing-list.ts";
import type { ThingListKind } from "../../../../constants/data.ts";
import { setOf } from "../../../../commons/collections/sets.ts";
import { isSome, NONE, some } from "../../../../commons/collections/maybe.ts";
import type {
  AlbumEntry,
  CachedReader,
  SeenInCountry,
  ThingPageAttrs,
  UrnCache,
} from "../view/thing.ts";

/** Computes a value and replaces the cache entry for the page URN. */
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

/** Reuses a value for the same page URN, or computes a fresh value. */
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
/** Wraps a page reader with a one-entry cache keyed by URN. */
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

/** Reads countries linked to the distinct things on the page. */
export function readSeenIn(attrs: ThingPageAttrs): Country[] {
  return attrs.readSeenInCountries(setOf<string>("id", attrs.things));
}

/** Reads album entries linked to the distinct things on the page. */
export function readAlbumEntries(attrs: ThingPageAttrs): AlbumEntry[] {
  return attrs.readAlbumEntries(setOf<string>("id", attrs.things));
}

/** Reads videos linked to the distinct things on the page. */
export function readThingVideos(attrs: ThingPageAttrs): VideoType[] {
  return attrs.readVideos(setOf<string>("id", attrs.things));
}

/** Reads photos linked to the distinct things on the page. */
export function readThingPhotos(attrs: ThingPageAttrs): PhotoType[] {
  return attrs.readPhotos(setOf<string>("id", attrs.things));
}

/** Draws one country link for a seen-in list. */
export function drawSeenInCountry(country: SeenInCountry): m.Children {
  return m(CountryLink, {
    country,
    mode: CountryLinkMode.Name,
    key: `seen-in-${country.id}`,
  });
}

/** Draws a metadata key and value as a table row. */
export function drawMetadataRow(
  [key, value]: [string, m.Children],
): m.Children {
  return m("tr", [
    m("th.exif-heading", key),
    m("td", value),
  ]);
}

/** Draws a typed thing list for the supplied URNs. */
export function drawThingList(
  attrs: ThingPageAttrs,
  kind: ThingListKind,
  urns: Set<string>,
): m.Children {
  const component = ThingList;
  const $list = m(component, {
    kind,
    readItems: attrs.readThingList,
    readEmoji: attrs.readThingEmoji,
    urns,
  });
  return $list;
}
