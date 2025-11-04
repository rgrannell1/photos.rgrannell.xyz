
import * as path from "jsr:@std/path";
import { deriveTriples } from "../semantic/derive.ts";
import { loadTriples } from "../semantic/data.ts";
import { readAlbums } from "../services/albums.ts";

async function findFile(
  prefix: string,
  dpath: string,
): Promise<string | undefined> {
  for await (const dirEntry of Deno.readDir(dpath)) {
    if (dirEntry.name.startsWith(`${prefix}.`)) {
      return path.join(dpath, dirEntry.name);
    }
  }

  return undefined;
}

async function findFileUrl(
  prefix: string,
  dpath: string,
): Promise<URL | undefined> {
  const filePath = await findFile(prefix, dpath);
  if (filePath) {
    return (new URL(`file://${filePath}`)).href;
  }

  return undefined;
}

const MANIFEST_DIR = path.resolve("./manifest");
export const [
  envFile,
  statsFile,
  triplesFile,
  tribblesFile,
] = await Promise.all([
  findFile("env", MANIFEST_DIR),
  findFile("stats", MANIFEST_DIR),
  findFile("triples", MANIFEST_DIR),
  findFileUrl("tribbles", MANIFEST_DIR),
]);

export async function loadTribbles() {
  return loadTriples(tribblesFile, {}, deriveTriples);
}

export const tdb = await loadTribbles();
export const [
  envText,
  triplesText,
  statsText,
  htmlTemplateText,
  swTemplateText,
] = await Promise.all([
  Deno.readTextFile(envFile!),
  Deno.readTextFile(triplesFile!),
  Deno.readTextFile(statsFile!),
  Deno.readTextFile("index_fork.mustache.html"),
  Deno.readTextFile("sw_fork.mustache.js"),
]);

export const env = JSON.parse(envText);
export const stats = JSON.parse(statsText);

export function findPrefetchTargets() {
  const albums = readAlbums(tdb);
  return albums.slice(0, 12).map(album => album.thumbnailUrl);
}

export function findHomepageThumbnails() {
  return readAlbums(tdb).map(album => {
    return new URL(album.thumbnailUrl).pathname
  });
}
