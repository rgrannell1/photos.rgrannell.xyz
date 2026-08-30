/*
 * Loads the triple store and binds the service registry to it.
 */

import { getTribbleDB } from "./semantic/data.ts";

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { SERVICE_READERS } from "./services/data/mod.ts";

import type { NemesisSpecies } from "./domain/media/stats.ts";
import {
  bindReaders,
  finishLoad,
  readEmptyCatalogueFacts,
  streamTriples,
} from "./state-helpers.ts";

// minimum time between redraws while the tribble stream loads
export const REDRAW_INTERVAL_MS = 100;

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

export type LoadProgress = {
  tdb: TribbleDB;
  onProgress: () => void;
  lastProgress: number;
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
  const progress = { tdb, onProgress, lastProgress: 0 };
  await streamTriples(progress);
  finishLoad(state, onProgress);
}

// any reader taking the TribbleDB as its first argument
export type TdbReader = (tdb: TribbleDB, ...args: never[]) => unknown;

// the same reader with the TribbleDB argument already applied
type BoundReader<Reader> = Reader extends
  (tdb: TribbleDB, ...args: infer Args) => infer Ret ? (...args: Args) => Ret
  : never;

export type BoundReaders<Readers> = {
  [Name in keyof Readers]: BoundReader<Readers[Name]>;
};

export type ReaderEntry = [string, TdbReader];

export type BoundReaderEntry = [string, (...args: never[]) => unknown];

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
  const catalogue = readEmptyCatalogueFacts();

  return {
    data: tdb,
    loaded: false,
    catalogue,
    sidebarVisible: false,
    services: loadServices(tdb),
  };
}
