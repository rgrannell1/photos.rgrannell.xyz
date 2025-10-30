import { buildCSS, buildTS, buildHTML } from "./builders.ts";


console.log("Building");
await Promise.all([
  buildTS(),
  buildCSS(),
  buildHTML()
]);
