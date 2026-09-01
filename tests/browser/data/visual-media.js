// Fixed media responses for visual tests.

"use strict";

// Match every media request sent to the photo CDN.
const PHOTO_CDN_PATTERN = "https://photos-cdn.rgrannell.xyz/**";

// Cover the primary desktop and narrow mobile layouts.
const VISUAL_VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Replace remote photos with fixed local pixels.
const FIXED_BANNER = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"',
  ' viewBox="0 0 1200 400">',
  '<defs><linearGradient id="background" x2="1" y2="1">',
  '<stop stop-color="#16232b"/><stop offset="1" stop-color="#6f806d"/>',
  "</linearGradient></defs>",
  '<rect width="1200" height="400" fill="url(#background)"/>',
  '<circle cx="920" cy="130" r="70" fill="#d3b66d" opacity="0.75"/>',
  '<path d="M0 330 Q300 230 600 320 T1200 280 V400 H0Z" fill="#263d37"/>',
  "</svg>",
].join("");

module.exports = { FIXED_BANNER, PHOTO_CDN_PATTERN, VISUAL_VIEWPORTS };
