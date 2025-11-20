import { KnownTypes } from "../constants.ts";
import type { Amphibian, Bird, Insect, Mammal, Reptile, Stats } from "../types.ts";
import { parseByType, parseObject } from "../commons/parser.ts";
import {
  AlbumSchema,
  AmphibianSchema,
  BirdSchema,
  CountrySchema,
  FeatureSchema,
  InsectSchema,
  MammalSchema,
  PhotoSchema,
  PlaceSchema,
  ReptileSchema,
  StatsSchema,
  UnescoSchema,
  VideoSchema,
} from "../schemas.ts";
import { safeParse, type InferOutput } from "valibot";
import type { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { logParseWarning } from "../commons/logger.ts";
import { arrayify } from "../commons/arrays.ts";

export const parseFeature = parseObject(FeatureSchema, "feature");
export const parseCountry = parseObject(CountrySchema, "country");
export const parseUnesco = parseObject(UnescoSchema, "unesco");
export const parsePhoto = parseObject(PhotoSchema, "photo");
export const parseBird = parseObject(BirdSchema, "bird");
export const parseMammal = parseObject(MammalSchema, "mammal");
export const parseReptile = parseObject(ReptileSchema, "reptile");
export const parseAmphibian = parseObject(AmphibianSchema, "amphibian");
export const parseInsect = parseObject(InsectSchema, "insect");
export const parseVideo = parseObject(VideoSchema, "video");
export const parsePlace = parseObject(PlaceSchema, "place");

/*
 * Parse known subject types
 */
export const parseSubject = parseByType<
  Bird | Mammal | Reptile | Amphibian | Insect
>({
  [KnownTypes.BIRD]: parseBird,
  [KnownTypes.MAMMAL]: parseMammal,
  [KnownTypes.REPTILE]: parseReptile,
  [KnownTypes.AMPHIBIAN]: parseAmphibian,
  [KnownTypes.INSECT]: parseInsect
});

/*
 * Parse on object identified by a location relation
 */
export const parseLocation = parseByType<any>({
  [KnownTypes.PLACE]: parsePlace,
  [KnownTypes.COUNTRY]: parseCountry,
  [KnownTypes.UNESCO]: parseUnesco,
});

/*
 * Read album-data
 *
 * @param tdb The TribbleDB instance to read from.
 * @param album The raw album object from the TribbleDB.
 * @returns The parsed album.
 */
export function parseAlbum(tdb: TribbleDB, album: TripleObject) {
  const result = safeParse(AlbumSchema, album);
  if (!result.success) {
    logParseWarning(result.issues);
    throw new Error(`Failed to parse album with id ${album.id}`);
  }

  const data = result.output;
  const countryNames: Set<string> = new Set(arrayify(data.flags));

  return {
    type: "album",
    id: data.id,
    name: data.name,
    trip: data.trip,
    minDate: data.minDate,
    maxDate: data.maxDate,
    thumbnailUrl: data.thumbnailUrl,
    mosaicColours: data.mosaic,
    photosCount: data.photosCount,
    videosCount: data.videosCount,
    description: data.description ?? "",
    countries: countryNames,
  };
}

/*
 *
 */
export function parseStats(stats: unknown): Stats | undefined {
  return safeParse(StatsSchema, stats).success
    ? (stats as Stats)
    : undefined;
}