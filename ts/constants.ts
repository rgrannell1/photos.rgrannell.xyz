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
}

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

export const RelationSymmetries = [
  [KnownRelations.IN, KnownRelations.CONTAINS],
];

export const CURIES = {
  "i": "urn:ró:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/",
};

export const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;
export const ENDPOINT = "https://photos-cdn.rgrannell.xyz";

export const SCROLL_HIDE_THRESHOLD = 200;

export const PLACE_FEATURES_TO_EMOJI = {
  aquarium: '🐠',
  archaeological: '🏺',
  beach: '🏖️',
  bridge: '🌉',
  canal: '🚤',
  castle: '🏰',
  cathedral: '⛪',
  cave: '🕳️',
  city: '🏙️',
  cliffs: '⛰️',
  county: '🗺️',
  district: '🏘️',
  garden: '🌺',
  harbor: '⚓',
  island: '🏝️',
  lake: '🏞️',
  monument: '🗿',
  mosque: '🕌',
  mountain: '🏔️',
  mountains: '🏔️',
  museum: '🏛️',
  national: '🇺🇳',
  nature: '🌿',
  palace: '🏯',
  park: '🌳',
  port: '🛳️',
  rainforest: '🌴',
  square: '🏢',
  state: '🏛️',
  street: '🚶‍♂️',
  town: '🏘️',
  train: '🚆',
  unesco: '🏛️',
  village: '🏡',
  volcano: '🌋',
  waterfall: '💦',
  wildlife: '🦁',
  zoo: '🦓'
}
