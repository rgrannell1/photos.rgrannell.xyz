import { KnownTypes } from "../constants.ts";
import type {
  Amphibian,
  Bird,
  Fish,
  Insect,
  Mammal,
  Reptile,
  Stats,
} from "../types.ts";
import { parseByType, parseObject } from "../commons/parser.ts";
import {
  AlbumSchema,
  AmphibianSchema,
  BirdSchema,
  CarSchema,
  CountrySchema,
  FeatureSchema,
  FishSchema,
  InsectSchema,
  MammalSchema,
  PhotoSchema,
  PlaceSchema,
  PlaneSchema,
  ReptileSchema,
  StatsSchema,
  TrainSchema,
  TransferSchema,
  UnescoSchema,
  VideoSchema,
} from "../schemas.ts";
import { safeParse } from "valibot";
import type { TribbleDB } from "@rgrannell1/tribbledb";

export const parseFeature = parseObject(FeatureSchema, "feature");
export const parseCountry = parseObject(CountrySchema, "country");
export const parseUnesco = parseObject(UnescoSchema, "unesco");
export const parsePhoto = parseObject(PhotoSchema, "photo");
export const parseBird = parseObject(BirdSchema, "bird");
export const parseMammal = parseObject(MammalSchema, "mammal");
export const parseReptile = parseObject(ReptileSchema, "reptile");
export const parseAmphibian = parseObject(AmphibianSchema, "amphibian");
export const parseInsect = parseObject(InsectSchema, "insect");
export const parseFish = parseObject(FishSchema, "fish");
export const parsePlane = parseObject(PlaneSchema, "plane");
export const parseTrain = parseObject(TrainSchema, "train");
export const parseCar = parseObject(CarSchema, "car");
export const parseVideo = parseObject(VideoSchema, "video");
export const parsePlace = parseObject(PlaceSchema, "place");
export const parseAlbum = parseObject(AlbumSchema, "album");
export const parseTransfer = parseObject(TransferSchema, "transfer");

/*
 * Parse known subject types
 */
export const parseSubject = parseByType<
  Bird | Mammal | Reptile | Amphibian | Insect | Fish
>({
  [KnownTypes.BIRD]: parseBird,
  [KnownTypes.MAMMAL]: parseMammal,
  [KnownTypes.REPTILE]: parseReptile,
  [KnownTypes.AMPHIBIAN]: parseAmphibian,
  [KnownTypes.INSECT]: parseInsect,
  [KnownTypes.FISH]: parseFish,
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
 * Parse stats object
 */
export function parseStats(stats: unknown): Stats | undefined {
  return safeParse(StatsSchema, stats).success ? (stats as Stats) : undefined;
}
