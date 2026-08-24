/* Service registry: every reader unbound. state.ts binds them to TribbleDB. */

import {
  isAlbumHidden,
  readAlbumPhotosByAlbumId,
  readAlbumsByThingIds,
  readAlbumVideosByAlbumId,
  readAllAlbums,
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
  listingLabel,
  readListings,
  readNamedTypeThings,
  readTaxonMembers,
  readTaxons,
  readThing,
} from "../commons/things.ts";
import {
  readAllCountryThings,
  readAllCountries,
  readGeocodedPlacesWithCovers,
} from "./places.ts";
import { readThingEmoji } from "./emoji.ts";

export const SERVICE_READERS = {
  isAlbumHidden,
  readThingEmoji,
  readListingLabel: listingLabel,
  readThing,
  readAlbum,
  readPhoto,
  readVideo,
  readLocations,
  readFeatures,
  readUnescos,
  readCountries,
  readAllCountryThings,
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
  readTripAlbums,
  readTripName,
  readAllVideos,
  readAllPhotoUrns,
  readWildBirdChecklist,
  readWildMammalChecklist,
  readNamedTypeThings,
  readListings,
  readTaxons,
  readTaxonMembers,
  isBinomialType,
};
