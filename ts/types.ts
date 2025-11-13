import { TribbleDB } from "@rgrannell1/tribbledb";
import type { loadServices } from "./state.ts";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded"
  | "navigate";

export type AppWindow = typeof window & {
  stats: Stats;
};

/*
 * Stats injected into the HTML page to prevent an additional fetch
 */
export type Stats = {
  photos: number;
  albums: number;
  years: number;
  countries: number;
  bird_species: number;
  mammal_species: number;
  amphibian_species: number;
  reptile_species: number;
  unesco_sites: number;
};

/*
 *
 */
export type Services = ReturnType<typeof loadServices>

/*
 * Application-wide state.
 *
 * TODO make this a sum-type
 */
export type State = {
  data: TribbleDB;
  services: Services;
  darkMode: boolean;
  sidebarVisible: boolean;
  currentAlbum: string | undefined;
  currentPhoto: string | undefined;
  currentType: string | undefined;
  currentUrn: string | undefined;
};

/*
 * TribbleDB is untyped; it provides triples not objects. So we'll parse triples onto these data-structures.
 */

export type Album = {
  name: string;
  minDate: number;
  maxDate: number;
  thumbnailUrl: string;
  mosaicColours: string;
  id: string;
  photosCount: number;
  videosCount: number;
  description: string;
  countries: Country[];
};

export type Photo = {
  albumId: string;
  country?: string | string[];
  createdAt: string;
  exposureTime?: string;
  fStop?: string;
  focalLength?: string;
  fullImage: string;
  height?: string;
  id: string;
  iso?: string;
  location?: string | string[];
  midImageLossyUrl: string;
  model?: string;
  mosaicColours: string;
  pngUrl: string;
  rating?: string;
  style?: string;
  thumbnailUrl: string;
  width?: string;
  subject?: string | string[];

  // TODO.
  description?: string;
  summary?: string;
};

export type Video = {
  id: string;
  albumId: string;
  description: string;
  posterUrl: string;
  videoUrl480p: string;
  videoUrl720p: string;
  videoUrl1080p: string;
  videoUrlUnscaled: string;
};

export type Place = {
  id: string;
  type: "place";
  name: string;
  feature?: string | string[];
  in?: (Place | Country)[]; // NOTE: deep-parsed by default
  shortName?: string;
  wikipedia?: string;
  unescoId?: string;
};

export type Country = {
  id: string;
  type: "country";
  flag?: string;
  name: string;
  contains?: string | string[];
};

export type Unesco = {
  id: string;
  name?: string;
  longitude?: string;
  latitude?: string;
};

export type Subject = {
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Bird = {
  type: "bird";
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Mammal = {
  type: "mammal";
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Reptile = {
  type: "reptile";
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Amphibian = {
  type: "amphibian";
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Insect = {
  type: "insect";
  id: string;
  name?: string;
  wikipedia?: string;
};

export type Feature = {
  id: string;
  name?: string;
};

export function isACountry(place: Place | Country): place is Country {
  return (place as Country).type === "country";
}

export type Thing =
  | Album
  | Photo
  | Video
  | Place
  | Country
  | Subject
  | Bird
  | Mammal
  | Reptile
  | Amphibian
  | Insect;
