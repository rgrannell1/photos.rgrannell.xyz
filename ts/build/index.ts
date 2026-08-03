import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import {
  buildCSS,
  buildExpandedTribbles,
  buildFlagSprite,
  buildHTML,
  buildSW,
  buildTS,
} from "./builders.ts";

console.log("Building");

// the sprite name and minified css feed the HTML template, so they build first
const flagSprite = await buildFlagSprite();
const css = await buildCSS();

await Promise.all([
  buildTS(),
  buildSW(),
  buildHTML(flagSprite, css),
  buildExpandedTribbles(),
]);

esbuild.stop();
