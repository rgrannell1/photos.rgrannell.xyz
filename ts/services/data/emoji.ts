/* Read entity emoji which need triple-store lookups. */

/* Read entity emoji which need triple-store lookups. */
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../../commons/collections/arrays.ts";
import { fromNullable, isSome, withDefault } from "../../commons/collections/maybe.ts";
import { KnownTypes } from "../../constants/data.ts";
import { type EmojiThing, thingEmoji } from "../../domain/emoji.ts";
import type { Place } from "../../types/domain.ts";

const emojiCache = new WeakMap<TribbleDB, Map<string, string>>();

/** Returns the feature emoji cache owned by a TribbleDB instance. */
function readEmojiCache(tdb: TribbleDB): Map<string, string> {
  const cached = emojiCache.get(tdb);
  if (cached) {
    return cached;
  }
  const cache = new Map<string, string>();
  emojiCache.set(tdb, cache);
  return cache;
}

/** Reads a place feature object from its URN. */
function readFeature(tdb: TribbleDB, featureUrn: string) {
  const { id } = asUrn(featureUrn);
  const query = { source: { type: KnownTypes.PLACE_FEATURE, id } };
  const search = tdb.search(query);
  return search.firstObject();
}

/** Reads a feature emoji, with a pin as the missing-value fallback. */
function readFeatureEmojiValue(tdb: TribbleDB, featureUrn: string): string {
  const feature = readFeature(tdb, featureUrn);
  const emoji = one(fromNullable(feature?.emoji));
  return withDefault(emoji, "📍");
}

/** Stores and returns a feature emoji for reuse. */
function cacheFeatureEmoji(
  cache: Map<string, string>,
  featureUrn: string,
  emoji: string,
): string {
  cache.set(featureUrn, emoji);
  return emoji;
}

/** Reads a feature emoji once per TribbleDB instance and feature URN. */
function readFeatureEmoji(tdb: TribbleDB, featureUrn: string): string {
  const cache = readEmojiCache(tdb);

  const cached = cache.get(featureUrn);
  if (cached) {
    return cached;
  }

  const emoji = readFeatureEmojiValue(tdb, featureUrn);
  return cacheFeatureEmoji(cache, featureUrn, emoji);
}

/** Reads the first flag assigned to a place. */
function readPlaceFlag(place: Place | TripleObject) {
  return one(fromNullable(place.flag));
}

/** Reads the first feature assigned to a place. */
function readPlaceFeature(place: Place | TripleObject) {
  return one(fromNullable(place.features));
}

/** Reads a place feature emoji, with a pin when the feature is absent. */
function readPlaceFeatureEmoji(
  tdb: TribbleDB,
  place: Place | TripleObject,
): string {
  const feature = readPlaceFeature(place);
  const emoji = isSome(feature) ? readFeatureEmoji(tdb, feature) : "📍";
  return emoji;
}

/** Prefers a place flag and falls back to its feature emoji. */
function readPlaceEmoji(
  tdb: TribbleDB,
  place: Place | TripleObject,
): string {
  const flag = readPlaceFlag(place);
  if (isSome(flag)) {
    return flag;
  }

  return readPlaceFeatureEmoji(tdb, place);
}

/** Reports whether a URN identifies a place. */
function isPlaceUrn(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

/** Resolves the display emoji for a place or another supported thing. */
export function readThingEmoji(
  tdb: TribbleDB,
  urn: string,
  name: string,
  thing: EmojiThing,
): string {
  if (!isPlaceUrn(urn)) {
    return thingEmoji(urn, name, thing);
  }

  const place = thing as Place | TripleObject;
  const emoji = readPlaceEmoji(tdb, place);
  return emoji;
}
