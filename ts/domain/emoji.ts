/* Select emoji for parsed entities and raw triple objects. */

/* Select emoji for parsed entities and raw triple objects. */
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../commons/collections/arrays.ts";
import { fromNullable, isSome, withDefault } from "../commons/collections/maybe.ts";
import { KnownTypes } from "../constants/data.ts";
import type { Feature, Place, Thing, Unesco } from "../types/domain.ts";

export type EmojiThing = Thing | Feature | Unesco | TripleObject;

/** Read an entity emoji or use the generic place marker. */
export function selectFeatureEmoji(feature: EmojiThing): string {
  return withDefault(selectFirst((feature as TripleObject).emoji), "📍");
}

/** Read a place flag or fall back to its feature emoji. */
export function selectPlaceEmoji(thing: Place | TripleObject): string {
  const flag = selectFirst(fromNullable(thing.flag));
  if (isSome(flag)) {
    return flag;
  }

  const fallback = selectFeatureEmoji(thing);
  return fallback;
}

/** Select the camera emoji from the device type. */
function selectCameraEmoji(thing: EmojiThing): string {
  const deviceType = selectFirst((thing as TripleObject).deviceType);
  return deviceType === "phone" ? "📱" : "📷";
}

/** Return the standard bird emoji. */
function selectBirdEmoji(): string {
  return "🐤";
}

/** Adapt a generic emoji entity for place emoji selection. */
function selectPlaceThingEmoji(thing: EmojiThing): string {
  const place = thing as Place | TripleObject;
  return selectPlaceEmoji(place);
}

const EMOJI_READERS: Partial<Record<string, (thing: EmojiThing) => string>> = {
  [KnownTypes.BIRD]: selectBirdEmoji,
  [KnownTypes.CAMERA]: selectCameraEmoji,
  [KnownTypes.PLACE]: selectPlaceThingEmoji,
  [KnownTypes.PLACE_FEATURE]: selectFeatureEmoji,
};

/** Select an emoji by URN type or return an empty string. */
export function selectThingEmoji(urn: string, _: string, thing: EmojiThing): string {
  const { type } = asUrn(urn);
  const readEmoji = EMOJI_READERS[type];
  const emoji = readEmoji ? readEmoji(thing) : "";
  return emoji;
}
