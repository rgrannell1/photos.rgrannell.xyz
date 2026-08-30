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

export type Album = InferOutput<typeof AlbumSchema> & { type: "album" };
export type Transfer = InferOutput<typeof TransferSchema> & {
  type: "transfer";
};
export type Photo = InferOutput<typeof PhotoSchema> & { type: "photo" };
export type Video = InferOutput<typeof VideoSchema> & { type: "video" };
export type Place = InferOutput<typeof PlaceSchema> & { type: "place" };
export type Country = InferOutput<typeof PlaceSchema> & { type: "place" };
export type Unesco = InferOutput<typeof UnescoSchema> & { type: "unesco" };
export type Bird = InferOutput<typeof BirdSchema> & { type: "bird" };
export type Mammal = InferOutput<typeof MammalSchema> & { type: "mammal" };
export type Reptile = InferOutput<typeof ReptileSchema> & { type: "reptile" };
export type Amphibian = InferOutput<typeof AmphibianSchema> & {
  type: "amphibian";
};
export type Arthropod = InferOutput<typeof ArthropodSchema> & {
  type: "arthropod";
};
export type Fish = InferOutput<typeof FishSchema> & { type: "fish" };
export type Plane = InferOutput<typeof PlaneSchema> & { type: "plane" };
export type Feature = InferOutput<typeof FeatureSchema> & { type: "feature" };

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

export function isACountry(place: Place | Country): place is Country {
  return !!place.flag;
}
