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

/*
 * Application events and their payloads. broadcast and listen are typed
 * against this map, so payloads cannot drift from their listeners.
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
 * Flag assets baked in by the build: the hashed AVIF emoji sprite with its
 * cell layout, and a hashed SVG per big flag within the byte budget.
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
 * The route's focus: which entity the current page points at. Only one page
 * is active at a time, so this is a discriminated union rather than a bag
 * of optional fields.
 */
export type Focus =
  | { page: "none" }
  | { page: "album"; urn: string }
  | { page: "photo"; urn: string }
  | { page: "video"; urn: string }
  | { page: "thing"; urn: string }
  | { page: "listing"; type: string };

/*
 * Catalogue facts read before medialess pruning drops the unphotographed
 * species from `data`. Consumed by the life-list page.
 */
export type CatalogueFacts = {
  regularBirdSpecies: number;
  irishMammalSpecies: number;
  nemesisBirds: NemesisSpecies[];
  nemesisMammals: NemesisSpecies[];
};

/*
 * Application-wide state: the data layer, the pre-prune catalogue facts,
 * the UI chrome, and the route focus.
 */
export type State = {
  data: TribbleDB;
  services: Services;
  // false until the tribble stream and the final derivation pass complete
  loaded: boolean;
  catalogue: CatalogueFacts;
  sidebarVisible: boolean;
  focus: Focus;
};

// TribbleDB is untyped and provides triples, not objects. These structures type the parsed triples.

export type Album = NonNullable<ReturnType<typeof parseAlbum>>;

export type Transfer = NonNullable<ReturnType<typeof parseTransfer>>;

export type Photo = NonNullable<ReturnType<typeof parsePhoto>>;

export type Video = NonNullable<ReturnType<typeof parseVideo>>;

export type Place = NonNullable<ReturnType<typeof parsePlace>>;

export type Country = NonNullable<ReturnType<typeof parseCountry>>;

export type Unesco = NonNullable<ReturnType<typeof parseUnesco>>;

export type Bird = NonNullable<ReturnType<typeof parseBird>>;

export type Mammal = NonNullable<ReturnType<typeof parseMammal>>;

export type Reptile = NonNullable<ReturnType<typeof parseReptile>>;

export type Amphibian = NonNullable<ReturnType<typeof parseAmphibian>>;

export type Arthropod = NonNullable<ReturnType<typeof parseArthropod>>;

export type Fish = NonNullable<ReturnType<typeof parseFish>>;

export type Plane = NonNullable<ReturnType<typeof parsePlane>>;

export type Feature = NonNullable<ReturnType<typeof parseFeature>>;

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
