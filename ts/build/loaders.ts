import type { TribbleDB } from "@rgrannell1/tribbledb";
import * as path from "jsr:@std/path";

async function findFile(
  prefix: string,
  dpath: string,
): Promise<string | undefined> {
  for await (const dirEntry of Deno.readDir(dpath)) {
    if (dirEntry.name.startsWith(`${prefix}.`)) {
      return path.join(dpath, dirEntry.name);
    }
  }
}

export const [
  envFile,
  statsFile,
  triplesFile,
] = await Promise.all([
  findFile("env", "./manifest"),
  findFile("stats", "./manifest"),
  findFile("triples", "./manifest"),
]);

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

export function findPrefetchTargets(tdb: TribbleDB) {
}

export function findHomepageThumbnails(tdb: TribbleDB) {
}
