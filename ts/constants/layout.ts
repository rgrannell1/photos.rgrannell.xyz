/*
 * Layout dimensions and breakpoints.
 */

export const SMALL_DEVICE_WIDTH = 500;

export const PHOTO_WIDTH = 400;
export const PHOTO_HEIGHT = 400;

// items rendered per animation-frame batch in media and listing grids
export const RENDER_BATCH_SIZE = 10;

// px below the viewport top at which a year heading becomes the "current" year
export const YEAR_SCROLL_OFFSET = 140;

// max correction passes for a deep-link scroll while lazy images settle
export const YEAR_SCROLL_MAX_PASSES = 20;

// fraction of the scroll distance the banner image moves in the JS parallax fallback
export const PARALLAX_RATE = 0.15;

// the banner image never offsets further than this
export const PARALLAX_MAX_PX = 80;
