import { State } from "./types.ts";
import { DarkModes } from "./services/dark-mode.ts";
import { loadTriples } from "./semantic/data.ts";
import { deriveTriples, HARD_CODED_TRIPLES } from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";

import { readAlbum } from "./services/albums.ts";
import {
  readAmphibian,
  readInsect,
  readMammal,
  readReptile,
} from "./services/subjects.ts";
import { readPhoto } from "./services/photos.ts";
import { readThing, toThingLinks } from "./services/things.ts";
import { readCountry, readParsedLocations, readPlace } from "./services/location.ts";
import { readVideo } from "./services/videos.ts";

/*
 * Load data from the tribbles file.
 */
async function loadData() {
  const schema = {};
  const db = await loadTriples(
    "/manifest/tribbles.d1a0754ec0.txt",
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
    readAlbum: readAlbum.bind(null, data),
    readCountry: readCountry.bind(null, data),
    readPlace: readPlace.bind(null, data),
    readPhoto: readPhoto.bind(null, data),
    readMammal: readMammal.bind(null, data),
    readReptile: readReptile.bind(null, data),
    readAmphibian: readAmphibian.bind(null, data),
    readInsect: readInsect.bind(null, data),
    readVideo: readVideo.bind(null, data),
    toThingLinks: toThingLinks.bind(null, data),
    readParsedLocations: readParsedLocations.bind(null, data),
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
    currentType: undefined,
    services: loadServices(data),
  };
}
