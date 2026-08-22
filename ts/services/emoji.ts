import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { KnownTypes } from "../constants/data.ts";
import { getTribbleDB } from "../semantic/data.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Feature, Place, Thing, Unesco } from "../types.ts";

// Anything an emoji can be looked up for: parsed things or raw triple objects
type EmojiThing = Thing | Feature | Unesco | TripleObject;

export function placeEmoji(thing: Place | TripleObject): string {
  // Country-places have a flag; prefer that over a feature emoji
  const flag = one(thing.flag);
  if (flag) {
    return flag;
  }

  const feature = one(thing.features);
  if (!feature) {
    return "📍";
  }

  return placeFeatureEmoji(feature);
}

/* Emoji published on place-feature entity (e.g. church emoji for religious sites). */
export function placeFeatureEmoji(featureUrn: string): string {
  const { id: featureId } = asUrn(featureUrn);

  const feature = getTribbleDB().search({
    source: { type: KnownTypes.PLACE_FEATURE, id: featureId },
  }).firstObject();

  return one(feature?.emoji) ?? "📍";
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
    // The URN type guarantees a place; the compiler cannot see that
    return placeEmoji(thing as Place | TripleObject);
  }
  if (type === KnownTypes.BIRD) {
    return birdEmoji();
  }
  if (type === KnownTypes.CAMERA) {
    return cameraEmoji(thing);
  }
  if (type === KnownTypes.PLACE_FEATURE) {
    return placeFeatureEmoji(urn);
  }

  return "";
}
