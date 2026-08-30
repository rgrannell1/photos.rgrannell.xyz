/* Wildlife statistics and bird life-list from subject triples. */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { DATA_TRUE, KnownRelations, KnownTypes } from "../../constants/data.ts";

import type {
  ChecklistEntry,
  NemesisSpecies,
  SubjectStats,
} from "../../domain/media/stats.ts";
import {
  collectSubjectIds,
  countIrishWildSpecies,
  makeBirdStats,
  readSubjectIds,
  readSubjectTriples,
} from "./stats/subjects.ts";
import {
  addUnphotographedNemesis,
  countIrishWildMammals,
  makeMammalStats,
  readNemesisTriples,
} from "./stats/birds.ts";
import { readWildlifeChecklist } from "./stats/mammals.ts";

const WILD_BIRD_QUERY = {
  relation: KnownRelations.SUBJECT,
  target: { type: KnownTypes.BIRD, qs: { context: "wild" } },
} as const;

const ALL_BIRD_QUERY = {
  relation: KnownRelations.SUBJECT,
  target: { type: KnownTypes.BIRD },
} as const;

const WILD_MAMMAL_QUERY = {
  relation: KnownRelations.SUBJECT,
  target: { type: KnownTypes.MAMMAL, qs: { context: "wild" } },
} as const;

const ALL_MAMMAL_QUERY = {
  relation: KnownRelations.SUBJECT,
  target: { type: KnownTypes.MAMMAL },
} as const;

export type SubjectQuery = {
  relation: string;
  target: { type: string; qs?: { context: string } };
};

export type SubjectTriples = ReturnType<typeof readSubjectTriples>;

/* Wild = ?context=wild. Irish = irish marker. */
export function readBirdStats(tdb: TribbleDB): SubjectStats {
  const wildBirdIds = readSubjectIds(tdb, WILD_BIRD_QUERY);
  const allBirdIds = readSubjectIds(tdb, ALL_BIRD_QUERY);
  const irishWildSpecies = countIrishWildSpecies(tdb, wildBirdIds);
  return makeBirdStats(wildBirdIds, allBirdIds, irishWildSpecies);
}

// Countries are place entities with numeric ids. There is no urn:ró:place:ireland.
const IRELAND_NAME = "Ireland";

export const IRELAND_QUERY = {
  source: { type: KnownTypes.PLACE },
  relation: KnownRelations.NAME,
  target: IRELAND_NAME,
} as const;

/* Wild = ?context=wild. Irish = location relation to Ireland (transitive). */
export function readMammalStats(tdb: TribbleDB): SubjectStats {
  const wildMammalTriples = readSubjectTriples(tdb, WILD_MAMMAL_QUERY);
  const wildMammalIds = collectSubjectIds(wildMammalTriples);
  const allMammalIds = readSubjectIds(tdb, ALL_MAMMAL_QUERY);
  const irishWildSpecies = countIrishWildMammals(tdb, wildMammalTriples);

  return makeMammalStats(wildMammalIds, allMammalIds, irishWildSpecies);
}

/* Must read before medialess-species pruning. */
export function countRegularBirdSpecies(tdb: TribbleDB): number {
  return tdb.search({
    relation: KnownRelations.STATUS,
    target: "regular",
  }).triples().length;
}

/* Must read before medialess-species pruning. */
export function collectUnphotographedNemesis(
  tdb: TribbleDB,
  speciesType: string,
): NemesisSpecies[] {
  const nemesisTriples = readNemesisTriples(tdb, speciesType);
  const species: NemesisSpecies[] = [];
  for (const [speciesUrn] of nemesisTriples) {
    addUnphotographedNemesis(species, tdb, speciesType, speciesUrn);
  }
  return species;
}

// Rarity bands (from wildlife.llm.toml) that count as scarce for the tag.
export const SCARCE_RARITY_BANDS = new Set(["scarce", "rare", "vagrant"]);

export type ChecklistFlags = Pick<
  ChecklistEntry,
  "isIrish" | "isWild" | "scarce" | "nemesis" | "target"
>;

export function readWildBirdChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.BIRD);
}

export function readWildMammalChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.MAMMAL);
}

/* Must read before medialess-species pruning. */
export function countIrishMammalSpecies(tdb: TribbleDB): number {
  const query = {
    source: { type: KnownTypes.MAMMAL },
    relation: KnownRelations.IRISH,
    target: DATA_TRUE,
  };
  const triples = tdb.search(query).triples();
  return triples.length;
}
