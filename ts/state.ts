/*
 * Loads the triple store and binds the service registry to it.
 */

import type { AppWindow, State } from "./types.ts";
import { getTribbleDB, loadTriples } from "./semantic/data.ts";
import {
  deriveTriples,
  HARD_CODED_TRIPLES,
  runFinalPasses,
  runStreamPasses,
} from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { SERVICE_READERS } from "./services/mod.ts";
import {
  collectUnphotographedNemesis,
  countIrishMammalSpecies,
  countRegularBirdSpecies,
} from "./services/stats.ts";
import { KnownTypes } from "./constants/data.ts";

// minimum time between redraws while the tribble stream loads
const REDRAW_INTERVAL_MS = 100;

/*
 * Stream the tribbles file into the shared TribbleDB. onProgress fires at
 * most once per REDRAW_INTERVAL_MS during the stream; cheap derivations
 * re-run before each call so partial renders see derived triples too.
 * The heavy joins, the prune, and the catalogue stats run once at the end.
 */
export async function completeLoad(
  state: State,
  onProgress: () => void,
): Promise<void> {
  const tdb = state.data;
  let lastProgress = 0;

  const onBatch = () => {
    const now = performance.now();
    if (now - lastProgress < REDRAW_INTERVAL_MS) {
      return;
    }
    lastProgress = now;

    runStreamPasses(tdb);
    onProgress();
  };

  await loadTriples(
    `/manifest/tribbles.${(window as AppWindow).envConfig.publication_id}.txt`,
    {},
    deriveTriples,
    onBatch,
  );

  // a final stream-pass run, so the joins below see complete inverses
  runStreamPasses(tdb);

  // Read catalogue facts before pruning drops unphotographed species.
  state.regularBirdSpecies = countRegularBirdSpecies(tdb);
  state.irishMammalSpecies = countIrishMammalSpecies(tdb);
  state.unphotographedNemesis = collectUnphotographedNemesis(
    tdb,
    KnownTypes.BIRD,
  );
  state.unphotographedNemesisMammals = collectUnphotographedNemesis(
    tdb,
    KnownTypes.MAMMAL,
  );

  runFinalPasses(tdb);

  tdb.add(HARD_CODED_TRIPLES);

  state.loaded = true;
  onProgress();
}

// any reader taking the TribbleDB as its first argument
type TdbReader = (tdb: TribbleDB, ...args: never[]) => unknown;

// the same reader with the TribbleDB argument already applied
type BoundReader<Reader> = Reader extends
  (tdb: TribbleDB, ...args: infer Args) => infer Ret ? (...args: Args) => Ret
  : never;

type BoundReaders<Readers> = { [Name in keyof Readers]: BoundReader<Readers[Name]> };

/*
 * Bind every reader in a record to one TribbleDB instance, preserving each
 * reader's remaining signature.
 */
function bindReaders<Readers extends Record<string, TdbReader>>(
  tdb: TribbleDB,
  readers: Readers,
): BoundReaders<Readers> {
  const bound = Object.fromEntries(
    Object.entries(readers).map((
      [name, reader],
    ) => [name, reader.bind(null, tdb)]),
  );

  return bound as BoundReaders<Readers>;
}

/*
 * Commonly used services that depend on state
 */
export function loadServices(tdb: TribbleDB) {
  return bindReaders(tdb, SERVICE_READERS);
}

/*
 * Build the initial application state around the empty shared TribbleDB.
 * completeLoad fills the database and the catalogue facts in the background.
 */
export function initState(): State {
  const tdb = getTribbleDB();

  return {
    currentAlbum: undefined,
    currentPhoto: undefined,
    currentUrn: undefined,
    currentType: undefined,
    data: tdb,
    loaded: false,
    regularBirdSpecies: 0,
    irishMammalSpecies: 0,
    unphotographedNemesis: [],
    unphotographedNemesisMammals: [],
    sidebarVisible: false,
    services: loadServices(tdb),
  };
}
