import type { AppWindow, State } from "./types.ts";
import { loadTriples } from "./semantic/data.ts";
import {
  deriveTriples,
  HARD_CODED_TRIPLES,
  postIndexing,
} from "./semantic/derive.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";

import {
  getTransferPolylines,
  getTripAlbums,
  readAlbumPhotosByAlbumId,
  readAlbumsByThingIds,
  readAlbumVideosByAlbumId,
  readAllAlbums,
  readThingsByAlbumId,
  readYearRecap,
} from "./services/albums.ts";
import { readAllVideos, readVideosByThingIds } from "./services/videos.ts";
import {
  readAlbum,
  readAmphibian,
  readCountries,
  readCountry,
  readFeatures,
  readFish,
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
import {
  collectUnphotographedNemesisBirds,
  countRegularBirdSpecies,
  readBirdStats,
  readMammalStats,
  readWildBirdChecklist,
} from "./services/stats.ts";
import {
  readAllPhotoUrns,
  readCategoryCover,
  readPhotosByThingIds,
  readSeenInCountries,
  readThingCover,
  readThingCovers,
} from "./services/photos.ts";
import {
  readNamedTypeThings,
  readThing,
  readThings,
  toThingLinks,
} from "./commons/things.ts";
import { namesToUrns } from "./services/names.ts";
import {
  readAllCountries,
  readGeocodedPlaces,
  readGeocodedPlacesWithCovers,
} from "./services/places.ts";

/*
 * Load data from the tribbles file.
 * This is ccurrently done in a single blocking load which is not efficient.
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
 * Every service reader, unbound. The key is the service name; a few readers
 * are renamed here to keep the service API uniform.
 */
const SERVICE_READERS = {
  readThing,
  readAlbum,
  readCountry,
  readPlace,
  readPhoto,
  readMammal,
  readReptile,
  readAmphibian,
  readFish,
  readInsect,
  readVideo,
  readLocation,
  readUnesco,
  readLocations,
  readFeatures,
  readPhotos,
  readUnescos,
  readThings,
  readCountries,
  readAllCountries,
  namesToUrns,
  readThingCover,
  readThingCovers,
  readCategoryCover,
  readPhotosByThingIds,
  readSeenInCountries,
  readAlbumsByThingIds,
  readYearRecap,
  readVideosByThingIds,
  toThingLinks,
  readGeocodedPlaces,
  readGeocodedPlacesWithCovers,
  readTransferPolylines: getTransferPolylines,
  readBirdStats,
  readMammalStats,
  readAllAlbums,
  readAlbumPhotosByAlbumId,
  readAlbumVideosByAlbumId,
  readThingsByAlbumId,
  readTripAlbums: getTripAlbums,
  readAllVideos,
  readAllPhotoUrns,
  readWildBirdChecklist,
  readNamedTypeThings,
};

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
