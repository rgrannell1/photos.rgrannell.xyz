import * as path from "jsr:@std/path";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";

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
    return await Deno.readTextFile(await this.findFile("env"));
  }
  async stats() {
    return await Deno.readTextFile(await this.findFile("stats"));
  }
  async html() {
    return await Deno.readTextFile("index.mustache.html");
  }
}

function prefetchTargets(albums: any[]) {
  return albums
    .slice(1)
    .sort((album0, album1) => {
      return album1[6] - album0[6]; // max date
    })
    .map((album) => {
      return album[7]; // thumbnail url
    }).slice(0, 5);
}

async function buildHTML() {
  const artifacts = new Artifacts("./manifest");

  const env = await artifacts.env();
  const stats = await artifacts.stats();
  const html = await artifacts.html();

  console.log(render(html, {
    stats,
    env,
    // TODO
    prefetched: [], //prefetchTargets(await artifacts.albums()),
    cdnUrl: JSON.parse(env).photos_url,
  }));
}

await buildHTML();
