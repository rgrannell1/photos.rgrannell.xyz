import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import { render } from "https://deno.land/x/mustache_ts/mustache.ts";
import { env, envText, findHomepageThumbnails, findPrefetchTargets, htmlTemplateText, statsText, swTemplateText } from "./loaders.ts";
import { minify as cssoMinify } from "npm:csso";

export async function buildSW() {
  console.info('🌐 Rendering service-worker');

  await Deno.writeTextFile(
    `dist_fork/js/sw.${env.publication_id}.js`,
    render(swTemplateText, {
      prefetched: findPrefetchTargets(),
      homepageThumbnails: JSON.stringify(findHomepageThumbnails()),
      publicationId: env.publication_id,
    }),
  );
}

/*
 * Build Typescript with esbuild
 */
export async function buildTS() {
  console.info('🌐 Rendering app');

  const res = await esbuild.build({
    entryPoints: ["ts/index.ts"],
    bundle: true,
    outfile: `dist_fork/js/app.${env.publication_id}.js`,
    format: "esm",
    treeShaking: true,
    sourcemap: true,
  });
  console.log(res);
}

/*
 * Build CSS with esbuild
 */
export async function buildCSS() {
  console.info('🌐 Rendering css');

  const result = await esbuild.transform(await Deno.readTextFile(`css2/style.css`), { loader: "css" });
  const minified = cssoMinify(result.code).css;

  await Deno.writeTextFile(`dist_fork/css/style.${env.publication_id}.css`, minified);
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
      publicationId: env.publication_id,
    }),
  );
}
