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

/** Run stream derivations and report load progress at the redraw interval. */
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

/** Read catalogue totals and unphotographed nemesis species before pruning. */
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

/** Complete derivation, save catalogue facts, and mark application state as loaded. */
export function finishLoad(state: State, onProgress: () => void): void {
  // a final stream-pass run, so the joins below see complete inverses
  runStreamPasses(state.data);
  // Read catalogue facts before pruning drops unphotographed species.
  state.catalogue = readCatalogueFacts(state.data);
  runFinalPasses(state.data);
  state.loaded = true;
  onProgress();
}

/** Build the published triple data URL from the runtime publication identifier. */
export function readTribblesUrl(): string {
  const publicationId = (window as AppWindow).envConfig.publication_id;
  return `/manifest/tribbles.${publicationId}.txt`;
}

/** Stream published triples through derivation and throttled progress reports. */
export async function streamTriples(progress: LoadProgress): Promise<void> {
  const deriveTriples = createTripleDeriver();
  const reportProgress = reportLoadProgress.bind(null, progress);
  await loadTriples(readTribblesUrl(), {}, deriveTriples, reportProgress);
}

/** Bind one named data reader to a triple store. */
export function bindReaderEntry(
  tdb: TribbleDB,
  entry: ReaderEntry,
): BoundReaderEntry {
  const [name, reader] = entry;
  return [name, reader.bind(null, tdb)];
}

/**
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

/** Create zeroed catalogue facts with no nemesis species. */
export function readEmptyCatalogueFacts(): CatalogueFacts {
  return {
    regularBirdSpecies: 0,
    irishMammalSpecies: 0,
    nemesisBirds: [],
    nemesisMammals: [],
  };
}
