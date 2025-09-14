import * as path from "jsr:@std/path";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";

import { TribbleDB } from "https://raw.githubusercontent.com/rgrannell1/tribbledb/refs/heads/main/dist/mod.ts";
import { CURIES, expandTripleCuries } from "./js/things/things.ts";
import { ThingsService } from "./js/things/services.ts";

class Artifacts {
  dpath: string;

  constructor(dpath: string) {
    this.dpath = dpath;
  }

  async findFile(name: string) {
    for await (const dirEntry of Deno.readDir(this.dpath)) {
      if (dirEntry.name.startsWith(`${name}.`)) {
        return path.join(this.dpath, dirEntry.name);
      }
    }
  }

  async env() {
    return JSON.parse(await Deno.readTextFile(await this.findFile("env")));
  }
  async stats() {
    return await Deno.readTextFile(await this.findFile("stats"));
  }
  async triples() {
    return JSON.parse(await Deno.readTextFile(await this.findFile("triples")));
  }
  async html() {
    return await Deno.readTextFile("index.mustache.html");
  }
  async sw() {
    return await Deno.readTextFile("sw.mustache.js");
  }
}

export function expandUrns(triple) {
  const [source, relation, target] = triple;

  return [[
    typeof source === "string" && source.startsWith("::")
      ? `urn:ró:${source.slice(2)}`
      : source,
    relation,
    typeof target === "string" && target.startsWith("::")
      ? `urn:ró:${target.slice(2)}`
      : target,
  ]];
}

function prefetchTargets(env, triples: [string, string, string][]) {
  const tdb = new TribbleDB(triples).flatMap(expandUrns).flatMap(expandTripleCuries.bind(null, CURIES));

  const albums = ThingsService.albumObjects(tdb)
    .sort((album0, album1) => {
      return parseInt(album1.min_date, 10) - parseInt(album0.min_date, 10);
    });

  return albums.slice(0, 11).map((album) => `${album.thumbnail_url}`);
}

function homepageThumbnails(triples: [string, string, string][]) {
  const tdb = new TribbleDB(triples).flatMap(expandUrns);
  const albums = ThingsService.albumObjects(tdb)

  return albums.map((album) => `${album.thumbnail_url}`);
}

async function buildHTML() {
  const artifacts = new Artifacts("./manifest");

  const env = await artifacts.env();
  const stats = await artifacts.stats();
  const html = await artifacts.html();
  const triples = await artifacts.triples();

  await Deno.writeTextFile("index.html", render(html, {
    stats,
    env: JSON.stringify(env),
    prefetched: prefetchTargets(env, triples),
    homepageThumbnails: JSON.stringify(homepageThumbnails(triples)),
    cdnUrl: env.photos_url,
    buildId: env.build_id
  }));
}

async function buildSW() {
  const artifacts = new Artifacts("./manifest");
  const env = await artifacts.env();

  const sw = await artifacts.sw();

  await Deno.writeTextFile("sw.js", render(sw, {
    buildId: env.build_id
  }));
}

await Promise.all([
  buildHTML(),
  buildSW()
]);
