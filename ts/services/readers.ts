/* Parser-to-reader registry. */

import { readers } from "../commons/parser.ts";

import {
  parseAlbum,
  parseCountry,
  parseFeature,
  parseLocation,
  parsePhoto,
  parsePlace,
  parseSubject,
  parseTransfer,
  parseUnesco,
  parseVideo,
} from "./parsers.ts";

export const { many: readCountries } = readers(parseCountry);
export const { one: readPlace, many: readPlaces } = readers(parsePlace);
export const { many: readLocations } = readers(parseLocation);
export const { many: readUnescos } = readers(parseUnesco);
export const { one: readAlbum, many: readAlbums } = readers(parseAlbum);
export const { many: readTransfers } = readers(parseTransfer);
export const { many: readSubjects } = readers(parseSubject);
export const { one: readVideo, many: readVideos } = readers(parseVideo);
export const { one: readPhoto, many: readPhotos } = readers(parsePhoto);
export const { many: readFeatures } = readers(parseFeature);
