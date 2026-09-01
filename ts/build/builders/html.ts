/* Support builders operations. */

/* Support builders operations. */
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";
import {
  env,
  envText,
  findHomepageThumbnails,
  findPrefetchTargets,
  htmlTemplateText,
  statsText,
} from "../loaders.ts";
import { ALBUMS_BANNER_URL } from "../../constants/banners.ts";
import type { FlagManifest } from "../../types/browser.ts";
import type { PublishedSprite } from "./builders.ts";
import { buildId } from "./builders.ts";

export type HtmlSourceData = {
  stats: string;
  env: string;
  flags: string;
  flagSprite: string;
  css: string;
};

export type HtmlAssetData = {
  prefetched: string[];
  homepageThumbnails: string;
  cdnUrl: string;
  buildId: string;
  albumsBanner: string;
};

export type HtmlSiteData = {
  publicationId: string;
  siteUrl: string;
  siteHostname: string;
};

/** Build the browser flag manifest from a published sprite. */
export function createFlagManifest(
  sprite: PublishedSprite,
  big: Record<string, string>,
): FlagManifest {
  const positions = sprite.metadata.positions;
  const count = Object.keys(positions).length;
  return {
    sprite: `/flags/sprite.${sprite.hash}.avif`,
    cellWidth: sprite.metadata.cellWidth,
    cellHeight: sprite.metadata.cellHeight,
    count,
    positions,
    big,
  };
}

/** Remove a terminal WebP extension from an asset URL. */
export function stripWebpExtension(url: string): string {
  return url.replace(/\.webp$/, "");
}

/** Build template data sourced from generated files and styles. */
export function createHtmlSourceData(
  flags: FlagManifest,
  css: string,
): HtmlSourceData {
  return {
    stats: statsText,
    env: envText,
    flags: JSON.stringify(flags),
    flagSprite: flags.sprite,
    css,
  };
}

/** Build template data for deployed assets and cache identifiers. */
export function createHtmlAssetData(): HtmlAssetData {
  const thumbnails = findHomepageThumbnails().map(stripWebpExtension);
  const prefetched = findPrefetchTargets();
  return {
    prefetched,
    homepageThumbnails: JSON.stringify(thumbnails),
    cdnUrl: env.photos_url,
    buildId,
    albumsBanner: ALBUMS_BANNER_URL,
  };
}

/** Build template data that identifies the published site. */
export function createHtmlSiteData(): HtmlSiteData {
  const siteUrl = env.photos_url.replace("photos-cdn.", "photos.");
  const siteHostname = new URL(siteUrl).hostname;
  return {
    publicationId: env.publication_id,
    siteUrl,
    siteHostname,
  };
}

/** Render the site HTML with source, asset, and publication data. */
export function renderHtml(flags: FlagManifest, css: string): string {
  const sourceData = createHtmlSourceData(flags, css);
  const assetData = createHtmlAssetData();
  const siteData = createHtmlSiteData();
  const templateData = { ...sourceData, ...assetData, ...siteData };
  return render(htmlTemplateText, templateData);
}
