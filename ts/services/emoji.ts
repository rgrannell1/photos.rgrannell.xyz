import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import {
  CAMERA_MODELS,
  KnownTypes,
  PHONE_MODELS,
  PLACE_FEATURES_TO_EMOJI,
} from "../constants.ts";
import type { Thing } from "../types.ts";

/*
 * Pick an emoji based on the place feature
 *
 * @param thing The place
 */
export function placeEmoji(thing: any): string {
  // Country-places have a flag; prefer that over a feature emoji
  const flag = one(thing.flag);
  if (flag) {
    return flag as string;
  }

  const feature = one(thing.features);
  const { id: featureId } = asUrn(feature);

  if (
    Object.prototype.hasOwnProperty.call(PLACE_FEATURES_TO_EMOJI, featureId)
  ) {
    return PLACE_FEATURES_TO_EMOJI[
      featureId as keyof typeof PLACE_FEATURES_TO_EMOJI
    ];
  }

  return "📍";
}

/*
 * Load an emoji relating to a place (e.g church emoji for religious sites)
 */
export function placeFeatureEmoji(featureUrn: string): string {
  const { id: featureId } = asUrn(featureUrn);

  if (
    Object.prototype.hasOwnProperty.call(PLACE_FEATURES_TO_EMOJI, featureId)
  ) {
    return PLACE_FEATURES_TO_EMOJI[
      featureId as keyof typeof PLACE_FEATURES_TO_EMOJI
    ];
  }

  return "📍";
}

/*
 * Pick an flag based on the country definition
 *
 * @param thing The country thing
 */
export function countryEmoji(thing: any): string {
  const flag = one(thing.flag);
  return flag; //?? "🏳️";
}

/*
 * Pick a bird emoji
 */
function birdEmoji(): string {
  return "🐤";
}

/*
 * Pick an emoji for the camera
 *
 * @param thing The thing to get the emoji for, based on id
 */
function cameraEmoji(thing: Thing): string {
  const { id } = asUrn(thing.id);

  if (CAMERA_MODELS.has(id)) {
    return "📷";
  } else if (PHONE_MODELS.has(id)) {
    return "📱";
  }

  return "📷";
}

/* */
export function thingEmoji(urn: string, _: string, thing: Thing): string {
  const { type } = asUrn(urn);

  switch (type) {
    case KnownTypes.PLACE:
      return placeEmoji(thing);
    case KnownTypes.BIRD:
      return birdEmoji();
    case KnownTypes.CAMERA:
      return cameraEmoji(thing);
    case KnownTypes.PLACE_FEATURE:
      return placeFeatureEmoji(urn);
    default:
      return "";
  }
}
