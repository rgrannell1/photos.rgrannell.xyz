/* Support builders operations. */

import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { walk } from "jsr:@std/fs";
import {
  findHomepageThumbnails,
  findPrefetchTargets,
  tdb,
} from "../loaders.ts";
import {
  ABOUT_BANNER_URL,
  ALBUMS_BANNER_URL,
} from "../../constants/banners.ts";
import { TribbleStringifier } from "@rgrannell1/tribbledb";
import { buildId, buildTime } from "./builders.ts";

export type ServiceWorkerData = {
  prefetched: string[];
  homepageThumbnails: string;
  buildId: string;
  albumsBanner: string;
  aboutBanner: string;
};

/** Format one digest byte as two lowercase hexadecimal digits. */
export function formatHashByte(byte: number): string {
  return byte.toString(16).padStart(2, "0");
}

/** Convert a binary digest to its eight-character hexadecimal build ID. */
export function formatDigest(digest: ArrayBuffer): string {
  const bytes = Array.from(new Uint8Array(digest));
  const hex = bytes.map(formatHashByte).join("");
  return hex.slice(0, 8);
}

/** Read all TypeScript source text used to derive the build ID. */
export async function readTypeScriptContents(): Promise<string[]> {
  const contents: string[] = [];
  for await (const entry of walk("ts", { exts: [".ts"] })) {
    const content = await Deno.readTextFile(entry.path);
    contents.push(content);
  }
  return contents;
}

/** Read static source text whose changes must invalidate cached assets. */
export async function readStaticSourceContents(): Promise<string[]> {
  const style = await Deno.readTextFile("css/style.css");
  // The worker template must bust cache too. An unchanged name serves stale entries.
  const worker = await Deno.readTextFile("sw.mustache.js");
  return [style, worker];
}

/** Return the shortened SHA-256 digest for source text. */
export async function hashSource(source: string): Promise<string> {
  const encoded = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return formatDigest(digest);
}

/** Compute one build ID from all TypeScript and cache-sensitive static source. */
export async function computeSourceHash(): Promise<string> {
  const typeScriptContents = await readTypeScriptContents();
  const staticContents = await readStaticSourceContents();
  const source = [...typeScriptContents, ...staticContents].join("");
  return hashSource(source);
}

/** Serialise the current build identity as newline-terminated JSON. */
export function createVersionContent(): string {
  const version = { version: buildId, buildTime };
  const metadata = JSON.stringify(version, null, 2);
  return `${metadata}\n`;
}

/** Serialise every database triple as newline-delimited Tribble data. */
export function stringifyTribbles(): string {
  const stringifier = new TribbleStringifier();
  const stringifyTriple = stringifier.stringify.bind(stringifier);
  return tdb.triples().map(stringifyTriple).join("\n");
}

/** Collect template data for the generated service worker. */
export function createServiceWorkerData(): ServiceWorkerData {
  const prefetched = findPrefetchTargets();
  const thumbnails = findHomepageThumbnails();
  const homepageThumbnails = JSON.stringify(thumbnails);
  return {
    prefetched,
    homepageThumbnails,
    buildId,
    albumsBanner: ALBUMS_BANNER_URL,
    aboutBanner: ABOUT_BANNER_URL,
  };
}

/** Compile CSS through esbuild and return the generated code. */
export async function transformCss(css: string): Promise<string> {
  const result = await esbuild.transform(css, { loader: "css" });
  return result.code;
}
