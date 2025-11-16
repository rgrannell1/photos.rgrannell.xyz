import { TribbleDB } from "@rgrannell1/tribbledb";
import type { loadServices } from "./state.ts";
import type { parseAlbum } from "./parsers/album.ts";
import type { parsePhoto } from "./parsers/photo.ts";
import type { parseVideo } from "./parsers/video.ts";
import type { parsePlace } from "./parsers/location.ts";
import type { parseCountry } from "./parsers/location.ts";
import type { parseUnesco } from "./parsers/location.ts";
import type { parseSubject } from "./parsers/subject.ts";
import type { parseBird } from "./parsers/subject.ts";
import type { parseMammal } from "./parsers/subject.ts";
import type { parseReptile } from "./parsers/subject.ts";
import type { parseAmphibian } from "./parsers/subject.ts";
import type { parseInsect } from "./parsers/subject.ts";
import type { parseFeature } from "./parsers/feature.ts";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded"
  | "navigate";

export type EnvConfig = {
  photos_url: string;
  publication_id: string;
}

export type AppWindow = typeof window & {
  stats: Stats;
  envConfig: EnvConfig;
};

/*
 * Stats injected into the HTML page to prevent an additional fetch
 */
export type Stats = {
  photos: number;
  videos: number;
  albums: number;
  years: number;
  countries: number;
  bird_species: number;
  mammal_species: number;
  amphibian_species: number;
  reptile_species: number;
  unesco_sites: number;
};

/* */
export type Services = ReturnType<typeof loadServices>;

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

export type Album = NonNullable<ReturnType<typeof parseAlbum>>;
export type Photo = NonNullable<ReturnType<typeof parsePhoto>>;
export type Video = NonNullable<ReturnType<typeof parseVideo>>;
export type Place = NonNullable<ReturnType<typeof parsePlace>>;
export type Country = NonNullable<ReturnType<typeof parseCountry>>;
export type Unesco = NonNullable<ReturnType<typeof parseUnesco>>;
export type Location = Place | Country | Unesco;
export type Subject = NonNullable<ReturnType<typeof parseSubject>>;
export type Bird = NonNullable<ReturnType<typeof parseBird>>;
export type Mammal = NonNullable<ReturnType<typeof parseMammal>>;
export type Reptile = NonNullable<ReturnType<typeof parseReptile>>;
export type Amphibian = NonNullable<ReturnType<typeof parseAmphibian>>;
export type Insect = NonNullable<ReturnType<typeof parseInsect>>;
export type Feature = NonNullable<ReturnType<typeof parseFeature>>;

// TODO patch this
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
