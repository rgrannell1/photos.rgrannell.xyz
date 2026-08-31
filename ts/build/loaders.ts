import * as path from "jsr:@std/path";
import { createTripleDeriver, postIndexing } from "../semantic/derive/mod.ts";
import { loadTriples } from "../semantic/data.ts";
import { readAllAlbums } from "../services/data/albums/albums.ts";
import { HOMEPAGE_PRELOAD_COUNT } from "../constants/layout.ts";
import { isNone, type Maybe, NONE } from "../commons/collections/maybe.ts";

/** Tests whether a manifest entry has the requested name before its extension. */
function hasFilePrefix(entryName: string, prefix: string): boolean {
  const filePrefix = `${prefix}.`;
  return entryName.startsWith(filePrefix);
}

/** Resolves a manifest entry name within its containing directory. */
function joinFilePath(dpath: string, entryName: string): string {
  return path.join(dpath, entryName);
}

/** Returns the first directory entry with the requested prefix, or NONE. */
async function findFile(
  prefix: string,
  dpath: string,
): Promise<Maybe<string>> {
  const entries = Deno.readDir(dpath);
  for await (const dirEntry of entries) {
    const matchesPrefix = hasFilePrefix(dirEntry.name, prefix);
    if (matchesPrefix) {
      return joinFilePath(dpath, dirEntry.name);
    }
  }

  return NONE;
}

/** Returns a file URL for the first matching directory entry, or NONE. */
async function findFileUrl(
  prefix: string,
  dpath: string,
): Promise<Maybe<string>> {
  const filePath = await findFile(prefix, dpath);
  if (!isNone(filePath)) {
    const fileUrl = new URL(`file://${filePath}`);
    return fileUrl.href;
  }

  return NONE;
}

/** Unwraps a required file path and reports its label when absent. */
function requireFile(filePath: Maybe<string>, label: string): string {
  if (isNone(filePath)) throw new Error(`No ${label} file found`);
  return filePath;
}

const MANIFEST_DIR = path.resolve("./manifest");
export const [
  envFile,
  statsFile,
  tribblesFile,
] = await Promise.all([
  findFile("env", MANIFEST_DIR),
  findFile("stats", MANIFEST_DIR),
  findFileUrl("tribbles", MANIFEST_DIR),
]);

/** Loads, derives, and indexes the build-time triple database. */
export async function loadTribbles() {
  if (isNone(tribblesFile)) {
    throw new Error("No tribbles file found");
  }
  const tripleDeriver = createTripleDeriver();
  const tdb = await loadTriples(tribblesFile, {}, tripleDeriver);
  postIndexing(tdb);
  return tdb;
}

export const tdb = await loadTribbles();
export const [
  envText,
  statsText,
  htmlTemplateText,
  swTemplateText,
] = await Promise.all([
  Deno.readTextFile(requireFile(envFile, "environment")),
  Deno.readTextFile(requireFile(statsFile, "stats")),
  Deno.readTextFile("index.mustache.html"),
  Deno.readTextFile("sw.mustache.js"),
]);

export const env = JSON.parse(envText);

/** Returns an album thumbnail URL for list mapping. */
function readThumbnailUrl(album: { thumbnailUrl: string }): string {
  return album.thumbnailUrl;
}

/** Converts an album thumbnail URL to its request path. */
function readThumbnailPath(album: { thumbnailUrl: string }): string {
  return new URL(album.thumbnailUrl).pathname;
}

/** Returns thumbnail URLs for albums preloaded on the home page. */
export function findPrefetchTargets() {
  const albums = readAllAlbums(tdb);
  const homepageAlbums = albums.slice(0, HOMEPAGE_PRELOAD_COUNT);
  return homepageAlbums.map(readThumbnailUrl);
}

/** Returns request paths for every album thumbnail used by the home page. */
export function findHomepageThumbnails() {
  const albums = readAllAlbums(tdb);
  return albums.map(readThumbnailPath);
}
