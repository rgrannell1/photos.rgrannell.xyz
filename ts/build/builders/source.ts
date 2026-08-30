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

export function formatHashByte(byte: number): string {
  return byte.toString(16).padStart(2, "0");
}

export function formatDigest(digest: ArrayBuffer): string {
  const bytes = Array.from(new Uint8Array(digest));
  const hex = bytes.map(formatHashByte).join("");
  return hex.slice(0, 8);
}

export async function readTypeScriptContents(): Promise<string[]> {
  const contents: string[] = [];
  for await (const entry of walk("ts", { exts: [".ts"] })) {
    const content = await Deno.readTextFile(entry.path);
    contents.push(content);
  }
  return contents;
}

export async function readStaticSourceContents(): Promise<string[]> {
  const style = await Deno.readTextFile("css/style.css");
  // The worker template must bust cache too. An unchanged name serves stale entries.
  const worker = await Deno.readTextFile("sw.mustache.js");
  return [style, worker];
}

export async function hashSource(source: string): Promise<string> {
  const encoded = new TextEncoder().encode(source);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return formatDigest(digest);
}

export async function computeSourceHash(): Promise<string> {
  const typeScriptContents = await readTypeScriptContents();
  const staticContents = await readStaticSourceContents();
  const source = [...typeScriptContents, ...staticContents].join("");
  return hashSource(source);
}

export function createVersionContent(): string {
  const version = { version: buildId, buildTime };
  const metadata = JSON.stringify(version, null, 2);
  return `${metadata}\n`;
}

export function stringifyTribbles(): string {
  const stringifier = new TribbleStringifier();
  const stringifyTriple = stringifier.stringify.bind(stringifier);
  return tdb.triples().map(stringifyTriple).join("\n");
}

export function createServiceWorkerData() {
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

export async function transformCss(css: string): Promise<string> {
  const result = await esbuild.transform(css, { loader: "css" });
  return result.code;
}
