import type { TripleObject } from "@rgrannell1/tribbledb";

import type {
  Album,
  Country,
  Photo as PhotoType,
  Video as VideoType,
} from "../../../../types/domain.ts";

import { type ReadThingList } from "../../../thing/thing-list/thing-list.ts";
import type { ThingListKind } from "../../../../constants/data.ts";

import type { ReadThingEmoji } from "../../../thing/navigation/thing-link.ts";
import { type Maybe } from "../../../../commons/collections/maybe.ts";
import { readSeenIn } from "../data/cache.ts";
import { viewThingPage } from "./page.ts";

export type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  listingTitle: Maybe<string>;
  titleEmoji: string;
  isBinomial: boolean;
  readSeenInCountries: (urns: Set<string>) => Country[];
  readAlbumEntries: (urns: Set<string>) => AlbumEntry[];
  readVideos: (urns: Set<string>) => VideoType[];
  readPhotos: (urns: Set<string>) => PhotoType[];
  readThingList: ReadThingList;
  readThingEmoji: ReadThingEmoji;
  readTaxonMembers: (urn: string) => TripleObject[];
  readThingCover: (urn: string) => Maybe<PhotoType>;
  visible: boolean;
};

export type UrnCache<Value extends object> = {
  lastUrn: Maybe<string>;
  value: Maybe<Value>;
  compute: (attrs: ThingPageAttrs) => Value;
};

export type CachedReader<Value extends object> = (
  attrs: ThingPageAttrs,
) => Value;

export type SeenInCountry = ReturnType<typeof readSeenIn>[number];

export type AlbumEntry = {
  album: Album;
  countries: Country[];
};

export type ThingMetadata = {
  label: string;
  kind: ThingListKind;
  values: string | string[] | undefined;
};

/** Creates the thing page component. */
export function ThingPage() {
  return { view: viewThingPage };
}
