/*
 * The service registry: every reader exposed to pages, unbound. Each takes
 * the TribbleDB as its first argument; state.ts binds them all to the loaded
 * instance.
 */

import {
  readAlbumPhotosByAlbumId,
  readAlbumsByThingIds,
  readAlbumVideosByAlbumId,
  readAllAlbums,
  readThingsByAlbumId,
  readTransferPolylines,
  readTripAlbums,
  readYearRecap,
} from "./albums.ts";
import { readAllVideos, readVideosByThingIds } from "./videos.ts";
import {
  readAlbum,
  readAmphibian,
  readCountries,
  readCountry,
  readFeatures,
  readFish,
  readArthropod,
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
} from "./readers.ts";
import {
  readBirdStats,
  readMammalStats,
  readWildBirdChecklist,
  readWildMammalChecklist,
} from "./stats.ts";
import {
  readAllPhotoUrns,
  readCategoryCover,
  readPhotosByThingIds,
  readSeenInCountries,
  readThingCover,
  readThingCovers,
} from "./photos.ts";
import {
  readNamedTypeThings,
  readThing,
  readThings,
  toThingLinks,
} from "../commons/things.ts";
import { namesToUrns } from "./names.ts";
import {
  readAllCountries,
  readGeocodedPlaces,
  readGeocodedPlacesWithCovers,
} from "./places.ts";

export const SERVICE_READERS = {
  readThing,
  readAlbum,
  readCountry,
  readPlace,
  readPhoto,
  readMammal,
  readReptile,
  readAmphibian,
  readFish,
  readArthropod,
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
  readTransferPolylines,
  readBirdStats,
  readMammalStats,
  readAllAlbums,
  readAlbumPhotosByAlbumId,
  readAlbumVideosByAlbumId,
  readThingsByAlbumId,
  readTripAlbums,
  readAllVideos,
  readAllPhotoUrns,
  readWildBirdChecklist,
  readWildMammalChecklist,
  readNamedTypeThings,
};
