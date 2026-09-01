/* Domain entities parsed from the published triple data. */

/* Domain entities parsed from the published triple data. */
import type { InferOutput } from "valibot";
import type { AlbumSchema } from "../schemas/album.ts";
import type { PhotoSchema } from "../schemas/photo.ts";
import type {
  FeatureSchema,
  PlaceSchema,
  UnescoSchema,
} from "../schemas/place.ts";
import type {
  AmphibianSchema,
  ArthropodSchema,
  BirdSchema,
  FishSchema,
  MammalSchema,
  PlaneSchema,
  ReptileSchema,
} from "../schemas/subject.ts";
import type { TransferSchema } from "../schemas/transfer.ts";
import type { VideoSchema } from "../schemas/video.ts";
import type { KnownTypes, ThingListKind } from "../constants/data.ts";

export type Album = InferOutput<typeof AlbumSchema> & {
  type: `${KnownTypes.ALBUM}`;
};
export type Transfer = InferOutput<typeof TransferSchema> & {
  type: `${KnownTypes.TRANSFER}`;
};
export type Photo = InferOutput<typeof PhotoSchema> & {
  type: `${KnownTypes.PHOTO}`;
};
export type Video = InferOutput<typeof VideoSchema> & {
  type: `${KnownTypes.VIDEO}`;
};
export type Place = InferOutput<typeof PlaceSchema> & {
  type: `${KnownTypes.PLACE}`;
};
export type Country = InferOutput<typeof PlaceSchema> & {
  type: `${KnownTypes.PLACE}`;
};
export type Unesco = InferOutput<typeof UnescoSchema> & {
  type: `${KnownTypes.UNESCO}`;
};
export type Bird = InferOutput<typeof BirdSchema> & {
  type: `${KnownTypes.BIRD}`;
};
export type Mammal = InferOutput<typeof MammalSchema> & {
  type: `${KnownTypes.MAMMAL}`;
};
export type Reptile = InferOutput<typeof ReptileSchema> & {
  type: `${KnownTypes.REPTILE}`;
};
export type Amphibian = InferOutput<typeof AmphibianSchema> & {
  type: `${KnownTypes.AMPHIBIAN}`;
};
export type Arthropod = InferOutput<typeof ArthropodSchema> & {
  type: `${KnownTypes.ARTHROPOD}`;
};
export type Fish = InferOutput<typeof FishSchema> & {
  type: `${KnownTypes.FISH}`;
};
export type Plane = InferOutput<typeof PlaneSchema> & {
  type: `${KnownTypes.PLANE}`;
};
export type Feature = InferOutput<typeof FeatureSchema> & {
  type: `${ThingListKind.FEATURE}`;
};

export type Subject =
  | Bird
  | Mammal
  | Reptile
  | Amphibian
  | Arthropod
  | Fish
  | Plane;

export type Location = Place | Country | Unesco;

export type Thing =
  | Album
  | Photo
  | Video
  | Place
  | Country
  | Subject;

/** Narrow a place to a country when it has a flag. */
export function isACountry(place: Place | Country): place is Country {
  return !!place.flag;
}
