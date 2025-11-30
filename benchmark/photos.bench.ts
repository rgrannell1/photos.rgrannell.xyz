
import { loadTriples } from '../ts/semantic/data.ts';
import {
  deriveTriples,
  postIndexing,
  addYear,
  addInverseRelations,
  addNestedLocations,
  convertRatingsToUrns,
  convertCountriesToUrns,
  expandCdnUrls,
  convertStylesToUrns
} from '../ts/semantic/derive.ts';
import { tribblesFile } from '../ts/build/loaders.ts';

Deno.bench("triple-loading with identify function", async () => {
  await loadTriples(tribblesFile!, {}, x => [x]);
});

Deno.bench("triple-loading with triple derivation", async () => {
  await loadTriples(tribblesFile!, {}, deriveTriples);
});


Deno.bench("postindexing performance", async bench => {
  const tdb = await loadTriples(tribblesFile!, {}, deriveTriples);

  bench.start();
  postIndexing(tdb);
  bench.end();
});

Deno.bench("postindexing: addYear performance", async bench => {
  const tdb = await loadTriples(tribblesFile!, {}, deriveTriples);

  bench.start();
  addYear(tdb);
  bench.end();
});

Deno.bench("postindexing: addInverseRelations performance", async bench => {
  const tdb = await loadTriples(tribblesFile!, {}, deriveTriples);

  bench.start();
  addInverseRelations(tdb);
  bench.end();
});

Deno.bench("postindexing: addNestedLocations performance", async bench => {
  const tdb = await loadTriples(tribblesFile!, {}, deriveTriples);

  bench.start();
  addNestedLocations(tdb);
  bench.end();
});
