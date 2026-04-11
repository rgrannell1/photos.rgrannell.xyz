import { TribbleDB } from "@rgrannell1/tribbledb";
import { readers } from "../commons/parser.ts";
import { KnownTypes } from "../constants.ts";
import type { Country } from "../types.ts";

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
  parseTransfer,
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
export const { one: readTransfer, many: readTransfers } = readers(parseTransfer);
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

/*
 * Read all countries from the TribbleDB, sorted by name
 */
export function readAllCountries(tdb: TribbleDB): Country[] {
  const ids = tdb.search({
    source: { type: KnownTypes.COUNTRY },
  }).sources();

  const countries = readCountries(tdb, ids) as Country[];

  const flagToName = new Map(
    countries
      .filter((country) => country.flag)
      .map((country) => [country.flag!, country.name]),
  );

  return countries.sort((countryA, countryB) => {
    const nameA = flagToName.get(countryA.flag ?? "") ?? countryA.name;
    const nameB = flagToName.get(countryB.flag ?? "") ?? countryB.name;
    return nameA.localeCompare(nameB);
  });
}
