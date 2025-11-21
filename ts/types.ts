import { TribbleDB } from "@rgrannell1/tribbledb";
import type { loadServices } from "./state.ts";
import type {
  parseAlbum,
  parseAmphibian,
  parseBird,
  parseCountry,
  parseFeature,
  parseFish,
  parseInsect,
  parseMammal,
  parsePhoto,
  parsePlace,
  parseReptile,
  parseUnesco,
  parseVideo,
} from "./services/parsers.ts";

export type ApplicationEvents =
  | "click_burger_menu"
  | "switch_theme"
  | "click_photo_metadata"
  | "photo_loaded"
  | "navigate";

export type EnvConfig = {
  photos_url: string;
  publication_id: string;
};

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
 * TODO make this a sum-type,
 * since there's no need to have multiple current focuses at once in the type
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

export type Bird = NonNullable<ReturnType<typeof parseBird>>;

export type Mammal = NonNullable<ReturnType<typeof parseMammal>>;

export type Reptile = NonNullable<ReturnType<typeof parseReptile>>;

export type Amphibian = NonNullable<ReturnType<typeof parseAmphibian>>;

export type Insect = NonNullable<ReturnType<typeof parseInsect>>;

export type Fish = NonNullable<ReturnType<typeof parseFish>>;

export type Feature = NonNullable<ReturnType<typeof parseFeature>>;

export type Subject = Bird | Mammal | Reptile | Amphibian | Insect | Fish;

export type Location = Place | Country | Unesco;

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

export function isACountry(place: Place | Country): place is Country {
  return (place as Country).type === "country";
}
