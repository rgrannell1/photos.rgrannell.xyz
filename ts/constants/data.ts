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
  static FEATURES = "features";
  static PLACES_WITH_FEATURE = "placesWithFeature";
}

export class KnownTypes {
  static PLACE = "place";
  static BIRD = "bird";
  static MAMMAL = "mammal";
  static REPTILE = "reptile";
  static AMPHIBIAN = "amphibian";
  static INSECT = "insect";
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
}

/*
 * Browseable "thing" entity types — wildlife, vehicles, places. Entities of
 * these types with no photo or video reference (directly or transitively) are
 * pruned at load, so they never surface anywhere in the app: no map markers,
 * listing cards, thing links, located-in chains, or thing pages. Infrastructure
 * types (photo, video, album, camera, geoname, transfer, rating, style, trip,
 * unesco) are never pruned.
 */
export const PrunableEntityTypes = new Set<string>([
  KnownTypes.PLACE,
  KnownTypes.PLACE_FEATURE,
  KnownTypes.BIRD,
  KnownTypes.MAMMAL,
  KnownTypes.REPTILE,
  KnownTypes.AMPHIBIAN,
  KnownTypes.FISH,
  KnownTypes.INSECT,
  KnownTypes.ARTHROPOD,
  KnownTypes.CTENOPHORE,
  KnownTypes.PLANE,
  KnownTypes.TRAIN,
  KnownTypes.CAR,
  KnownTypes.HELICOPTER,
  KnownTypes.SPACECRAFT,
  KnownTypes.BOAT,
]);

// species types displayed with binomial names and "seen in" listings
export const BinomialTypes = new Set([
  KnownTypes.BIRD,
  KnownTypes.MAMMAL,
  KnownTypes.REPTILE,
  KnownTypes.AMPHIBIAN,
  KnownTypes.FISH,
  KnownTypes.INSECT,
]);

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

// CDN base URL for expanding relative CDN paths in triples
export const ENDPOINT = "https://photos-cdn.rgrannell.xyz";

/*
 * A list of cameras I've taken photos on
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
 */
export const PHONE_MODELS = new Set([
  "pixel-4a",
  "pixel-7-pro",
  "pixel-9a",
  "sm-a520f",
]);
