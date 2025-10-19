import m from "mithril";
import { ThingLinkAttrs } from "./components/thing-link.ts";
import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded"
  | "navigate";

export type Services = {
  readThing: (id: string) => TripleObject | undefined;
  readAlbum: (id: string) => Album | undefined;
  readCountry: (id: string) => Country | undefined;
  readPlace: (id: string) => Place | undefined;
  readPhoto: (id: string) => Photo | undefined;
  readMammal: (id: string) => Mammal | undefined;
  readReptile: (id: string) => Reptile | undefined;
  readAmphibian: (id: string) => Amphibian | undefined;
  readInsect: (id: string) => Insect | undefined;
  readVideo: (id: string) => Video | undefined;
  toThingLinks: (urns: (string | undefined)[]) => m.Vnode<ThingLinkAttrs, {}>[];
};

export type State = {
  data: TribbleDB;
  darkMode: boolean;
  sidebarVisible: boolean;
  currentAlbum: string | undefined;
  currentPhoto: string | undefined;
  currentType: string | undefined;
  services: Services;
};

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
  countries: {
    urn: string | undefined;
    name: string;
    flag: string | undefined;
  }[];
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

export function isAnInsect(subject: Subject | Insect): subject is Insect {
  return (subject as Insect).type === "insect";
}

export function isAnAmphibian(
  subject: Subject | Amphibian,
): subject is Amphibian {
  return (subject as Amphibian).type === "amphibian";
}

export function isAReptile(subject: Subject | Reptile): subject is Reptile {
  return (subject as Reptile).type === "reptile";
}

export function isAMammal(subject: Subject | Mammal): subject is Mammal {
  return (subject as Mammal).type === "mammal";
}

export function isABird(subject: Subject | Bird): subject is Bird {
  return (subject as Bird).type === "bird";
}

export function isAPlace(place: Place | Country): place is Place {
  return (place as Place).type === "place";
}

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
