/* Geographic models with validated coordinates and cover data. */

/* Geographic models with validated coordinates and cover data. */
import type { Place } from "../types/domain.ts";

export type GeocodedPlace = Place & {
  latitude: number;
  longitude: number;
};

export type GeocodedPlaceWithCover = GeocodedPlace & {
  coverThumbnailUrl?: string;
};
