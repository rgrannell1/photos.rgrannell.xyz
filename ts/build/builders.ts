import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";
import { env, envText, findHomepageThumbnails, findPrefetchTargets, htmlTemplateText, statsText } from "./loaders.ts";

async function buildSW() {
  console.info('🌐 Rendering service-worker');

}

/*
 * Build Typescript with esbuild
 */
export async function buildTS() {
  console.info('🌐 Rendering app');

  const res = await esbuild.build({
    entryPoints: ["ts/index.ts"],
    bundle: true,
    outfile: `dist_fork/js/app.${env.build_id}.js`,
    format: "esm",
    sourcemap: true,
  });
  console.log(res);
}

/*
 * Build CSS with esbuild
 */
export async function buildCSS() {
  console.info('🌐 Rendering css');

  const res = await esbuild.build({
    entryPoints: ["css2/style.css"],
    bundle: true,
    loader: {
      ".ttf": "file",
      ".woff2": "file",
    },
    outfile: `dist_fork/css/style.${env.build_id}.css`,
  });
  console.log(res);

}

/*
 * Build HTML
 */
export async function buildHTML() {
  console.info('🌐 Rendering index.html');

  await Deno.writeTextFile(
    "index_fork.html",
    render(htmlTemplateText, {
      stats: statsText,
      env: envText,
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(findHomepageThumbnails()),
      cdnUrl: env.photos_url,
      buildId: env.build_id,
    }),
  );
}
