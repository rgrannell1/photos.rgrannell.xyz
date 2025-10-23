export const PHOTO_WIDTH = 400;
export const PHOTO_HEIGHT = 400;

export class KnownRelations {
  static SUBJECT = "subject";
  static LOCATION = "location";
  static LONGITUDE = "longitude";
  static LATITUDE = "latitude";
  static COUNTRY = "country";
  static FLAG = "flag";
  static RATING = "rating";
  static NAME = "name";
  static BIRDWATCH_URL = "birdwatchUrl";
  static WIKIPEDIA = "wikipedia";
  static CREATED_AT = "createdAt";
  static SEASON = "season";
  static F_STOP = "f_stop";
  static FOCAL_LENGTH = "focalLength";
  static MODEL = "model";
  static EXPOSURE_TIME = "exposureTime";
  static ISO = "iso";
  static WIDTH = "width";
  static HEIGHT = "height";
  static THUMBNAIL_URL = "thumbnailUrl";
  static PNG_URL = "pngUrl";
  static MID_IMAGE_LOSSY_URL = "midImageLossyUrl";
  static FULL_IMAGE = "fullImage";
  static POSTER_URL = "posterUrl";
  static VIDEO_URL_1080P = "videoUrl1080p";
  static VIDEO_URL_480P = "videoUrl480p";
  static VIDEO_URL_720P = "videoUrl720p";
  static VIDEO_URL_UNSCALED = "videoUrlUnscaled";
  static YEAR = "year";
  static CONTAINS = "contains";
  static IN = "in";
  static STYLE = "style";
  // horrible
  static FLAGS = "flags";
}

export class KnownTypes {
  static PLACE = "place";
  static COUNTRY = "country";
  static BIRD = "bird";
  static MAMMAL = "mammal";
  static REPTILE = "reptile";
  static AMPHIBIAN = "amphibian";
  static INSECT = "insect";
  static CAMERA = "camera";
}

/*
 * It does make sense to say "show every place photo",
 * so designate some types as non-listable on the Listing page
 */
export const NonListableTypes = new Set([
  KnownTypes.COUNTRY,
  KnownTypes.CAMERA,
  KnownTypes.PLACE,
]);

/*
 * A few words have irregular plurals; store them here
 * so we can display them without saying `Countrys`
 */
export const PLURALS = new Map<string, string>([
  ["country", "countries"],
]);

/*
 * These relations should all expand to CDN urls
 */
export const CDN_RELATIONS = new Set([
  KnownRelations.THUMBNAIL_URL,
  KnownRelations.PNG_URL,
  KnownRelations.MID_IMAGE_LOSSY_URL,
  KnownRelations.FULL_IMAGE,
  KnownRelations.POSTER_URL,
  KnownRelations.VIDEO_URL_1080P,
  KnownRelations.VIDEO_URL_480P,
  KnownRelations.VIDEO_URL_720P,
  KnownRelations.VIDEO_URL_UNSCALED,
]);

/*
 * Some relationships have inverses; store this data here
 * (though it could be passed in band in the Tribble file in future)
 */
export const RelationSymmetries = [
  [KnownRelations.IN, KnownRelations.CONTAINS],
];

/*
 * A list of shortened Curies passed to the UI, and how to expand them
 */
export const CURIES = {
  "i": "urn:ró:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/",
};

// Curies match this pattern
export const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;

// TODO inject via environmental variable
export const ENDPOINT = "https://photos-cdn.rgrannell.xyz";

export const SCROLL_HIDE_THRESHOLD = 200;

/*
 * Places have features, use these features to pick an emoji to represent the place
 *
 */
export const PLACE_FEATURES_TO_EMOJI = {
  aquarium: "🐠",
  archaeological: "🏺",
  beach: "🏖️",
  bridge: "🌉",
  canal: "🚤",
  castle: "🏰",
  cathedral: "⛪",
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

/*
 * A list of cameras I've taken photos on
 *
 */
export const CAMERA_MODELS = new Set([
  "dc-gh5",
  "dc-gh6",
  "dmc-fz72",
  "dmc-g7",
  "finepix-f70exr",
  "xz-1",
]);

/*
 * A list of phones I've taken photos on
 *
 */
export const PHONE_MODELS = new Set([
  "pixel-4a",
  "pixel-7-pro",
  "pixel-9a",
  "sm-a520f",
]);
