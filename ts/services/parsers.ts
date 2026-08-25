import { KnownTypes } from "../constants/data.ts";
import type {
  Place,
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
  FishSchema,
  MammalSchema,
  PlaneSchema,
  ReptileSchema,
} from "../schemas/subject.ts";
import { TransferSchema } from "../schemas/transfer.ts";
import { StatsSchema } from "../schemas/stats.ts";
import { safeParse } from "valibot";
import { type Maybe, NONE } from "../commons/maybe.ts";

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
export const parseVideo = parseObject(VideoSchema, "video");
export const parsePlace = parseObject(PlaceSchema, "place");
export const parseAlbum = parseObject(AlbumSchema, "album");
export const parseTransfer = parseObject(TransferSchema, "transfer");

export const parseLocation = parseByType<Place | Unesco>({
  [KnownTypes.PLACE]: parsePlace,
  [KnownTypes.UNESCO]: parseUnesco,
});

export function parseStats(stats: unknown): Maybe<Stats> {
  return safeParse(StatsSchema, stats).success ? (stats as Stats) : NONE;
}
