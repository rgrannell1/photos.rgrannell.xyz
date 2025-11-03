import { buildCSS, buildHTML, buildTS } from "./builders.ts";

console.log("Building");
await Promise.all([
  buildTS(),
  buildCSS(),
  buildHTML(),
]);
