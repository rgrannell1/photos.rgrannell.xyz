import * as path from "jsr:@std/path";
import * as esbuild from 'https://deno.land/x/esbuild/mod.js'

async function findFile(prefix: string, dpath: string) {
  for await (const dirEntry of Deno.readDir(dpath)) {
    if (dirEntry.name.startsWith(`${prefix}.`)) {
      return path.join(dpath, dirEntry.name);
    }
  }
}

const envFile = await findFile("env", "./manifest");
const stats = await findFile("stats", "./manifest");
const triples = await findFile("triples", "./manifest");

function findPrefetchTargets(tdb) {

}

function findHomepageThumbnails(tdb) {

}

async function buildHTML() {


}

async function buildSW() {

}

function onRebuild(error, result) {
  const now = new Date().toLocaleTimeString();
  if (error) {
    console.error(`[${now}] JS rebuild failed:`, error.message);
  } else {
    console.log(`[${now}] JS rebuilt (${result?.warnings.length ?? 0} warnings)`);
  }
}

export async function buildJS() {
  const ctx = await esbuild.context({
    entryPoints: ["ts/index.ts"],
    bundle: true,
    outfile: "dist_fork/js/app.js",
    format: "esm",
    sourcemap: true,
  });

  ctx.onRebuild = onRebuild;

  return await ctx.watch();
}

export async function buildCSS() {
  const ctx = await esbuild.context({
    entryPoints: ["css2/style.css"],
    bundle: true,
    loader: {
      ".ttf": "file",
      ".woff2": "file",
    },
    outfile: "dist_fork/css/style.css",
  });


  return await ctx.watch({
    onRebuild(error, result) {
      const now = new Date().toLocaleTimeString();
      if (error) {
        console.error(`[${now}] CSS rebuild failed:`, error.message);
      } else {
        console.log(`[${now}] CSS rebuilt (${result?.warnings.length ?? 0} warnings)`);
      }
    }
  });
}

console.log('Building')
await Promise.all([
  buildJS(),
  buildCSS()
]);
