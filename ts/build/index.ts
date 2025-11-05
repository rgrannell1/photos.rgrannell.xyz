import { buildCSS, buildHTML, buildTS, buildSW } from "./builders.ts";

console.log("Building");

await Promise.all([
  buildTS(),
  buildSW(),
  buildCSS(),
  buildHTML(),
]);
