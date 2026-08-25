import * as path from "jsr:@std/path";
import { deriveTriples, postIndexing } from "../semantic/derive.ts";
import { loadTriples } from "../semantic/data.ts";
import { readAllAlbums } from "../services/albums.ts";
import { HOMEPAGE_PRELOAD_COUNT } from "../constants/layout.ts";
import { isNone, type Maybe, NONE } from "../commons/maybe.ts";

async function findFile(
  prefix: string,
  dpath: string,
): Promise<Maybe<string>> {
  for await (const dirEntry of Deno.readDir(dpath)) {
    if (dirEntry.name.startsWith(`${prefix}.`)) {
      return path.join(dpath, dirEntry.name);
    }
  }

  return NONE;
}

async function findFileUrl(
  prefix: string,
  dpath: string,
): Promise<Maybe<string>> {
  const filePath = await findFile(prefix, dpath);
  if (!isNone(filePath)) {
    return (new URL(`file://${filePath}`)).href;
  }

  return NONE;
}

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

export async function loadTribbles() {
  if (isNone(tribblesFile)) {
    throw new Error("No tribbles file found");
  }
  const tdb = await loadTriples(tribblesFile, {}, deriveTriples);
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

export function findPrefetchTargets() {
  const albums = readAllAlbums(tdb);
  return albums.slice(0, HOMEPAGE_PRELOAD_COUNT).map((album) => album.thumbnailUrl);
}

export function findHomepageThumbnails() {
  return readAllAlbums(tdb).map((album) => {
    return new URL(album.thumbnailUrl).pathname;
  });
}
