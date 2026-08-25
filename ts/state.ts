/*
 * Loads the triple store and binds the service registry to it.
 */

import type { AppWindow } from "./types/browser.ts";
import { getTribbleDB, loadTriples } from "./semantic/data.ts";
import {
  createTripleDeriver,
  runFinalPasses,
  runStreamPasses,
} from "./semantic/derive/mod.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { SERVICE_READERS } from "./services/data/mod.ts";
import {
  collectUnphotographedNemesis,
  countIrishMammalSpecies,
  countRegularBirdSpecies,
} from "./services/data/stats.ts";
import { KnownTypes } from "./constants/data.ts";
import type { NemesisSpecies } from "./domain/stats.ts";

// minimum time between redraws while the tribble stream loads
const REDRAW_INTERVAL_MS = 100;

export type Services = ReturnType<typeof loadServices>;

export type CatalogueFacts = {
  regularBirdSpecies: number;
  irishMammalSpecies: number;
  nemesisBirds: NemesisSpecies[];
  nemesisMammals: NemesisSpecies[];
};

export type State = {
  data: TribbleDB;
  services: Services;
  loaded: boolean;
  catalogue: CatalogueFacts;
  sidebarVisible: boolean;
};

/*
 * Stream the tribbles file into the shared TribbleDB. Cheap derivations re-run
 * during the stream, so partial renders see derived triples. The heavy joins,
 * the prune, and the catalogue stats run once at the end.
 */
export async function completeLoad(
  state: State,
  onProgress: () => void,
): Promise<void> {
  const tdb = state.data;
  const deriveTriples = createTripleDeriver();
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
  state.catalogue = {
    regularBirdSpecies: countRegularBirdSpecies(tdb),
    irishMammalSpecies: countIrishMammalSpecies(tdb),
    nemesisBirds: collectUnphotographedNemesis(tdb, KnownTypes.BIRD),
    nemesisMammals: collectUnphotographedNemesis(tdb, KnownTypes.MAMMAL),
  };

  runFinalPasses(tdb);

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
 * Bind every reader in a record to one TribbleDB instance.
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

export function loadServices(tdb: TribbleDB) {
  return bindReaders(tdb, SERVICE_READERS);
}

export function hideSidebar(state: State): void {
  state.sidebarVisible = false;
}

export function toggleSidebar(state: State): void {
  state.sidebarVisible = !state.sidebarVisible;
}

/*
 * Build the initial state. completeLoad fills the database and catalogue later.
 */
export function initState(): State {
  const tdb = getTribbleDB();

  return {
    data: tdb,
    loaded: false,
    catalogue: {
      regularBirdSpecies: 0,
      irishMammalSpecies: 0,
      nemesisBirds: [],
      nemesisMammals: [],
    },
    sidebarVisible: false,
    services: loadServices(tdb),
  };
}
