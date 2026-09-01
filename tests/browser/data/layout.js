// Route and viewport data for layout properties.

"use strict";

const { VIDEO_ONLY_THING } = require("./things");

// Cover the supported narrow range in regular 20-pixel steps.
const MOBILE_WIDTHS = Array.from({ length: 13 }, (_unused, idx) => 260 + idx * 20);

// Straddle responsive breakpoints and include representative desktop widths.
const OVERFLOW_WIDTHS = [...MOBILE_WIDTHS, 767, 768, 769, 1024, 1280];

// Exercise every primary content layout that can wrap or resize.
const OVERFLOW_CASES = [
  {
    name: "life list",
    route: "/?bust=layout#!/life-list",
    ready: ".checklist-grid",
    cards: ".checklist-card",
  },
  {
    name: "bird listing",
    route: "/?bust=layout#!/listing/bird",
    ready: '[data-testid="listing-cards"] .photo-album',
    cards: '[data-testid="listing-cards"] .photo-album',
  },
  {
    name: "listings",
    route: "/?bust=layout#!/listings",
    ready: '[data-testid="listings-grid"] .photo-album',
    cards: '[data-testid="listings-grid"] .photo-album',
  },
  {
    name: "albums",
    route: "/?bust=overflow#!/albums",
    ready: '[data-testid="album-row"]',
    cards: '[data-testid="album-row"]',
  },
  {
    name: "photos",
    route: "/?bust=overflow#!/photos",
    ready: "main h1",
    cards: ".photo",
  },
  {
    name: "videos",
    route: "/?bust=overflow#!/videos",
    ready: ".video-container video",
    cards: ".video-container video",
  },
  {
    name: "About",
    route: "/?bust=overflow#!/about",
    ready: ".about-page",
    cards: ".album-banner, .about-page",
  },
  {
    name: "video-only thing",
    route: VIDEO_ONLY_THING.route,
    ready: VIDEO_ONLY_THING.ready,
    cards: ".thing-page video, .thing-page table",
  },
];

module.exports = { MOBILE_WIDTHS, OVERFLOW_CASES, OVERFLOW_WIDTHS };
