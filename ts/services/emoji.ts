import { asUrn } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../commons/arrays.ts";
import { KnownTypes } from "../constants/data.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Feature, Place, Thing, Unesco } from "../types.ts";
import { fromNullable, isSome, withDefault } from "../commons/maybe.ts";

// Anything an emoji can be looked up for: parsed things or raw triple objects
export type EmojiThing = Thing | Feature | Unesco | TripleObject;

const emojiCache = new WeakMap<TribbleDB, Map<string, string>>();

function readFeatureEmoji(tdb: TribbleDB, featureUrn: string): string {
  let cache = emojiCache.get(tdb);
  if (!cache) {
    cache = new Map();
    emojiCache.set(tdb, cache);
  }

  const cached = cache.get(featureUrn);
  if (cached) {
    return cached;
  }

  const { id } = asUrn(featureUrn);
  const feature = tdb.search({
    source: { type: KnownTypes.PLACE_FEATURE, id },
  }).firstObject();
  const emoji = withDefault(one(fromNullable(feature?.emoji)), "📍");
  cache.set(featureUrn, emoji);
  return emoji;
}

export function placeEmoji(thing: Place | TripleObject): string {
  // Country-places have a flag; prefer that over a feature emoji
  const flag = one(fromNullable(thing.flag));
  if (isSome(flag)) {
    return flag;
  }

  return withDefault(one(fromNullable(thing.emoji)), "📍");
}

export function featureEmoji(feature: EmojiThing): string {
  return withDefault(one((feature as TripleObject).emoji), "📍");
}

function birdEmoji(): string {
  return "🐤";
}

function cameraEmoji(thing: EmojiThing): string {
  // cameras have no parsed schema; the device type is a raw triple field
  const deviceType = one((thing as TripleObject).deviceType);
  return deviceType === "phone" ? "📱" : "📷";
}

export function thingEmoji(
  urn: string,
  _: string,
  thing: EmojiThing,
): string {
  const { type } = asUrn(urn);

  if (type === KnownTypes.PLACE) {
    // the URN type guarantees a place, but the compiler cannot see that
    return placeEmoji(thing as Place | TripleObject);
  }
  if (type === KnownTypes.BIRD) {
    return birdEmoji();
  }
  if (type === KnownTypes.CAMERA) {
    return cameraEmoji(thing);
  }
  if (type === KnownTypes.PLACE_FEATURE) {
    return featureEmoji(thing);
  }

  return "";
}

export function readThingEmoji(
  tdb: TribbleDB,
  urn: string,
  name: string,
  thing: EmojiThing,
): string {
  if (asUrn(urn).type !== KnownTypes.PLACE) {
    return thingEmoji(urn, name, thing);
  }

  const place = thing as Place | TripleObject;
  const flag = one(fromNullable(place.flag));
  if (isSome(flag)) {
    return flag;
  }

  const feature = one(fromNullable(place.features));
  return isSome(feature) ? readFeatureEmoji(tdb, feature) : "📍";
}
