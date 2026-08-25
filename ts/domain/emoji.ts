/* Select emoji for parsed entities and raw triple objects. */

import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { fromNullable, isSome, withDefault } from "../commons/maybe.ts";
import { KnownTypes } from "../constants/data.ts";
import type { Feature, Place, Thing, Unesco } from "../types/domain.ts";

export type EmojiThing = Thing | Feature | Unesco | TripleObject;

export function placeEmoji(thing: Place | TripleObject): string {
  const flag = one(fromNullable(thing.flag));
  if (isSome(flag)) {
    return flag;
  }

  return withDefault(one(fromNullable(thing.emoji)), "📍");
}

export function featureEmoji(feature: EmojiThing): string {
  return withDefault(one((feature as TripleObject).emoji), "📍");
}

function cameraEmoji(thing: EmojiThing): string {
  const deviceType = one((thing as TripleObject).deviceType);
  return deviceType === "phone" ? "📱" : "📷";
}

export function thingEmoji(urn: string, _: string, thing: EmojiThing): string {
  const { type } = asUrn(urn);

  if (type === KnownTypes.PLACE) {
    return placeEmoji(thing as Place | TripleObject);
  }
  if (type === KnownTypes.BIRD) {
    return "🐤";
  }
  if (type === KnownTypes.CAMERA) {
    return cameraEmoji(thing);
  }
  if (type === KnownTypes.PLACE_FEATURE) {
    return featureEmoji(thing);
  }

  return "";
}
