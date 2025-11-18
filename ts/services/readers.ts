import { TribbleDB } from "@rgrannell1/tribbledb";
import { readers } from "../parsers/parser.ts";
import {
  parseCountry,
  parseLocation,
  parsePlace,
  parseUnesco,
} from "../parsers/location.ts";
import { parseFeature } from "../parsers/feature.ts";
import { parseAlbum } from "../parsers/album.ts";
import {
  parseAmphibian,
  parseInsect,
  parseMammal,
  parseReptile,
  parseSubject,
} from "../parsers/subject.ts";
import { parseVideo } from "../parsers/video.ts";
import { parsePhoto } from "../parsers/photo.ts";

export const {
  one: readFeature,
  many: readFeatures,
} = readers(parseFeature);

export const {
  one: readCountry,
  many: readCountries,
} = readers(parseCountry);

export const {
  one: readPlace,
  many: readPlaces,
} = readers(parsePlace);

export const {
  one: readLocation,
  many: readLocations,
} = readers(parseLocation);

export const {
  one: readUnesco,
  many: readUnescos,
} = readers(parseUnesco);

export const {
  one: readAlbum,
  many: readAlbums,
} = readers(parseAlbum);

export const {
  one: readMammal,
  many: readMammals,
} = readers(parseMammal);

export const {
  one: readReptile,
  many: readReptiles,
} = readers(parseReptile);

export const {
  one: readInsect,
  many: readInsects,
} = readers(parseInsect);

export const {
  one: readSubject,
  many: readSubjects,
} = readers(parseSubject);

export const {
  one: readAmphibian,
  many: readAmphibians,
} = readers(parseAmphibian);

export const {
  one: readVideo,
  many: readVideos,
} = readers(parseVideo);

export const {
  one: readPhoto,
  many: readPhotos,
} = readers(parsePhoto);
