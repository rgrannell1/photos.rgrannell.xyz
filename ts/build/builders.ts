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
import { TribbleStringifier } from "@rgrannell1/tribbledb";

async function computeSourceHash(): Promise<string> {
  const contents: string[] = [];

  for await (const entry of walk("ts", { exts: [".ts"] })) {
    contents.push(await Deno.readTextFile(entry.path));
  }
  contents.push(await Deno.readTextFile("css/style.css"));

  const encoded = new TextEncoder().encode(contents.join(""));
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 8);
}

const buildId = `${env.publication_id}-${await computeSourceHash()}`;

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

  await Deno.writeTextFile(
    `dist/js/sw.${buildId}.js`,
    render(swTemplateText, {
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(findHomepageThumbnails()),
      buildId,
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
  });
}

/*
 * Build CSS with esbuild
 */
export async function buildCSS() {
  console.info("🌐 Rendering css");

  const result = await esbuild.transform(
    await Deno.readTextFile(`css/style.css`),
    { loader: "css" },
  );
  const minified = cssoMinify(result.code).css;

  await Deno.writeTextFile(
    `dist/css/style.${buildId}.css`,
    minified,
  );
}

/*
 * Build HTML
 */
export async function buildHTML() {
  console.info("🌐 Rendering index.html");

  const siteUrl = env.photos_url.replace("photos-cdn.", "photos.");
  const siteHostname = new URL(siteUrl).hostname;

  await Deno.writeTextFile(
    "index.html",
    render(htmlTemplateText, {
      stats: statsText,
      env: envText,
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(
        findHomepageThumbnails().map((url) => url.replace(/\.webp$/, "")),
      ),
      cdnUrl: env.photos_url,
      buildId,
      publicationId: env.publication_id,
      siteUrl,
      siteHostname,
    }),
  );
}
