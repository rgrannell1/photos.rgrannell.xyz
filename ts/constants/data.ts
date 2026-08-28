/*
 * Data-layer vocabulary: relations, types, and curie config. Checked by constants-drift test.
 */

/*
 * Relations queried by name (not parsed-object fields). Checked against published data.
 */
export class KnownRelations {
  static ALBUM_ID = "albumId";
  static SUBJECT = "subject";
  static LOCATION = "location";
  static COVER = "cover";
  static STATUS = "status";
  static NEMESIS = "nemesis";
  static FLAG = "flag";
  static NAME = "name";
  static BIRDWATCH_URL = "birdwatchUrl";
  static IRISH = "irish";
  static FIRST_SEEN = "firstSeen";
  static CREATED_AT = "createdAt";
  static THUMBNAIL_URL = "thumbnailUrl";
  static MID_IMAGE_LOSSY_URL = "midImageLossyUrl";
  static PREVIEW_JPEG_URL = "previewJpegUrl";
  static FULL_IMAGE = "fullImage";
  static POSTER_URL = "posterUrl";
  static VIDEO_URL_1080P = "videoUrl1080p";
  static VIDEO_URL_480P = "videoUrl480p";
  static VIDEO_URL_720P = "videoUrl720p";
  static VIDEO_URL_UNSCALED = "videoUrlUnscaled";
  static YEAR = "year";
  static RECAP = "recap";
  static CONTAINS = "contains";
  static IN = "in";
  static MOSAIC_BANNER = "mosaicBanner";
  static CONTAINS_ALBUM = "containsAlbum";
  static TRIP = "trip";
  static TITLE = "title";
  static FEATURES = "features";
  static PLACES_WITH_FEATURE = "placesWithFeature";
  static CURIE = "curie";
  static GENUS = "genus";
  static FAMILY = "family";
  static ORDER = "order";
}

export class KnownTypes {
  static PLACE = "place";
  static BIRD = "bird";
  static MAMMAL = "mammal";
  static REPTILE = "reptile";
  static AMPHIBIAN = "amphibian";
  static CAMERA = "camera";
  static PHOTO = "photo";
  static VIDEO = "video";
  static ALBUM = "album";
  static TRANSFER = "transfer";
  static UNESCO = "unesco";
  static FISH = "fish";
  static PLACE_FEATURE = "place_feature";
  static PLANE = "plane";
  static TRAIN = "train";
  static CAR = "car";
  static ARTHROPOD = "arthropod";
  static CTENOPHORE = "ctenophore";
  static HELICOPTER = "helicopter";
  static SPACECRAFT = "spacecraft";
  static BOAT = "boat";
  static YEAR = "year";
  static LISTING = "listing";
  static PERSON = "person";
  static GENUS = "genus";
  static FAMILY = "family";
  static ORDER = "order";
}

// Boolean true as stored in published triples.
export const DATA_TRUE = "true";

// Thing-list render modes.
export const THING_LIST_KINDS = {
  PLACE: KnownTypes.PLACE,
  FEATURE: "feature",
  UNESCO: KnownTypes.UNESCO,
  TAXON: "taxon",
} as const;

/*
 * Taxonomic ranks shown as details-table row headings.
 */
export const TAXON_RANKS = [
  { relation: KnownRelations.GENUS, label: "Genus" },
  { relation: KnownRelations.FAMILY, label: "Family" },
  { relation: KnownRelations.ORDER, label: "Order" },
];

// URN types for taxon entities.
export const TAXON_TYPES = new Set<string>([
  KnownTypes.GENUS,
  KnownTypes.FAMILY,
  KnownTypes.ORDER,
]);

/*
 * Display labels for subject URI context qualifiers. Mirror uses multiple terms for same idea.
 */
export const SUBJECT_QUALIFIER_LABELS: Record<string, string> = {
  captive: "captive",
  captivity: "captive",
  museum: "museum",
  unsure: "unsure",
};

// Contexts that need no qualifier chip. Wild is the default.
export const UNQUALIFIED_SUBJECT_CONTEXTS = new Set(["wild"]);

/*
 * Relations that expand to CDN URLs.
 */
export const CDN_RELATIONS = new Set([
  KnownRelations.THUMBNAIL_URL,
  KnownRelations.MID_IMAGE_LOSSY_URL,
  KnownRelations.PREVIEW_JPEG_URL,
  KnownRelations.FULL_IMAGE,
  KnownRelations.POSTER_URL,
  KnownRelations.VIDEO_URL_1080P,
  KnownRelations.VIDEO_URL_480P,
  KnownRelations.VIDEO_URL_720P,
  KnownRelations.VIDEO_URL_UNSCALED,
]);

/*
 * Relationships with inverses. These could move to the Tribble file later.
 */
export const RelationSymmetries = [
  [KnownRelations.IN, KnownRelations.CONTAINS],
  [KnownRelations.CONTAINS_ALBUM, KnownRelations.TRIP],
  [KnownRelations.FEATURES, KnownRelations.PLACES_WITH_FEATURE],
];

// Curies match this pattern
export const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;

// CDN base URL for expanding relative paths in triples.
export const ENDPOINT = "https://photos-cdn.rgrannell.xyz";
