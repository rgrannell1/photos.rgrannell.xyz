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
import { readBirdStats, readMammalStats } from "./services/stats.ts";
import {
  readAllPhotoUrns,
  readCategoryCover,
  readPhotosByThingIds,
  readSeenInCountries,
  readSpeciesCovers,
  readThingCover,
} from "./services/photos.ts";
import {
  readNamedTypeThings,
  readThing,
  readThings,
  toThingLinks,
} from "./commons/things.ts";
import {
  countRegularBirdSpecies,
  readWildBirdChecklist,
} from "./services/stats.ts";
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

  // Count the full Irish catalogue before pruning drops unphotographed species.
  const regularBirdSpecies = countRegularBirdSpecies(tdb);

  postIndexing(tdb);

  tdb.add(HARD_CODED_TRIPLES);

  return { tdb, regularBirdSpecies };
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
    readFish: readFish.bind(null, tdb),
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
    readAllCountries: readAllCountries.bind(null, tdb),
    namesToUrns: namesToUrns.bind(null, tdb),
    readThingCover: readThingCover.bind(null, tdb),
    readSpeciesCovers: readSpeciesCovers.bind(null, tdb),
    readCategoryCover: readCategoryCover.bind(null, tdb),
    readPhotosByThingIds: readPhotosByThingIds.bind(null, tdb),
    readSeenInCountries: readSeenInCountries.bind(null, tdb),
    readAlbumsByThingIds: readAlbumsByThingIds.bind(null, tdb),
    readYearRecap: readYearRecap.bind(null, tdb),
    readVideosByThingIds: readVideosByThingIds.bind(null, tdb),
    toThingLinks: toThingLinks.bind(null, tdb),
    readGeocodedPlaces: readGeocodedPlaces.bind(null, tdb),
    readGeocodedPlacesWithCovers: readGeocodedPlacesWithCovers.bind(null, tdb),
    readTransferPolylines: getTransferPolylines.bind(null, tdb),
    readBirdStats: readBirdStats.bind(null, tdb),
    readMammalStats: readMammalStats.bind(null, tdb),
    readAllAlbums: readAllAlbums.bind(null, tdb),
    readAlbumPhotosByAlbumId: readAlbumPhotosByAlbumId.bind(null, tdb),
    readAlbumVideosByAlbumId: readAlbumVideosByAlbumId.bind(null, tdb),
    readThingsByAlbumId: readThingsByAlbumId.bind(null, tdb),
    readTripAlbums: getTripAlbums.bind(null, tdb),
    readAllVideos: readAllVideos.bind(null, tdb),
    readAllPhotoUrns: readAllPhotoUrns.bind(null, tdb),
    readWildBirdChecklist: readWildBirdChecklist.bind(null, tdb),
    readNamedTypeThings: readNamedTypeThings.bind(null, tdb),
  };
}

/*
 * Load the application state from localStorage or return defaults.
 */
export async function loadState(): Promise<State> {
  const { tdb, regularBirdSpecies } = await loadData();

  return {
    currentAlbum: undefined,
    currentPhoto: undefined,
    currentUrn: undefined,
    currentType: undefined,
    data: tdb,
    regularBirdSpecies,
    sidebarVisible: false,
    services: loadServices(tdb),
  };
}
