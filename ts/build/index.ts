import * as esbuild from "https://deno.land/x/esbuild/mod.js";
import {
  buildCSS,
  buildExpandedTribbles,
  buildHTML,
  buildSW,
  buildTS,
} from "./builders.ts";

console.log("Building");

await Promise.all([
  buildTS(),
  buildSW(),
  buildCSS(),
  buildHTML(),
  buildExpandedTribbles(),
]);

esbuild.stop();
