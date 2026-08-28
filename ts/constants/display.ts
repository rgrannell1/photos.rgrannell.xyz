/*
 * Presentation config that is not derivable from the published data.
 */

// Last year of the "before times". Older headings render dimmed.
export const BEFORE_TIMES_FINAL_YEAR = 2015;

// Virtual listing type for country flags.
export const COUNTRY_LISTING_TYPE = "country";

// Fallback text for missing or invalid EXIF fields.
export const UNKNOWN_EXIF_VALUE = "Unknown";

// Life-list route filters.
export const LIFE_LIST_FILTERS = {
  IRELAND: "ireland",
  WILD: "wild",
  ALL: "all",
} as const;

// Country-link display modes.
export const COUNTRY_LINK_MODES = {
  FLAG: "flag",
  NAME: "name",
} as const;

// Media-location display modes.
export const MEDIA_LOCATION_MODES = {
  GEOGRAPHIC: "geographic",
  FEATURE: "feature",
} as const;

/*
 * Listings are data-driven from mirror: no type registry here.
 */
