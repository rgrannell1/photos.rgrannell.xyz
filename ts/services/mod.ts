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
  readTripName,
  readYearRecap,
} from "./albums.ts";
import { readAllVideos, readVideosByThingIds } from "./videos.ts";
import {
  readAlbum,
  readCountries,
  readFeatures,
  readLocations,
  readPhoto,
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
  isBinomialType,
  readListings,
  readNamedTypeThings,
  readThing,
} from "../commons/things.ts";
import {
  readAllCountries,
  readGeocodedPlacesWithCovers,
} from "./places.ts";

export const SERVICE_READERS = {
  readThing,
  readAlbum,
  readPhoto,
  readVideo,
  readLocations,
  readFeatures,
  readUnescos,
  readCountries,
  readAllCountries,
  readThingCover,
  readThingCovers,
  readCategoryCover,
  readPhotosByThingIds,
  readSeenInCountries,
  readAlbumsByThingIds,
  readYearRecap,
  readVideosByThingIds,
  readGeocodedPlacesWithCovers,
  readTransferPolylines,
  readBirdStats,
  readMammalStats,
  readAllAlbums,
  readAlbumPhotosByAlbumId,
  readAlbumVideosByAlbumId,
  readThingsByAlbumId,
  readTripAlbums,
  readTripName,
  readAllVideos,
  readAllPhotoUrns,
  readWildBirdChecklist,
  readWildMammalChecklist,
  readNamedTypeThings,
  readListings,
  isBinomialType,
};
