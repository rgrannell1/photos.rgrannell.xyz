import m from "mithril";

import type { Photo } from "../../types/domain.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../domain/media/stats.ts";

import { LIFE_LIST_FILTERS } from "../../constants/display.ts";

import { type Maybe } from "../../commons/collections/maybe.ts";
import { viewChecklistPage } from "./checklist/copy.ts";

export type ChecklistDetailsAttrs = {
  entries: ChecklistEntry[];
  filter: string;
  onSelect: (filter: string) => void;
};

export type FilterControl = {
  current: string;
  value: string;
  title: string;
  label: m.Children;
  onSelect: (filter: string) => void;
};

export type FilterDefinition = {
  value: string;
  title: string;
  label: string;
  flag?: string;
};

export type FilterDrawOptions = {
  filter: string;
  onSelect: (filter: string) => void;
};

export const FILTER_DEFINITIONS: FilterDefinition[] = [
  {
    value: LIFE_LIST_FILTERS.IRELAND,
    title: "Irish wild species",
    label: "",
    flag: "Ireland",
  },
  { value: LIFE_LIST_FILTERS.WILD, title: "All wild species", label: "🗺️" },
  {
    value: LIFE_LIST_FILTERS.ALL,
    title: "All species including captive",
    label: "all",
  },
];

export type ChecklistPhotoAttrs = {
  cover: Maybe<Photo>;
  href: string;
  label: string;
};

export type ChecklistCardAttrs = {
  entry: ChecklistEntry;
  cover: Maybe<Photo>;
  position: number;
  showScarce: boolean;
};

export type ChecklistMysteryCardAttrs = {
  species: NemesisSpecies;
  glyph: string;
};

export type ChecklistGridAttrs = {
  entries: ChecklistEntry[];
  covers: Map<string, Photo>;
  nemesisSpecies: NemesisSpecies[];
  mysteryGlyph: string;
  filter: string;
};

export type PositionedEntry = {
  entry: ChecklistEntry;
  position: number;
};

export type ChecklistPageAttrs = {
  entries: ChecklistEntry[];
  covers: Map<string, Photo>;
  regularCount: number;
  nemesisBirds: NemesisSpecies[];
  mammalEntries: ChecklistEntry[];
  mammalCovers: Map<string, Photo>;
  irishMammalCount: number;
  nemesisMammals: NemesisSpecies[];
  visible: boolean;
  filter: string;
};

export type MammalSectionAttrs = {
  mammalEntries: ChecklistEntry[];
  mammalCovers: Map<string, Photo>;
  irishMammalCount: number;
  nemesisMammals: NemesisSpecies[];
};

/*
 * The life-list page. Birds first, then Irish mammals in the Irish view.
 */
export function ChecklistPage() {
  return { view: viewChecklistPage };
}
