/* Parser-to-reader registry. */

import { readers } from "./parser.ts";
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

export const { many: readCountries } = readers<Country>(parseCountry);
export const { one: readPlace, many: readPlaces } = readers<Place>(parsePlace);
export const { many: readLocations } = readers<Place | Unesco>(parseLocation);
export const { many: readUnescos } = readers<Unesco>(parseUnesco);
export const { one: readAlbum, many: readAlbums } = readers<Album>(parseAlbum);
export const { many: readTransfers } = readers<Transfer>(parseTransfer);
export const { one: readVideo, many: readVideos } = readers<Video>(parseVideo);
export const { one: readPhoto, many: readPhotos } = readers<Photo>(parsePhoto);
export const { many: readFeatures } = readers<Feature>(parseFeature);
