import { parseObject } from "./parser.ts";
import {
  AmphibianSchema,
  BirdSchema,
  CountrySchema,
  FeatureSchema,
  InsectSchema,
  MammalSchema,
  PhotoSchema,
  ReptileSchema,
  UnescoSchema,
  VideoSchema,
} from "./schemas.ts";

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
