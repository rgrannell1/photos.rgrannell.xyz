// symbols to uniquely define the manifest and metadata
// in the global window scope

export const BRAND_TEXT = "photos";

export class LoadMode {
  static EAGER = "eager";
  static LAZY = "lazy";
}

export const Pages = {
  photos: "photos",
  albums: "albums",
  album: "album",
  metadata: "metadata",
  about: "about",
  videos: "videos",
  thing: "thing",
  listing: "listing",
};

export class KnownThings {
  static UNESCO = "unesco";
  static BIRD = "bird";
  static MAMMAL = "mammal";
  static REPTILE = "reptile";
  static FISH = "fish";
  static INSECT = "insect";
  static AMPHIBIAN = "amphibian";
  static PLACE = "place";
  static PHOTO = "photo";
  static ALBUM = "album";
  static VIDEO = "video";
  static COUNTRY = "country";
}

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
}

export const ExifRelations = new Set([
  KnownRelations.CREATED_AT,
  KnownRelations.F_STOP,
  KnownRelations.FOCAL_LENGTH,
  KnownRelations.MODEL,
  KnownRelations.EXPOSURE_TIME,
  KnownRelations.ISO,
  KnownRelations.WIDTH,
  KnownRelations.HEIGHT,
]);

export const BinomialTypes = new Set([
  KnownThings.BIRD,
  KnownThings.MAMMAL,
  KnownThings.REPTILE,
  KnownThings.AMPHIBIAN,
  KnownThings.FISH,
  KnownThings.INSECT,
]);

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
