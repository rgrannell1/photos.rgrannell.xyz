/*
 * Loads the triple store and binds the service registry to it.
 */

import type { AppWindow, State } from "./types.ts";
import { loadTriples } from "./semantic/data.ts";
import {
  deriveTriples,
  HARD_CODED_TRIPLES,
  postIndexing,
} from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { SERVICE_READERS } from "./services/mod.ts";
import {
  collectUnphotographedNemesisBirds,
  countRegularBirdSpecies,
} from "./services/stats.ts";

/*
 * Load data from the tribbles file.
 * This is currently done in a single blocking load which is not efficient.
 */
async function loadData() {
  const schema = {};
  const tdb = await loadTriples(
    `/manifest/tribbles.${(window as AppWindow).envConfig.publication_id}.txt`,
    schema,
    deriveTriples,
  );

  // Read catalogue facts before pruning drops unphotographed species.
  const regularBirdSpecies = countRegularBirdSpecies(tdb);
  const unphotographedNemesis = collectUnphotographedNemesisBirds(tdb);

  postIndexing(tdb);

  tdb.add(HARD_CODED_TRIPLES);

  return { tdb, regularBirdSpecies, unphotographedNemesis };
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
 * Load the application state from localStorage or return defaults.
 */
export async function loadState(): Promise<State> {
  const { tdb, regularBirdSpecies, unphotographedNemesis } = await loadData();

  return {
    currentAlbum: undefined,
    currentPhoto: undefined,
    currentUrn: undefined,
    currentType: undefined,
    data: tdb,
    regularBirdSpecies,
    unphotographedNemesis,
    sidebarVisible: false,
    services: loadServices(tdb),
  };
}
