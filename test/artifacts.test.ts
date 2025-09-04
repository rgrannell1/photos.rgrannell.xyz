
import env from "../manifest/env.json" with { type: "json" }
(window as any).envConfig = env;

import { TribbleDB } from "../js/library/tribble.js";
import { schema } from "../js/things/schema.ts";
import { TribblesArtifact } from "../js/models/artifacts.ts";
import { resolve } from "https://deno.land/std/path/mod.ts";

const tribblesPath = resolve(
  new URL(".", import.meta.url).pathname,
  `../manifest/tribbles.${env.publication_id}.txt`
);
const tribbles = new TribblesArtifact(`file://${tribblesPath}`);
const tdb = new TribbleDB([], schema);

for await (const triple of tribbles.stream()) {
  tdb.add([triple])
}
