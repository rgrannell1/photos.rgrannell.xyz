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
  // the worker template must bust the cache too: a changed worker with an
  // unchanged cache name keeps serving stale entries
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

/*
 * Build Typescript with esbuild
 */
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
    // leaflet is only needed on the map page; the import map in index.html
    // resolves it to the vendored ESM build at runtime
    external: ["leaflet"],
    // bundle against the tribbledb source, matching the deno.json import map
    alias: {
      "@rgrannell1/tribbledb/v2": "../../tribbledb/src/v2/mod.ts",
      "@rgrannell1/tribbledb": "../../tribbledb/src/mod.ts",
    },
  });
}

/*
 * Minify the CSS for inlining into index.html. Inline CSS removes the
 * render-blocking stylesheet request; index.html is never cached, so the
 * inlined copy can not go stale.
 */
export async function buildCSS(): Promise<string> {
  console.info("🌐 Rendering css");

  const result = await esbuild.transform(
    await Deno.readTextFile("css/style.css"),
    { loader: "css" },
  );
  return cssoMinify(result.code).css;
}

/*
 * Combine the per-territory flag SVGs into one symbol sprite, so the client
 * fetches one file and references tiles with <use>. The content hash in the
 * filename busts the immutable /flags/* cache when a flag changes.
 */
export async function buildFlagSprite(): Promise<string> {
  console.info("🌐 Rendering flag sprite");

  const names: string[] = [];
  for await (const entry of Deno.readDir("flags")) {
    if (entry.name.endsWith(".svg") && !entry.name.startsWith("sprite.")) {
      names.push(entry.name);
    }
  }
  names.sort();

  const symbols: string[] = [];
  for (const name of names) {
    const text = await Deno.readTextFile(`flags/${name}`);
    const flagId = name.replace(/\.svg$/, "");
    const match = text.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);
    if (!match) {
      throw new Error(`no viewBox in flags/${name}`);
    }
    symbols.push(`<symbol id="${flagId}" viewBox="${match[1]}">${match[2]}</symbol>`);
  }

  const sprite = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>`;

  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(sprite),
  );
  const hash = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 8);

  for await (const entry of Deno.readDir("flags")) {
    if (entry.name.startsWith("sprite.")) {
      await Deno.remove(`flags/${entry.name}`);
    }
  }

  await Deno.writeTextFile(`flags/sprite.${hash}.svg`, sprite);
  return `/flags/sprite.${hash}.svg`;
}

/*
 * Build HTML
 */
export async function buildHTML(flagSprite: string, css: string) {
  console.info("🌐 Rendering index.html");

  const siteUrl = env.photos_url.replace("photos-cdn.", "photos.");
  const siteHostname = new URL(siteUrl).hostname;

  await Deno.writeTextFile(
    "index.html",
    render(htmlTemplateText, {
      stats: statsText,
      env: envText,
      flagSprite,
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
