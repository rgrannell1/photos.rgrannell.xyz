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

function readEmojiCache(tdb: TribbleDB): Map<string, string> {
  const cached = emojiCache.get(tdb);
  if (cached) {
    return cached;
  }
  const cache = new Map<string, string>();
  emojiCache.set(tdb, cache);
  return cache;
}

function readFeature(tdb: TribbleDB, featureUrn: string) {
  const { id } = asUrn(featureUrn);
  const query = { source: { type: KnownTypes.PLACE_FEATURE, id } };
  const search = tdb.search(query);
  return search.firstObject();
}

function readFeatureEmojiValue(tdb: TribbleDB, featureUrn: string): string {
  const feature = readFeature(tdb, featureUrn);
  const emoji = one(fromNullable(feature?.emoji));
  return withDefault(emoji, "📍");
}

function cacheFeatureEmoji(
  cache: Map<string, string>,
  featureUrn: string,
  emoji: string,
): string {
  cache.set(featureUrn, emoji);
  return emoji;
}

function readFeatureEmoji(tdb: TribbleDB, featureUrn: string): string {
  const cache = readEmojiCache(tdb);

  const cached = cache.get(featureUrn);
  if (cached) {
    return cached;
  }

  const emoji = readFeatureEmojiValue(tdb, featureUrn);
  return cacheFeatureEmoji(cache, featureUrn, emoji);
}

function readPlaceFlag(place: Place | TripleObject) {
  return one(fromNullable(place.flag));
}

function readPlaceFeature(place: Place | TripleObject) {
  return one(fromNullable(place.features));
}

function readPlaceFeatureEmoji(
  tdb: TribbleDB,
  place: Place | TripleObject,
): string {
  const feature = readPlaceFeature(place);
  const emoji = isSome(feature) ? readFeatureEmoji(tdb, feature) : "📍";
  return emoji;
}

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

function isPlaceUrn(urn: string): boolean {
  return asUrn(urn).type === KnownTypes.PLACE;
}

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
