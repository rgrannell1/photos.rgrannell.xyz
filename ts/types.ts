import { TribbleDB } from "@rgrannell1/tribbledb";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded";

export type State = {
  data: TribbleDB;
  darkMode: boolean;
  sidebarVisible: boolean;
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
