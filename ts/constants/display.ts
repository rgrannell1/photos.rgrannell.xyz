/*
 * Presentation config: what is browseable, how types and features are
 * labelled, and which emoji represent them.
 */

import { KnownTypes } from "./data.ts";

/*
 * Types browsable from the listings index, with their plural display labels.
 * The constants-drift test checks every subject type in the published data
 * is either listed here or deliberately excluded below.
 */
export const LISTED_TYPES: [string, string][] = [
  [KnownTypes.PLACE, "Places"],
  [KnownTypes.PLACE_FEATURE, "Place Features"],
  [KnownTypes.BIRD, "Birds"],
  [KnownTypes.MAMMAL, "Mammals"],
  [KnownTypes.REPTILE, "Reptiles"],
  [KnownTypes.AMPHIBIAN, "Amphibians"],
  [KnownTypes.INSECT, "Insects"],
  [KnownTypes.FISH, "Fish"],
  [KnownTypes.ARTHROPOD, "Arthropods"],
  [KnownTypes.CTENOPHORE, "Ctenophores"],
  [KnownTypes.PLANE, "Planes"],
  [KnownTypes.TRAIN, "Trains"],
  [KnownTypes.CAR, "Cars"],
  [KnownTypes.HELICOPTER, "Helicopters"],
  [KnownTypes.BOAT, "Boats"],
  [KnownTypes.SPACECRAFT, "Spacecraft"],
];

// subject types deliberately absent from the listings index
export const UNLISTED_SUBJECT_TYPES = new Set<string>([
  KnownTypes.PERSON,
]);

/*
 * It does make sense to say "show every place photo",
 * so designate some types as non-listable on the Listing page
 */
export const NonListableTypes = new Set([
  KnownTypes.CAMERA,
  KnownTypes.PLACE,
  KnownTypes.PLACE_FEATURE,
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
  ["place_feature", "Place Features"],
  ["spacecraft", "Spacecraft"],
]);

/*
 * Places have features, use these features to pick an emoji to represent the place
 */
export const PLACE_FEATURES_TO_EMOJI = {
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
