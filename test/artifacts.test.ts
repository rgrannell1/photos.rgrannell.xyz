import env from "../manifest/env.json" with { type: "json" };
(window as any).envConfig = env;

import { resolve } from "https://deno.land/std/path/mod.ts";
import { TribbleDB } from "tribbledb";
import { schema } from "../js/things/schema.ts";
import { processTriples } from "../js/things/process.ts";
import { TribblesArtifact } from "../js/models/artifacts.ts";
import { Triple } from "../js/types.ts";

const tribblesPath = resolve(
  new URL(".", import.meta.url).pathname,
  `../manifest/tribbles.${env.publication_id}.txt`,
);
const artifactPath = `file://${tribblesPath}`;

Deno.test("Current artifact file parses as expected", async () => {
  const tribbles = new TribblesArtifact(artifactPath);
  const tdb = new TribbleDB([], schema);

  let idx = 0;
  for await (const triple of tribbles.stream()) {
    const processed = processTriples(triple as Triple);
    tdb.add(processed);
    idx++;
  }

  if (idx < 10_000) {
    throw new Error("failed to parse tribbles");
  }
});
