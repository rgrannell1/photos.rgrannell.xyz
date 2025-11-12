import { State } from "./types.ts";
import { DarkModes } from "./services/dark-mode.ts";
import { loadTriples } from "./semantic/data.ts";
import { deriveTriples, HARD_CODED_TRIPLES } from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";

import { readAlbum, readAlbumsByThingIds } from "./services/albums.ts";
import {
  readAmphibian,
  readInsect,
  readMammal,
  readReptile,
} from "./services/subjects.ts";
import { readPhoto, readPhotosByThingIds } from "./services/photos.ts";
import { readThing, readThings, toThingLinks } from "./services/things.ts";
import {
  readCountry,
  readLocation,
  readUnesco,
  readParsedLocations,
  readPlace,
} from "./services/location.ts";
import { readVideo } from "./services/videos.ts";
import { readParsedFeatures } from "./services/features.ts";

/*
 * Load data from the tribbles file.
 */
async function loadData() {
  const schema = {};
  const db = await loadTriples(
    `/manifest/tribbles.${window.envConfig.publication_id}.txt`,
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
    readLocation: readLocation.bind(null, data),
    readUnesco: readUnesco.bind(null, data),
    toThingLinks: toThingLinks.bind(null, data),
    readParsedLocations: readParsedLocations.bind(null, data),
    readParsedFeatures: readParsedFeatures.bind(null, data),
    readThings: readThings.bind(null, data),
    readPhotosByThingIds: readPhotosByThingIds.bind(null, data),
    readAlbumsByThingIds: readAlbumsByThingIds.bind(null, data),
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
