import { State } from "./types.ts";
import { DarkModes } from "./services/dark-mode.ts";
import { loadTriples } from "./services/data.ts";
import { deriveTriples } from "./semantic/derive.ts";

async function loadData() {
  const schema = {};
  const db = await loadTriples(
    "/manifest/tribbles.c47017e786.txt",
    schema,
    deriveTriples,
  );
  return db;
}

/*
 * Load the application state from localStorage or return defaults.
 *
 */
export async function loadState(): Promise<State> {
  return {
    darkMode: DarkModes.load(),
    sidebarVisible: false,
    data: await loadData(),
    currentAlbum: undefined,
  };
}
