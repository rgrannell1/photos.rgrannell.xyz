import { TribbleDB } from "@rgrannell1/tribbledb";
import { readers } from "../commons/parser.ts";

import {
  parseAlbum,
  parseAmphibian,
  parseCountry,
  parseFeature,
  parseFish,
  parseInsect,
  parseLocation,
  parseMammal,
  parsePhoto,
  parsePlace,
  parseReptile,
  parseSubject,
  parseUnesco,
  parseVideo,
} from "./parsers.ts";

export const { one: readCountry, many: readCountries } = readers(parseCountry);
export const { one: readPlace, many: readPlaces } = readers(parsePlace);
export const { one: readLocation, many: readLocations } = readers(
  parseLocation,
);
export const { one: readUnesco, many: readUnescos } = readers(parseUnesco);
export const { one: readAlbum, many: readAlbums } = readers(parseAlbum);
export const { one: readMammal, many: readMammals } = readers(parseMammal);
export const { one: readReptile, many: readReptiles } = readers(parseReptile);
export const { one: readInsect, many: readInsects } = readers(parseInsect);
// Thank you, english.
export const { one: readFish, many: readFishes } = readers(parseFish);
export const { one: readSubject, many: readSubjects } = readers(parseSubject);
export const { one: readAmphibian, many: readAmphibians } = readers(
  parseAmphibian,
);
export const { one: readVideo, many: readVideos } = readers(parseVideo);
export const { one: readPhoto, many: readPhotos } = readers(parsePhoto);
export const { one: readFeature, many: readFeatures } = readers(parseFeature);
