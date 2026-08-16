/*
 * The data-layer vocabulary: relations and types the app queries against the
 * TribbleDB, plus curie expansion and triple-derivation config. The
 * constants-drift test checks this vocabulary against the published triples.
 */

/*
 * Relations queried by name against the TribbleDB. Parsed-object fields are
 * governed by the Valibot schemas instead; only searched relations live here.
 * The constants-drift test checks each value exists in the published data or
 * in its derived-relations allowlist.
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

/*
 * Taxonomic ranks a species links to, with the label shown as the
 * details-table row heading.
 */
export const TAXON_RANKS = [
  { relation: KnownRelations.GENUS, label: "Genus" },
  { relation: KnownRelations.FAMILY, label: "Family" },
  { relation: KnownRelations.ORDER, label: "Order" },
];

// URN types that identify taxon entities
export const TAXON_TYPES = new Set<string>([
  KnownTypes.GENUS,
  KnownTypes.FAMILY,
  KnownTypes.ORDER,
]);

/*
 * Display labels for the ?context= qualifier on a subject URN. Mirror writes
 * both "captive" and "captivity" for the same idea, so both map to one label.
 * A context with no entry here shows uppercased as it is written.
 */
export const SUBJECT_QUALIFIER_LABELS: Record<string, string> = {
  captive: "captive",
  captivity: "captive",
  museum: "museum",
  unsure: "unsure",
};

// contexts that need no qualifier chip; wild is how a subject reads by default
export const UNQUALIFIED_SUBJECT_CONTEXTS = new Set(["wild"]);

/*
 * These relations should all expand to CDN urls
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
 * Some relationships have inverses; store this data here
 * (though it could be passed in band in the Tribble file in future)
 */
export const RelationSymmetries = [
  [KnownRelations.IN, KnownRelations.CONTAINS],
  [KnownRelations.CONTAINS_ALBUM, KnownRelations.TRIP],
  [KnownRelations.FEATURES, KnownRelations.PLACES_WITH_FEATURE],
];

// Curies match this pattern
export const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;

// CDN base URL for expanding relative CDN paths in triples
export const ENDPOINT = "https://photos-cdn.rgrannell.xyz";

