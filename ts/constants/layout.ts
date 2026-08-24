/*
 * Layout dimensions and breakpoints.
 */

export const SMALL_DEVICE_WIDTH = 500;

export const PHOTO_WIDTH = 400;
export const PHOTO_HEIGHT = 400;

// Album thumbnails preloaded for the first visible desktop row.
export const HOMEPAGE_PRELOAD_COUNT = 4;

// Items rendered per animation-frame batch in media and listing grids.
export const RENDER_BATCH_SIZE = 10;

// Pixels below viewport top where year heading becomes current.
export const YEAR_SCROLL_OFFSET = 140;

// Max correction passes for deep-link scroll during lazy-image loads.
export const YEAR_SCROLL_MAX_PASSES = 20;

// Fraction of scroll distance the banner moves in parallax fallback.
export const PARALLAX_RATE = 0.15;

// Banner image offset limit in parallax fallback.
export const PARALLAX_MAX_PX = 80;
