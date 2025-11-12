import { buildCSS, buildHTML, buildSW, buildTS } from "./builders.ts";

console.log("Building");

await Promise.all([
  buildTS(),
  buildSW(),
  buildCSS(),
  buildHTML(),
]);
