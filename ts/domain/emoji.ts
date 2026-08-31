/* Select emoji for parsed entities and raw triple objects. */

/* Select emoji for parsed entities and raw triple objects. */
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/collections/arrays.ts";
import { fromNullable, isSome, withDefault } from "../commons/collections/maybe.ts";
import { KnownTypes } from "../constants/data.ts";
import type { Feature, Place, Thing, Unesco } from "../types/domain.ts";

export type EmojiThing = Thing | Feature | Unesco | TripleObject;

/** Read an entity emoji or use the generic place marker. */
export function featureEmoji(feature: EmojiThing): string {
  return withDefault(one((feature as TripleObject).emoji), "📍");
}

/** Read a place flag or fall back to its feature emoji. */
export function placeEmoji(thing: Place | TripleObject): string {
  const flag = one(fromNullable(thing.flag));
  if (isSome(flag)) {
    return flag;
  }

  const fallback = featureEmoji(thing);
  return fallback;
}

/** Select the camera emoji from the device type. */
function cameraEmoji(thing: EmojiThing): string {
  const deviceType = one((thing as TripleObject).deviceType);
  return deviceType === "phone" ? "📱" : "📷";
}

/** Return the standard bird emoji. */
function birdEmoji(): string {
  return "🐤";
}

/** Adapt a generic emoji entity for place emoji selection. */
function placeThingEmoji(thing: EmojiThing): string {
  const place = thing as Place | TripleObject;
  return placeEmoji(place);
}

const EMOJI_READERS: Partial<Record<string, (thing: EmojiThing) => string>> = {
  [KnownTypes.BIRD]: birdEmoji,
  [KnownTypes.CAMERA]: cameraEmoji,
  [KnownTypes.PLACE]: placeThingEmoji,
  [KnownTypes.PLACE_FEATURE]: featureEmoji,
};

/** Select an emoji by URN type or return an empty string. */
export function thingEmoji(urn: string, _: string, thing: EmojiThing): string {
  const { type } = asUrn(urn);
  const readEmoji = EMOJI_READERS[type];
  const emoji = readEmoji ? readEmoji(thing) : "";
  return emoji;
}
