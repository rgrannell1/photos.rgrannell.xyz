/*
 * Presentation config that is not derivable from the published data.
 */

// last year of the "before times": this and older year headings render dimmed
export const BEFORE_TIMES_FINAL_YEAR = 2015;

// virtual listing type for places that carry a country flag
export const COUNTRY_LISTING_TYPE = "country";

/*
 * The listings index is data-driven: mirror publishes one
 * urn:ró:listing:<type> entity per subject type, and the site renders
 * every listing entity it receives. No type registry lives here. Type
 * behaviour (listable, browseable) reads from the listing entities, and
 * feature behaviour (emoji, generic) reads from the place_feature entities.
 */
