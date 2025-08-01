// symbols to uniquely define the manifest and metadata
// in the global window scope
export const ALBUMS_SYMBOL = Symbol("the albums manifest");
export const IMAGES_SYMBOL = Symbol("the images manifest");
export const MANIFEST_SYMBOL = Symbol("the site manifest");
export const VIDEOS_SYMBOL = Symbol("the videos manifest");
export const EXIF_SYMBOL = Symbol("the exif data");
export const SEMANTIC_SYMBOL = Symbol("the semantic data");
export const STATS_SYMBOL = Symbol("the album stats");
export const TRIPLES_SYMBOL = Symbol("the triples data");

export const LOCATION_LATITUDE = 53.33306;
export const LOCATION_LONGITUDE = -6.24889;
export const LOCATION_ZOOM = 6;

export const BRAND_TEXT = "photos";

export class LoadMode {
  static EAGER = "eager";
  static LAZY = "lazy";
}

export class Pages {
  static PHOTOS = "photos";
  static ALBUMS = "albums";
  static ALBUM = "album";
  static METADATA = "metadata";
  static ABOUT = "about";
  static VIDEOS = "videos";
  static THING = "thing";
}

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
  static RATING = "rating";
  static NAME = "name";
  static BIRDWATCH_URL = "birdwatch_url";
  static WIKIPEDIA = "wikipedia";
}

export const BinomialTypes = new Set([
  "bird",
  "mammal",
  "reptile",
  "amphibian",
  "fish",
  "insect",
]);
