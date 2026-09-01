/*
 * Presentation config that is not derivable from the published data.
 */

// Last year of the "before times". Older headings render dimmed.
export const BEFORE_TIMES_FINAL_YEAR = 2015;

// First year included in the about-page photography total.
export const PHOTOGRAPHY_START_YEAR = 2012;

// Highest Unix timestamp treated as seconds rather than milliseconds.
export const UNIX_TIMESTAMP_SECONDS_MAX = 9_999_999_999;

// Milliseconds in one second.
export const MILLISECONDS_PER_SECOND = 1000;

// Multiplier for the stable trip colour hash.
export const TRIP_HASH_MULTIPLIER = 31;

// Number of trip colour classes defined in the stylesheet.
export const TRIP_COLOUR_COUNT = 2;

// Virtual listing type for country flags.
export const COUNTRY_LISTING_TYPE = "country";

// Fallback text for missing or invalid EXIF fields.
export const UNKNOWN_EXIF_VALUE = "Unknown";

// Life-list route filters.
export enum LifeListFilter {
  Ireland = "ireland",
  Wild = "wild",
  All = "all",
}

// Country-link display modes.
export enum CountryLinkMode {
  Flag = "flag",
  Name = "name",
}

// Media-location display modes.
export enum MediaLocationMode {
  Geographic = "geographic",
  Feature = "feature",
}

// Browser image loading modes.
export enum ImageLoadingMode {
  Eager = "eager",
  Lazy = "lazy",
}

export type ImageLoading = `${ImageLoadingMode}`;

// Browser video preload modes.
export enum VideoPreloadMode {
  None = "none",
  Metadata = "metadata",
  Auto = "auto",
}

export type VideoPreload = `${VideoPreloadMode}`;

/*
 * Listings are data-driven from mirror: no type registry here.
 */
