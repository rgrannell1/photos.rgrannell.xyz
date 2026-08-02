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

// the sprite name feeds the HTML template, so it builds first
const flagSprite = await buildFlagSprite();

await Promise.all([
  buildTS(),
  buildSW(),
  buildCSS(),
  buildHTML(flagSprite),
  buildExpandedTribbles(),
]);

esbuild.stop();
