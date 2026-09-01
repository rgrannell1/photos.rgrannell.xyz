/* Parser-to-reader registry. */

/* Parser-to-reader registry. */
import { createReaders } from "./parser.ts";
import type {
  Album,
  Country,
  Feature,
  Photo,
  Place,
  Transfer,
  Unesco,
  Video,
} from "../../types/domain.ts";

import {
  parseAlbum,
  parseCountry,
  parseFeature,
  parseLocation,
  parsePhoto,
  parsePlace,
  parseTransfer,
  parseUnesco,
  parseVideo,
} from "./parsers.ts";

export const { many: readCountries } = createReaders<Country>(parseCountry);
export const { one: readPlace, many: readPlaces } = createReaders<Place>(parsePlace);
export const { many: readLocations } = createReaders<Place | Unesco>(parseLocation);
export const { many: readUnescos } = createReaders<Unesco>(parseUnesco);
export const { one: readAlbum, many: readAlbums } = createReaders<Album>(parseAlbum);
export const { many: readTransfers } = createReaders<Transfer>(parseTransfer);
export const { one: readVideo, many: readVideos } = createReaders<Video>(parseVideo);
export const { one: readPhoto, many: readPhotos } = createReaders<Photo>(parsePhoto);
export const { many: readFeatures } = createReaders<Feature>(parseFeature);
