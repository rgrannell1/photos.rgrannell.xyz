/* Support state operations. */

/*
 * Loads the triple store and binds the service registry to it.
 */
/* Support state operations. */
/*
 * Loads the triple store and binds the service registry to it.
 */
import type { AppWindow } from "./types/browser.ts";
import { loadTriples } from "./semantic/data.ts";
import {
  createTripleDeriver,
  runFinalPasses,
  runStreamPasses,
} from "./semantic/derive/mod.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  collectUnphotographedNemesis,
  countIrishMammalSpecies,
  countRegularBirdSpecies,
} from "./services/data/stats.ts";
import { KnownTypes } from "./constants/data.ts";
import type {
  BoundReaderEntry,
  BoundReaders,
  CatalogueFacts,
  LoadProgress,
  ReaderEntry,
  State,
  TdbReader,
} from "./state.ts";
import { REDRAW_INTERVAL_MS } from "./state.ts";

export function reportLoadProgress(progress: LoadProgress): void {
  const now = performance.now();
  const elapsed = now - progress.lastProgress;
  if (elapsed < REDRAW_INTERVAL_MS) {
    return;
  }

  progress.lastProgress = now;
  runStreamPasses(progress.tdb);
  progress.onProgress();
}

export function readCatalogueFacts(tdb: TribbleDB): CatalogueFacts {
  const regularBirdSpecies = countRegularBirdSpecies(tdb);
  const irishMammalSpecies = countIrishMammalSpecies(tdb);
  const nemesisBirds = collectUnphotographedNemesis(tdb, KnownTypes.BIRD);
  const nemesisMammals = collectUnphotographedNemesis(tdb, KnownTypes.MAMMAL);
  return {
    regularBirdSpecies,
    irishMammalSpecies,
    nemesisBirds,
    nemesisMammals,
  };
}

export function finishLoad(state: State, onProgress: () => void): void {
  // a final stream-pass run, so the joins below see complete inverses
  runStreamPasses(state.data);
  // Read catalogue facts before pruning drops unphotographed species.
  state.catalogue = readCatalogueFacts(state.data);
  runFinalPasses(state.data);
  state.loaded = true;
  onProgress();
}

export function readTribblesUrl(): string {
  const publicationId = (window as AppWindow).envConfig.publication_id;
  return `/manifest/tribbles.${publicationId}.txt`;
}

export async function streamTriples(progress: LoadProgress): Promise<void> {
  const deriveTriples = createTripleDeriver();
  const reportProgress = reportLoadProgress.bind(null, progress);
  await loadTriples(readTribblesUrl(), {}, deriveTriples, reportProgress);
}

export function bindReaderEntry(
  tdb: TribbleDB,
  entry: ReaderEntry,
): BoundReaderEntry {
  const [name, reader] = entry;
  return [name, reader.bind(null, tdb)];
}

/*
 * Bind every reader in a record to one TribbleDB instance.
 */
export function bindReaders<Readers extends Record<string, TdbReader>>(
  tdb: TribbleDB,
  readers: Readers,
): BoundReaders<Readers> {
  const entries = Object.entries(readers);
  const boundEntries = entries.map(bindReaderEntry.bind(null, tdb));
  const bound = Object.fromEntries(boundEntries);

  return bound as BoundReaders<Readers>;
}

export function readEmptyCatalogueFacts(): CatalogueFacts {
  return {
    regularBirdSpecies: 0,
    irishMammalSpecies: 0,
    nemesisBirds: [],
    nemesisMammals: [],
  };
}
