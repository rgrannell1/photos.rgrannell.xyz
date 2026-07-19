import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { CAMERA_MODELS, KnownTypes, PHONE_MODELS } from "../constants/data.ts";
import { PLACE_FEATURES_TO_EMOJI } from "../constants/display.ts";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Country, Feature, Place, Thing, Unesco } from "../types.ts";

// Anything an emoji can be looked up for: parsed things or raw triple objects
type EmojiThing = Thing | Feature | Unesco | TripleObject;

/*
 * Pick an emoji based on the place feature
 *
 * @param thing The place
 */
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
export function countryEmoji(thing: Country): string {
  const flag = one(thing.flag);
  return flag ?? ""; //?? "🏳️";
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
function cameraEmoji(thing: EmojiThing): string {
  const { id } = asUrn(one(thing.id) ?? "");

  if (CAMERA_MODELS.has(id)) {
    return "📷";
  } else if (PHONE_MODELS.has(id)) {
    return "📱";
  }

  return "📷";
}

/* */
export function thingEmoji(
  urn: string,
  _: string,
  thing: EmojiThing,
): string {
  const { type } = asUrn(urn);

  switch (type) {
    case KnownTypes.PLACE:
      // The URN type guarantees a place; the compiler cannot see that
      return placeEmoji(thing as Place | TripleObject);
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
