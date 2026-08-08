/*
 * Hardcoded page-hero banner placeholders.
 *
 * ThumbHash strings (matching mirror's `thumbnail_mosaic` / `mosaic_banner`
 * roles) used as the blur-up pre-render behind the two hardcoded page-hero
 * banners. Album-page banners read their hash from the published triples;
 * these heroes are not album banners, so their hash is inlined here. Update
 * by hand if the source photo is re-encoded.
 */

// the high-res `banner` renditions behind the two page heroes. Update by
// hand if the source photo is re-encoded. Consumed by the components, the
// index.html preload, and the service-worker pre-cache.
export const ALBUMS_BANNER_URL = "https://photos-cdn.rgrannell.xyz/d6cf0f7cc7.webp";
export const ABOUT_BANNER_URL = "https://photos-cdn.rgrannell.xyz/6744c802d1.webp";

// /albums hero — photo:548d64a50a (mirror: 2022/Cranes/Published/79_535.JPG)
export const ALBUMS_BANNER_MOSAIC = "28gFJYIMZnhWeHaBiqd5iHBi6Ppj";

// /about hero — photo:dd378e3a76 (mirror: 2017/Kerry with Friends/Published/P1290572.jpg)
export const ABOUT_BANNER_MOSAIC = "YfgdDIKIeIiPeId4d3d5gLbJ+Q";
