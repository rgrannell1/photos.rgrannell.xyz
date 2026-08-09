import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import {
  buildCSS,
  buildExpandedTribbles,
  buildFlagAssets,
  buildHTML,
  buildSW,
  buildTS,
  buildVersion,
} from "./builders.ts";

console.log("Building");

// the flag manifest and minified css feed the HTML template, so they build first
const flags = await buildFlagAssets();
const css = await buildCSS();

await Promise.all([
  buildTS(),
  buildSW(),
  buildHTML(flags, css),
  buildExpandedTribbles(),
  buildVersion(),
]);

esbuild.stop();
