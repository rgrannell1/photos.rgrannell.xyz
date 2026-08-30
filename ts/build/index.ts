import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import {
  buildCSS,
  buildExpandedTribbles,
  buildFlagAssets,
  buildHTML,
  buildSW,
  buildTS,
  buildVersion,
} from "./builders/builders.ts";

console.log("Building");

// The flag manifest and minified CSS feed the HTML template, so build them first.
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
