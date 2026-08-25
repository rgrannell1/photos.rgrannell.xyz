import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { loadServices } from "./state.ts";
import type { NemesisSpecies } from "./services/stats.ts";
import type {
  parseAlbum,
  parseAmphibian,
  parseBird,
  parseCountry,
  parseFeature,
  parseArthropod,
  parseFish,
  parseMammal,
  parsePhoto,
  parsePlace,
  parsePlane,
  parseReptile,
  parseTransfer,
  parseUnesco,
  parseVideo,
} from "./services/parsers.ts";
import type { Present } from "./commons/maybe.ts";

/*
 * broadcast and listen type against this map, so payloads cannot drift from
 * their listeners.
 */
export type ApplicationEventPayloads = {
  click_burger_menu: Record<string, never>;
  navigate: { route: string };
};

export type ApplicationEvents = keyof ApplicationEventPayloads;

export type EnvConfig = {
  photos_url: string;
  publication_id: string;
};

/*
 * Flag assets baked in by the build: a hashed AVIF sprite, and a hashed SVG
 * per big flag.
 */
export type FlagManifest = {
  sprite: string;
  cellWidth: number;
  cellHeight: number;
  count: number;
  positions: Record<string, number>;
  big: Record<string, string>;
};

export type AppWindow = typeof window & {
  stats: Stats;
  envConfig: EnvConfig;
  flags: FlagManifest;
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

export type Services = ReturnType<typeof loadServices>;

/*
 * Read before medialess pruning drops unphotographed species from `data`.
 * Used by the life-list page.
 */
export type CatalogueFacts = {
  regularBirdSpecies: number;
  irishMammalSpecies: number;
  nemesisBirds: NemesisSpecies[];
  nemesisMammals: NemesisSpecies[];
};

/*
 * Application-wide state.
 */
export type State = {
  data: TribbleDB;
  services: Services;
  // false until the tribble stream and the final derivation pass complete
  loaded: boolean;
  catalogue: CatalogueFacts;
  sidebarVisible: boolean;
};

// TribbleDB is untyped and provides triples, not objects. These structures type the parsed triples.

export type Album = Present<ReturnType<typeof parseAlbum>>;

export type Transfer = Present<ReturnType<typeof parseTransfer>>;

export type Photo = Present<ReturnType<typeof parsePhoto>>;

export type Video = Present<ReturnType<typeof parseVideo>>;

export type Place = Present<ReturnType<typeof parsePlace>>;

export type Country = Present<ReturnType<typeof parseCountry>>;

export type Unesco = Present<ReturnType<typeof parseUnesco>>;

export type Bird = Present<ReturnType<typeof parseBird>>;

export type Mammal = Present<ReturnType<typeof parseMammal>>;

export type Reptile = Present<ReturnType<typeof parseReptile>>;

export type Amphibian = Present<ReturnType<typeof parseAmphibian>>;

export type Arthropod = Present<ReturnType<typeof parseArthropod>>;

export type Fish = Present<ReturnType<typeof parseFish>>;

export type Plane = Present<ReturnType<typeof parsePlane>>;

export type Feature = Present<ReturnType<typeof parseFeature>>;

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
  | Subject
  | Bird
  | Mammal
  | Reptile
  | Amphibian
  | Arthropod
  | Plane;

export function isACountry(place: Place | Country): place is Country {
  return !!(place as Country).flag;
}
