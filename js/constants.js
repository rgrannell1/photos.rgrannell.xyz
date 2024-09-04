// symbols to uniquely define the manifest and metadata
// in the global window scope
export const ALBUMS_SYMBOL = Symbol("the albums manifest");
export const IMAGES_SYMBOL = Symbol("the images manifest");
export const MANIFEST_SYMBOL = Symbol("the site manifest");
export const METADATA_SYMBOL = Symbol("metadata about the site manifest");
export const VIDEOS_SYMBOL = Symbol("the videos manifest");

export const LOCATION_LATITUDE = 53.33306;
export const LOCATION_LONGITUDE = -6.24889;
export const LOCATION_ZOOM = 6;

export const BRAND_TEXT = "photos";

export class LoadMode {
  static EAGER = "eager";
  static LAZY = "lazy";
}

export class Pages {
  static PHOTOS = "photos"; // is this a thing?
  static ALBUMS = "albums";
  static DATE = "date";
  static LOCATIONS = "locations";
  static ALBUM = "album";
  static STATS = "stats";
  static TAG = "tag";
  static TAG_ALBUM = "tag-album";
  static TAGS = "tags";
  static METADATA = "metadata";
  static ABOUT = "about";
}
