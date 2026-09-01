import { KnownTypes, ThingListKind } from "../../constants/data.ts";
import type { Place, Unesco } from "../../types/domain.ts";
import { parseByType, parseObject } from "./parser.ts";
import { AlbumSchema } from "../../schemas/album.ts";
import { PhotoSchema } from "../../schemas/photo.ts";
import { VideoSchema } from "../../schemas/video.ts";
import {
  FeatureSchema,
  PlaceSchema,
  UnescoSchema,
} from "../../schemas/place.ts";
import {
  AmphibianSchema,
  ArthropodSchema,
  BirdSchema,
  FishSchema,
  MammalSchema,
  PlaneSchema,
  ReptileSchema,
} from "../../schemas/subject.ts";
import { TransferSchema } from "../../schemas/transfer.ts";

export const parseFeature = parseObject(FeatureSchema, ThingListKind.FEATURE);
export const parseCountry = parseObject(PlaceSchema, KnownTypes.PLACE);
export const parseUnesco = parseObject(UnescoSchema, KnownTypes.UNESCO);
export const parsePhoto = parseObject(PhotoSchema, KnownTypes.PHOTO);
export const parseBird = parseObject(BirdSchema, KnownTypes.BIRD);
export const parseMammal = parseObject(MammalSchema, KnownTypes.MAMMAL);
export const parseReptile = parseObject(ReptileSchema, KnownTypes.REPTILE);
export const parseAmphibian = parseObject(AmphibianSchema, KnownTypes.AMPHIBIAN);
export const parseArthropod = parseObject(ArthropodSchema, KnownTypes.ARTHROPOD);
export const parseFish = parseObject(FishSchema, KnownTypes.FISH);
export const parsePlane = parseObject(PlaneSchema, KnownTypes.PLANE);
export const parseVideo = parseObject(VideoSchema, KnownTypes.VIDEO);
export const parsePlace = parseObject(PlaceSchema, KnownTypes.PLACE);
export const parseAlbum = parseObject(AlbumSchema, KnownTypes.ALBUM);
export const parseTransfer = parseObject(TransferSchema, KnownTypes.TRANSFER);

export const parseLocation = parseByType<Place | Unesco>({
  [KnownTypes.PLACE]: parsePlace,
  [KnownTypes.UNESCO]: parseUnesco,
});
