import { KnownTypes } from "../constants/data.ts";
import type {
  Amphibian,
  Arthropod,
  Bird,
  Fish,
  Mammal,
  Place,
  Reptile,
  Stats,
  Unesco,
} from "../types.ts";
import { parseByType, parseObject } from "../commons/parser.ts";
import { AlbumSchema } from "../schemas/album.ts";
import { PhotoSchema } from "../schemas/photo.ts";
import { VideoSchema } from "../schemas/video.ts";
import {
  FeatureSchema,
  PlaceSchema,
  UnescoSchema,
} from "../schemas/place.ts";
import {
  AmphibianSchema,
  ArthropodSchema,
  BirdSchema,
  CarSchema,
  FishSchema,
  MammalSchema,
  PlaneSchema,
  ReptileSchema,
  TrainSchema,
} from "../schemas/subject.ts";
import { TransferSchema } from "../schemas/transfer.ts";
import { StatsSchema } from "../schemas/stats.ts";
import { safeParse } from "valibot";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";

export const parseFeature = parseObject(FeatureSchema, "feature");
export const parseCountry = parseObject(PlaceSchema, "place");
export const parseUnesco = parseObject(UnescoSchema, "unesco");
export const parsePhoto = parseObject(PhotoSchema, "photo");
export const parseBird = parseObject(BirdSchema, "bird");
export const parseMammal = parseObject(MammalSchema, "mammal");
export const parseReptile = parseObject(ReptileSchema, "reptile");
export const parseAmphibian = parseObject(AmphibianSchema, "amphibian");
export const parseArthropod = parseObject(ArthropodSchema, "arthropod");
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
  Bird | Mammal | Reptile | Amphibian | Arthropod | Fish
>({
  [KnownTypes.BIRD]: parseBird,
  [KnownTypes.MAMMAL]: parseMammal,
  [KnownTypes.REPTILE]: parseReptile,
  [KnownTypes.AMPHIBIAN]: parseAmphibian,
  [KnownTypes.ARTHROPOD]: parseArthropod,
  [KnownTypes.FISH]: parseFish,
});

/*
 * Parse on object identified by a location relation
 */
export const parseLocation = parseByType<Place | Unesco>({
  [KnownTypes.PLACE]: parsePlace,
  [KnownTypes.UNESCO]: parseUnesco,
});

/*
 * Parse stats object
 */
export function parseStats(stats: unknown): Stats | undefined {
  return safeParse(StatsSchema, stats).success ? (stats as Stats) : undefined;
}
