/* Read entity emoji which need triple-store lookups. */

import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../../commons/arrays.ts";
import { fromNullable, isSome, withDefault } from "../../commons/maybe.ts";
import { KnownTypes } from "../../constants/data.ts";
import { type EmojiThing, thingEmoji } from "../../domain/emoji.ts";
import type { Place } from "../../types/domain.ts";

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
