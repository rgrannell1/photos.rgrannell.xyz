/*
 * Presentation config: what is browseable, how types and features are
 * labelled, and which emoji represent them.
 */

import { KnownTypes } from "./data.ts";

// last year of the "before times": this and older year headings render dimmed
export const BEFORE_TIMES_FINAL_YEAR = 2015;

// virtual listing type for places that carry a country flag
export const COUNTRY_LISTING_TYPE = "country";

/*
 * The listings index is data-driven: mirror publishes one
 * urn:ró:listing:<type> entity per subject type, and the site renders
 * every listing entity it receives. No type registry lives here.
 */

/*
 * It does make sense to say "show every place photo",
 * so designate some types as non-listable on the Listing page
 */
export const NonListableTypes = new Set([
  KnownTypes.CAMERA,
  KnownTypes.PLACE,
  KnownTypes.PLACE_FEATURE,
  COUNTRY_LISTING_TYPE,
]);

/*
 * Place-type features too generic to surface in the "Place Type" row — every
 * photo is in some country and continent, so these add no information. Their
 * concrete places still show in the location row.
 */
export const HiddenPlaceFeatures = new Set<string>([
  "country",
  "continent",
]);

/*
 * A few words have irregular plurals; store them here.
 */
export const PLURALS = new Map<string, string>([
  [COUNTRY_LISTING_TYPE, "Countries"],
  ["place_feature", "Place Features"],
  ["spacecraft", "Spacecraft"],
]);

/*
 * Places have features, use these features to pick an emoji to represent the place
 */
export const PLACE_FEATURES_TO_EMOJI: Record<string, string> = {
  aquarium: "🐠",
  aquaduct: "🏛️",
  archaeological: "🏺",
  beach: "🏖️",
  bridge: "🌉",
  canal: "🚤",
  castle: "🏰",
  church: "⛪",
  cathedral: "⛪",
  continent: "🌍",
  cave: "⛏️",
  city: "🏙️",
  cliffs: "⛰️",
  county: "🗺️",
  district: "🏘️",
  garden: "🌺",
  harbor: "⚓",
  island: "🏝️",
  lake: "🏞️",
  monument: "🗿",
  mosque: "🕌",
  mountain: "🏔️",
  mountains: "🏔️",
  museum: "🏛️",
  monastery: "🏯",
  national: "🇺🇳",
  nature: "🌿",
  palace: "🏯",
  park: "🌳",
  port: "🛳️",
  rainforest: "🌴",
  square: "🏢",
  state: "🏛️",
  street: "🚶‍♂️",
  town: "🏘️",
  train: "🚆",
  unesco: "🏛️",
  village: "🏡",
  volcano: "🌋",
  waterfall: "💦",
  wildlife: "🦁",
  zoo: "🦓",
};
