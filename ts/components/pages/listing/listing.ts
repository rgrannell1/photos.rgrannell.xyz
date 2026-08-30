import { type TripleObject } from "@rgrannell1/tribbledb";

import type { Photo } from "../../../types/domain.ts";

import type { SubjectStats } from "../../../domain/media/stats.ts";

import { type Maybe } from "../../../commons/collections/maybe.ts";
import { viewListingPage } from "./page.ts";

type ReadThingCover = (urn: string) => Maybe<Photo>;

export type DrawThingAlbumOptions = {
  coverCache: Map<string, Maybe<Photo>>;
  readThingCover: ReadThingCover;
  listingType: string;
};

export type CoveredThing = {
  thing: TripleObject;
  id: string;
  cover: Photo;
};

export type AlbumsListAttrs = {
  readThingCover: ReadThingCover;
  things: TripleObject[];
  listingType: string;
};

export type BirdListingDetailsAttrs = {
  stats: SubjectStats;
  filter: Maybe<string>;
  onToggleIreland: () => void;
};

export type ListingDetailsAttrs = {
  type: string;
  stats: Maybe<SubjectStats>;
  filter: Maybe<string>;
  onToggleIreland: () => void;
};

export type ListingPageAttrs = {
  type: string;
  things: TripleObject[];
  label: string;
  isListable: boolean;
  stats: Maybe<SubjectStats>;
  readThingCover: ReadThingCover;
  visible: boolean;
  filter: Maybe<string>;
};

/*
 * Each member of a category, e.g countries.
 */
export function ListingPage() {
  return { view: viewListingPage };
}
