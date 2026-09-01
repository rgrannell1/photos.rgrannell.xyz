/*
 * Data-layer vocabulary: relations, types, and curie config. Checked by constants-drift test.
 */

/*
 * Relations queried by name (not parsed-object fields). Checked against published data.
 */
export enum KnownRelations {
  ALBUM_ID = "albumId",
  SUBJECT = "subject",
  LOCATION = "location",
  COVER = "cover",
  STATUS = "status",
  NEMESIS = "nemesis",
  FLAG = "flag",
  NAME = "name",
  BIRDWATCH_URL = "birdwatchUrl",
  IRISH = "irish",
  FIRST_SEEN = "firstSeen",
  CREATED_AT = "createdAt",
  THUMBNAIL_URL = "thumbnailUrl",
  MID_IMAGE_LOSSY_URL = "midImageLossyUrl",
  PREVIEW_JPEG_URL = "previewJpegUrl",
  FULL_IMAGE = "fullImage",
  POSTER_URL = "posterUrl",
  VIDEO_URL_1080P = "videoUrl1080p",
  VIDEO_URL_480P = "videoUrl480p",
  VIDEO_URL_720P = "videoUrl720p",
  VIDEO_URL_UNSCALED = "videoUrlUnscaled",
  YEAR = "year",
  RECAP = "recap",
  CONTAINS = "contains",
  IN = "in",
  MOSAIC_BANNER = "mosaicBanner",
  CONTAINS_ALBUM = "containsAlbum",
  TRIP = "trip",
  TITLE = "title",
  FEATURES = "features",
  PLACES_WITH_FEATURE = "placesWithFeature",
  CURIE = "curie",
  GENUS = "genus",
  FAMILY = "family",
  ORDER = "order",
}

export enum KnownTypes {
  PLACE = "place",
  BIRD = "bird",
  MAMMAL = "mammal",
  REPTILE = "reptile",
  AMPHIBIAN = "amphibian",
  CAMERA = "camera",
  PHOTO = "photo",
  VIDEO = "video",
  ALBUM = "album",
  TRANSFER = "transfer",
  UNESCO = "unesco",
  FISH = "fish",
  PLACE_FEATURE = "place_feature",
  PLANE = "plane",
  TRAIN = "train",
  CAR = "car",
  ARTHROPOD = "arthropod",
  CTENOPHORE = "ctenophore",
  HELICOPTER = "helicopter",
  SPACECRAFT = "spacecraft",
  BOAT = "boat",
  YEAR = "year",
  LISTING = "listing",
  PERSON = "person",
  GENUS = "genus",
  FAMILY = "family",
  ORDER = "order",
}

// Boolean true as stored in published triples.
export const DATA_TRUE = "true";

// Thing-list render modes.
export enum ThingListKind {
  PLACE = KnownTypes.PLACE,
  FEATURE = "feature",
  UNESCO = KnownTypes.UNESCO,
  TAXON = "taxon",
}

// Known subject URI context qualifiers.
export enum SubjectContext {
  Wild = "wild",
  Captive = "captive",
  Captivity = "captivity",
  Museum = "museum",
  Unsure = "unsure",
}

// Known wildlife rarity statuses.
export enum SpeciesStatus {
  Regular = "regular",
  Scarce = "scarce",
  Rare = "rare",
  Vagrant = "vagrant",
}

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
  [SubjectContext.Captive]: "captive",
  [SubjectContext.Captivity]: "captive",
  [SubjectContext.Museum]: "museum",
  [SubjectContext.Unsure]: "unsure",
};

// Contexts that need no qualifier chip. Wild is the default.
export const UNQUALIFIED_SUBJECT_CONTEXTS = new Set<string>([
  SubjectContext.Wild,
]);

/*
 * Relations that expand to CDN URLs.
 */
export const CDN_RELATIONS = new Set<string>([
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

// Triples parsed before the stream yields one batch.
export const TRIBBLE_STREAM_BATCH_SIZE = 500;

// Maximum supported nesting depth for a location path.
export const LOCATION_PATH_MAX_DEPTH = 5;
