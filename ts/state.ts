import type { AppWindow, State } from "./types.ts";
import * as DarkMode from "./services/dark-mode.ts";
import { loadTriples } from "./semantic/data.ts";
import { deriveTriples, HARD_CODED_TRIPLES } from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";

import { readAlbumsByThingIds } from "./services/albums.ts";
import {
  readAlbum,
  readAmphibian,
  readCountries,
  readCountry,
  readFeatures,
  readInsect,
  readLocation,
  readLocations,
  readMammal,
  readPhoto,
  readPhotos,
  readPlace,
  readReptile,
  readUnesco,
  readUnescos,
  readVideo,
} from "./services/readers.ts";
import { readPhotosByThingIds, chooseThingCover } from "./services/photos.ts";
import { readThing, readThings, toThingLinks } from "./commons/things.ts";
import { namesToUrns } from "./services/names.ts";

/*
 * Load data from the tribbles file.
 * This is ccurrently done in a single blocking load which is not efficient.
 */
async function loadData() {
  const schema = {};
  const db = await loadTriples(
    `/manifest/tribbles.${(window as AppWindow).envConfig.publication_id}.txt`,
    schema,
    deriveTriples,
  );

  db.add(HARD_CODED_TRIPLES);

  return db;
}

/*
 * Commonly used services that depend on state
 *
 * This is not pleasant, though I don't see a simpler method.
 */
export function loadServices(tdb: TribbleDB) {
  return {
    readThing: readThing.bind(null, tdb),
    readAlbum: readAlbum.bind(null, tdb),
    readCountry: readCountry.bind(null, tdb),
    readPlace: readPlace.bind(null, tdb),
    readPhoto: readPhoto.bind(null, tdb),
    readMammal: readMammal.bind(null, tdb),
    readReptile: readReptile.bind(null, tdb),
    readAmphibian: readAmphibian.bind(null, tdb),
    readInsect: readInsect.bind(null, tdb),
    readVideo: readVideo.bind(null, tdb),
    readLocation: readLocation.bind(null, tdb),
    readUnesco: readUnesco.bind(null, tdb),
    readLocations: readLocations.bind(null, tdb),
    readFeatures: readFeatures.bind(null, tdb),
    readPhotos: readPhotos.bind(null, tdb),
    readUnescos: readUnescos.bind(null, tdb),
    readThings: readThings.bind(null, tdb),
    readCountries: readCountries.bind(null, tdb),
    namesToUrns: namesToUrns.bind(null, tdb),
    readThingCover: chooseThingCover.bind(null, tdb),
    readPhotosByThingIds: readPhotosByThingIds.bind(null, tdb),
    readAlbumsByThingIds: readAlbumsByThingIds.bind(null, tdb),
    toThingLinks: toThingLinks.bind(null, tdb),
  };
}

/*
 * Load the application state from localStorage or return defaults.
 */
export async function loadState(): Promise<State> {
  const data = await loadData();

  return {
    currentAlbum: undefined,
    currentPhoto: undefined,
    currentUrn: undefined,
    currentType: undefined,
    data,
    darkMode: DarkMode.load(),
    sidebarVisible: false,
    services: loadServices(data),
  };
}
