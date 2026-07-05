export const SMALL_DEVICE_WIDTH = 500;

export const PHOTO_WIDTH = 400;
export const PHOTO_HEIGHT = 400;

/*
 * 10×10 `mosaic_banner` renditions (from mirror's encoded_photos) used as the
 * higher-resolution blur-up pre-render behind the two hardcoded page-hero
 * banners. Album-page banners read their mosaic from the published triples;
 * these heroes are not album banners, so their mosaic is inlined here. Update
 * by hand if the source photo is re-encoded.
 */
export const BANNER_MOSAIC_DIMENSION = 10;

// /albums hero — photo:548d64a50a (mirror: 2022/Cranes/Published/79_535.JPG)
export const ALBUMS_BANNER_MOSAIC =
  "#586976#586C7D#6C7E87#5D7772#476A57#507251#5E7A5D#667C71#5A6E61#546556#54646A#576C78#667782#627677#496656#52714A#68834F#6A8261#657953#657147#486169#526B75#5F717C#627875#607A60#6E8B57#769354#779650#6F844E#74814A#5B7771#5F7A7E#70878A#708E70#7B8D74#859861#799A67#819E4D#838C4C#768548#627C7E#7A9278#8AA195#8CA994#87A094#82A28F#7BA38E#7D9B5C#74874A#708B3B#708281#809C7D#8EAA8A#9BB094#98A48E#8BA184#809F70#7F9F57#74934A#6D8C33#83927C#7D9B82#819D74#8EA689#97AC92#91A273#809A57#799A4B#789658#6F8F3B#8E9C7E#819C76#749772#829F8A#90A78A#8DA668#7A9643#6A8E35#658943#648931#75865E#6E8D55#718E53#78916D#819A71#7B9C47#6B8E30#5F8436#5F8339#557D21#66814A#6B894B#789256#7F9459#718949#6C9232#658B24#608037#5B7C33#457220";

// /about hero — photo:dd378e3a76 (mirror: 2017/Kerry with Friends/Published/P1290572.jpg)
export const ABOUT_BANNER_MOSAIC =
  "#FEFEFE#FFFFFE#FFFFFF#FEFEFE#F6F6F5#EDEEED#ECEDEC#EEEFEE#F2F3F3#F0F2F2#EDEEED#F1F1F0#F4F4F2#F0F0EF#E9EAE9#E2E4E3#DADDDD#D7DBDB#D7DBDC#D7DBDD#D2D4D2#D3D6D4#D3D5D3#D3D6D4#D1D5D4#CDD2D1#CBD0D0#DBDEDD#E0E2E1#DFE2E0#C0C4BE#BEC2BD#B5BAB6#ACB4AE#A1ACA6#99A6A2#97A5A3#9EABA9#A2AEAC#A5B1AF#AEB3A7#A7ADA1#A0A799#96A090#899481#83907D#879280#919985#949C8C#909B8F#7A8166#6F7A5F#67775A#5C6F52#57674C#576449#646C4C#7C8155#85895F#7F8662#4D5841#4C5840#495640#41503D#444E3D#3E4F38#425238#465338#444F39#4A553B#373F2D#353D2D#353E2E#36402F#333E2E#374330#374230#39412D#353C29#313A27#262A16#252917#252A17#272C19#282C1A#292F1A#292F19#272E18#232B16#222916#1A1F08#1A1E08#1A1E07#191D06#191E07#1A1E07#1A1E07#1A1E08#1B1E08#1B1F09";

export class KnownRelations {
  static ALBUM_ID = "albumId";
  static SUBJECT = "subject";
  static LOCATION = "location";
  static LONGITUDE = "longitude";
  static LATITUDE = "latitude";
  static COUNTRY = "country";
  static FLAG = "flag";
  static RATING = "rating";
  static NAME = "name";
  static BIRDWATCH_URL = "birdwatchUrl";
  static FIRST_SEEN = "firstSeen";
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
  static STYLE = "style";
  static ALBUM_BANNER = "albumBanner";
  static MOSAIC_BANNER = "mosaicBanner";
  // horrible
  static FLAGS = "flags";

  static CENTRAL_PLACE = "centralPlace";
  static CONTAINS_ALBUM = "containsAlbum";
  static TRIP = "trip";
  static TRANSFERS = "transfers";
  static SOURCE = "source";
  static DESTINATION = "destination";
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

/*
 * Place-type features too generic to surface in the "Place Type" row — every
 * photo is in some country and continent, so these add no information. Their
 * concrete places still show in the location row.
 */
export const HiddenPlaceFeatures = new Set<string>([
  "country",
  "continent",
]);

/*
 * It does make sense to say "show every place photo",
 * so designate some types as non-listable on the Listing page
 */
export const NonListableTypes = new Set([
  KnownTypes.CAMERA,
  KnownTypes.PLACE,
  KnownTypes.PLACE_FEATURE,
]);

/*
 * A few words have irregular plurals; store them here.
 */
export const PLURALS = new Map<string, string>([
  ["place_feature", "Place Features"],
]);

/*
 * Renamed relations mapping
 */
export const RENAMED_RELATIONS = new Map<string, string>([]);

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

export const SCROLL_HIDE_THRESHOLD = 200;

/*
 * Places have features, use these features to pick an emoji to represent the place
 */
export const PLACE_FEATURES_TO_EMOJI = {
  aquarium: "🐠",
  aquaduct: "🏛️",
  archaeological: "🏺",
  beach: "🏖️",
  bridge: "🌉",
  canal: "🚤",
  castle: "🏰",
  church: "⛪",
  cathedral: "⛪",
  continent: "🌍",
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
  monastery: "🏯",
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

export const BinomialTypes = new Set([
  KnownTypes.BIRD,
  KnownTypes.MAMMAL,
  KnownTypes.REPTILE,
  KnownTypes.AMPHIBIAN,
  KnownTypes.FISH,
  KnownTypes.INSECT,
]);
