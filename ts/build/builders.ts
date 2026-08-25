import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";
import { walk } from "jsr:@std/fs";
import {
  env,
  envText,
  findHomepageThumbnails,
  findPrefetchTargets,
  htmlTemplateText,
  statsText,
  swTemplateText,
  tdb,
} from "./loaders.ts";
import { minify as cssoMinify } from "npm:csso";
import { ABOUT_BANNER_URL, ALBUMS_BANNER_URL } from "../constants/banners.ts";
import { TribbleStringifier } from "@rgrannell1/tribbledb";

async function computeSourceHash(): Promise<string> {
  const contents: string[] = [];

  for await (const entry of walk("ts", { exts: [".ts"] })) {
    contents.push(await Deno.readTextFile(entry.path));
  }
  contents.push(await Deno.readTextFile("css/style.css"));
  // The worker template must bust cache too. An unchanged name serves stale entries.
  contents.push(await Deno.readTextFile("sw.mustache.js"));

  const encoded = new TextEncoder().encode(contents.join(""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 8);
}

const buildId = `${env.publication_id}-${await computeSourceHash()}`;
const buildTime = new Date().toISOString();

export async function buildVersion() {
  console.info("🌐 Rendering version");

  const metadata = JSON.stringify({ version: buildId, buildTime }, null, 2);
  await Deno.writeTextFile("version", `${metadata}\n`);
}

export async function buildExpandedTribbles() {
  console.info("🌐 Rendering expanded tribbles");

  const tribble = new TribbleStringifier();

  const content = tdb.triples().map((triple) => {
    return tribble.stringify(triple);
  }).join("\n");

  await Deno.writeTextFile(
    `manifest/tribbles-expanded.${env.publication_id}.txt`,
    content,
  );
}

export async function buildSW() {
  console.info("🌐 Rendering service-worker");

  // served from the root so the worker's default scope covers every page
  await Deno.writeTextFile(
    "sw.js",
    render(swTemplateText, {
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(findHomepageThumbnails()),
      buildId,
      albumsBanner: ALBUMS_BANNER_URL,
      aboutBanner: ABOUT_BANNER_URL,
    }),
  );
}

export async function buildTS() {
  console.info("🌐 Rendering app");

  await esbuild.build({
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
  });
}

/*
 * Minify CSS for inlining. Inline CSS removes a render-blocking request and cannot go stale.
 */
export async function buildCSS(): Promise<string> {
  console.info("🌐 Rendering css");

  const result = await esbuild.transform(
    await Deno.readTextFile("css/style.css"),
    { loader: "css" },
  );
  return cssoMinify(result.code).css;
}

export type FlagManifest = {
  sprite: string;
  cellWidth: number;
  cellHeight: number;
  count: number;
  positions: Record<string, number>;
  big: Record<string, string>;
};

async function hashBytes(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 8);
}

/*
 * Publish vexilla assets with content-hashed names. Hash busts immutable /flags/* cache on changes.
 */
export async function buildFlagAssets(): Promise<FlagManifest> {
  console.info("🌐 Rendering flag assets");

  // Wipe previous hashed outputs to avoid stale files.
  for await (const entry of Deno.readDir("flags")) {
    const isGeneratedSprite = entry.isFile && entry.name.startsWith("sprite.");
    if (isGeneratedSprite) {
      await Deno.remove(`flags/${entry.name}`);
    }
  }
  await Deno.remove("flags/big", { recursive: true }).catch(() => {});
  await Deno.mkdir("flags/big", { recursive: true });

  const spriteBytes = await Deno.readFile("flags/vendor/sprite.avif");
  const spriteHash = await hashBytes(spriteBytes);
  await Deno.writeFile(`flags/sprite.${spriteHash}.avif`, spriteBytes);

  const spriteMeta = JSON.parse(
    await Deno.readTextFile("flags/vendor/sprite.json"),
  );

  const big: Record<string, string> = {};
  for await (const entry of Deno.readDir("flags/vendor/big")) {
    if (!entry.name.endsWith(".svg")) {
      continue;
    }
    const flagId = entry.name.replace(/\.svg$/, "");
    const bytes = await Deno.readFile(`flags/vendor/big/${entry.name}`);
    const hash = await hashBytes(bytes);
    await Deno.writeFile(`flags/big/${flagId}.${hash}.svg`, bytes);
    big[flagId] = `/flags/big/${flagId}.${hash}.svg`;
  }

  return {
    sprite: `/flags/sprite.${spriteHash}.avif`,
    cellWidth: spriteMeta.cellWidth,
    cellHeight: spriteMeta.cellHeight,
    count: Object.keys(spriteMeta.positions).length,
    positions: spriteMeta.positions,
    big,
  };
}

export async function buildHTML(flags: FlagManifest, css: string) {
  console.info("🌐 Rendering index.html");

  const siteUrl = env.photos_url.replace("photos-cdn.", "photos.");
  const siteHostname = new URL(siteUrl).hostname;

  await Deno.writeTextFile(
    "index.html",
    render(htmlTemplateText, {
      stats: statsText,
      env: envText,
      flags: JSON.stringify(flags),
      flagSprite: flags.sprite,
      css,
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(
        findHomepageThumbnails().map((url) => url.replace(/\.webp$/, "")),
      ),
      cdnUrl: env.photos_url,
      buildId,
      albumsBanner: ALBUMS_BANNER_URL,
      publicationId: env.publication_id,
      siteUrl,
      siteHostname,
    }),
  );
}
