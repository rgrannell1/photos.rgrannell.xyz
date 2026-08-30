import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";

import { env, swTemplateText } from "../loaders.ts";
import { minify as cssoMinify } from "npm:csso";

import type { FlagManifest } from "../../types/browser.ts";
import {
  computeSourceHash,
  createServiceWorkerData,
  createVersionContent,
  stringifyTribbles,
  transformCss,
} from "./source.ts";
import {
  clearFlagAssets,
  publishBigFlags,
  publishFlagSprite,
} from "./flags.ts";
import { createFlagManifest, renderHtml } from "./html.ts";

export const buildId = `${env.publication_id}-${await computeSourceHash()}`;

export const buildTime = new Date().toISOString();

const TS_BUILD_OPTIONS: esbuild.BuildOptions = {
  entryPoints: ["ts/index.ts"],
  bundle: true,
  outfile: `dist/js/app.${buildId}.js`,
  format: "esm",
  treeShaking: true,
  sourcemap: true,
  minify: true,
  // Leaflet loads only on the map page. The import map in index.html resolves it.
  external: ["leaflet"],
  // bundle against the tribbledb source, matching the deno.json import map
  alias: {
    "@rgrannell1/tribbledb/v2": "../../tribbledb/src/v2/mod.ts",
    "@rgrannell1/tribbledb": "../../tribbledb/src/mod.ts",
  },
};

export async function buildVersion() {
  console.info("🌐 Rendering version");
  const outputPath = "version";
  const content = createVersionContent();
  await Deno.writeTextFile(outputPath, content);
}

export async function buildExpandedTribbles() {
  console.info("🌐 Rendering expanded tribbles");
  const outputPath = `manifest/tribbles-expanded.${env.publication_id}.txt`;
  const content = stringifyTribbles();
  await Deno.writeTextFile(outputPath, content);
}

export async function buildSW() {
  console.info("🌐 Rendering service-worker");

  // served from the root so the worker's default scope covers every page
  const templateData = createServiceWorkerData();
  const content = render(swTemplateText, templateData);
  await Deno.writeTextFile("sw.js", content);
}

export async function buildTS() {
  console.info("🌐 Rendering app");
  await esbuild.build(TS_BUILD_OPTIONS);
}

/*
 * Minify CSS for inlining. Inline CSS removes a render-blocking request and cannot go stale.
 */
export async function buildCSS(): Promise<string> {
  console.info("🌐 Rendering css");
  const css = await Deno.readTextFile("css/style.css");
  const transformed = await transformCss(css);
  return cssoMinify(transformed).css;
}

export type SpriteMetadata = {
  cellWidth: number;
  cellHeight: number;
  positions: Record<string, number>;
};

export type PublishedSprite = {
  hash: string;
  metadata: SpriteMetadata;
};

export type PublishedBigFlag = {
  id: string;
  url: string;
};

/*
 * Publish vexilla assets with content-hashed names. Hash busts immutable /flags/* cache on changes.
 */
export async function buildFlagAssets(): Promise<FlagManifest> {
  console.info("🌐 Rendering flag assets");
  // Wipe previous hashed outputs to avoid stale files.
  await clearFlagAssets();
  const sprite = await publishFlagSprite();
  const big = await publishBigFlags();
  return createFlagManifest(sprite, big);
}

export async function buildHTML(flags: FlagManifest, css: string) {
  console.info("🌐 Rendering index.html");
  const outputPath = "index.html";
  const content = renderHtml(flags, css);
  await Deno.writeTextFile(outputPath, content);
}
