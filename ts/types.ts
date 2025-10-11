import { TribbleDB } from "@rgrannell1/tribbledb";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded"
  | "click_album";

export type State = {
  data: TribbleDB;
  darkMode: boolean;
  sidebarVisible: boolean;
  currentAlbum: string | undefined;
};

export type Album = {
  name: string;
  minDate: number;
  maxDate: number;
  thumbnailUrl: string;
  mosaicColours: string;
  id: string;
  photosCount: number;
  countries: {
    urn: string | undefined;
    name: string;
    flag: string | undefined;
  }[];
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
  description?: string;
};
