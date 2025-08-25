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
  static GEONAME = "geoname";
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
  static BIRDWATCH_URL = "birdwatch_url";
  static WIKIPEDIA = "wikipedia";
  static CREATED_AT = "created_at";
  static F_STOP = "f_stop";
  static FOCAL_LENGTH = "focal_length";
  static MODEL = "model";
  static EXPOSURE_TIME = "exposure_time";
  static ISO = "iso";
  static WIDTH = "width";
  static HEIGHT = "height";
}

export const ExifRelations = new Set([
  "created_at",
  "f_stop",
  "focal_length",
  "model",
  "exposure_time",
  "iso",
  "width",
  "height",
]);

export const BinomialTypes = new Set([
  "bird",
  "mammal",
  "reptile",
  "amphibian",
  "fish",
  "insect",
]);
