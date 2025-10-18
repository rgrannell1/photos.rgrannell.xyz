import { State } from "./types.ts";
import { DarkModes } from "./services/dark-mode.ts";
import { loadTriples } from "./services/data.ts";
import { deriveTriples, HARD_CODED_TRIPLES } from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";
import { readThing, toThingLinks } from "./services/things.ts";

async function loadData() {
  const schema = {};
  const db = await loadTriples(
    "/manifest/tribbles.2376d42ac8.txt",
    schema,
    deriveTriples,
  );

  db.add(HARD_CODED_TRIPLES);

  return db;
}

/*
 * Commonly used services that depend on state
 */
function loadServices(data: TribbleDB) {
  return {
    readThing: readThing.bind(null, data),
    toThingLinks: toThingLinks.bind(null, data),
  };
}

/*
 * Load the application state from localStorage or return defaults.
 */
export async function loadState(): Promise<State> {
  const data = await loadData();
  return {
    darkMode: DarkModes.load(),
    sidebarVisible: false,
    data,
    currentAlbum: undefined,
    currentPhoto: undefined,
    services: loadServices(data),
  };
}
