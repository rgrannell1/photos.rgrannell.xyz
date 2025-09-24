import * as path from "jsr:@std/path";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";

import { TribbleDB } from "https://raw.githubusercontent.com/rgrannell1/tribbledb/refs/heads/main/dist/mod.ts";
import { processTriples } from "./js/things/process.ts";
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

function prefetchTargets(env, triples: [string, string, string][]) {
  const tdb = new TribbleDB(triples).flatMap(
    processTriples,
  );

  const albums = ThingsService.albumObjects(tdb);
  return albums.slice(0, 11).map((album) => `${album.thumbnailUrl}`);
}

function homepageThumbnails(triples: [string, string, string][]) {
  const tdb = new TribbleDB(triples).flatMap(processTriples);
  const albums = ThingsService.albumObjects(tdb);

  return albums.map((album) => `${album.thumbnailUrl}`);
}

async function buildHTML() {
  const artifacts = new Artifacts("./manifest");

  const env = await artifacts.env();
  const stats = await artifacts.stats();
  const html = await artifacts.html();
  const triples = await artifacts.triples();

  await Deno.writeTextFile(
    "index.html",
    render(html, {
      stats,
      env: JSON.stringify(env),
      prefetched: prefetchTargets(env, triples),
      homepageThumbnails: JSON.stringify(homepageThumbnails(triples)),
      cdnUrl: env.photos_url,
      buildId: env.build_id,
    }),
  );
}

async function buildSW() {
  const artifacts = new Artifacts("./manifest");
  const env = await artifacts.env();
  const sw = await artifacts.sw();

  await Deno.writeTextFile(
    "sw.js",
    render(sw, {
      buildId: env.build_id,
    }),
  );
}

await Promise.all([
  buildHTML(),
  buildSW(),
]);
