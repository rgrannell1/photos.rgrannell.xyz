import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { navigate } from "../events.ts";

import {
  CAMERA_MODELS,
  KnownTypes,
  PHONE_MODELS,
  PLACE_FEATURES_TO_EMOJI,
} from "../constants.ts";
import { one } from "../arrays.ts";

export type ThingLinkAttrs = {
  urn: string;
  thing: any;
};

/*
 * Pick an emoji based on the place feature
 *
 * @param thing The place
 */
function placeEmoji(thing: any): string {
  const feature = one(thing.feature);
  const { id: featureId } = asUrn(feature);

  if (PLACE_FEATURES_TO_EMOJI.hasOwnProperty(featureId)) {
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
function countryEmoji(thing: any): string {
  const flag = one(thing.flag);
  return flag ?? "🏳️";
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
function cameraEmoji(thing: any): string {
  const { id } = asUrn(thing.id);

  if (CAMERA_MODELS.has(id)) {
    return "📷";
  } else if (PHONE_MODELS.has(id)) {
    return "📱";
  }

  return "📷";
}

/* */
export function thingEmoji(urn: string, name: string, thing: any): string {
  const { type } = asUrn(urn);

  switch (type) {
    case KnownTypes.PLACE:
      return placeEmoji(thing);
    case KnownTypes.COUNTRY:
      return countryEmoji(thing);
    case KnownTypes.BIRD:
      return birdEmoji();
    case KnownTypes.CAMERA:
      return cameraEmoji(thing);
    default:
      return "";
  }
}

/* */
export function ThingLink() {
  return {
    view(vnode: m.Vnode<ThingLinkAttrs>) {
      const { urn, thing } = vnode.attrs;
      const { type, id } = asUrn(urn);

      const name = one(thing.name) ?? id;
      const emoji = thingEmoji(urn, name, thing);

      return m("a", {
        href: urn,
        onclick: navigate(`/thing/${type}:${id}`),
        class: ["thing-link", `${type}-link`].join(" "),
      }, `${emoji}\t${name}`);
    },
  };
}
