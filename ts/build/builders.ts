import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";
import { env, envText, htmlTemplateText, statsText } from "./loaders.ts";

async function buildSW() {
}

/*
 * Build Typescript with esbuild
 */
export async function buildTS() {
  const ctx = await esbuild.context({
    entryPoints: ["ts/index.ts"],
    bundle: true,
    outfile: "dist_fork/js/app.js",
    format: "esm",
    sourcemap: true,
  });

  return await ctx.watch();
}

/*
 * Build CSS with esbuild
 */
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

  return await ctx.watch();
}

/*
 * Build HTML
 */
export async function buildHTML() {
  await Deno.writeTextFile(
    "index_fork.html",
    render(htmlTemplateText, {
      stats: statsText,
      env: envText,
      prefetched: [],
      homepageThumbnails: JSON.stringify([]),
      cdnUrl: env.photos_url,
      buildId: env.build_id,
    }),
  );
}
