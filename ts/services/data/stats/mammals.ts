/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations } from "../../../constants/data.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../../domain/media/stats.ts";
import type { SubjectTriples } from "../stats.ts";
import { SCARCE_RARITY_BANDS } from "../stats.ts";
import { readSubjectIds } from "./subjects.ts";
import { readSpeciesThing } from "./birds.ts";
import { readChecklistEntry } from "./checklist.ts";

export function readNemesisSpecies(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
): NemesisSpecies {
  const speciesThing = readSpeciesThing(tdb, speciesType, speciesId);
  const name = withDefault(one(fromNullable(speciesThing?.name)), speciesId);
  return {
    speciesId,
    name,
  };
}

export function readFirstSeenTriples(tdb: TribbleDB, speciesType: string) {
  const query = {
    source: { type: speciesType },
    relation: KnownRelations.FIRST_SEEN,
  };
  const triples = tdb.search(query).triples();
  return triples;
}

/* Sorted chronologically by first sighting. Includes wild and captive sightings. */
export function readWildlifeChecklist(
  tdb: TribbleDB,
  speciesType: string,
): ChecklistEntry[] {
  const firstSeenTriples = readFirstSeenTriples(tdb, speciesType);
  const wildSpeciesIds = readWildSpeciesIds(tdb, speciesType);

  const entries = collectChecklistEntries(
    tdb,
    speciesType,
    firstSeenTriples,
    wildSpeciesIds,
  );
  return entries.sort(compareFirstSeen);
}

export function collectChecklistEntries(
  tdb: TribbleDB,
  speciesType: string,
  firstSeenTriples: SubjectTriples,
  wildSpeciesIds: Set<string>,
): ChecklistEntry[] {
  const entries: ChecklistEntry[] = [];
  for (const [speciesUrn, , firstSeen] of firstSeenTriples) {
    const entry = readChecklistEntryMaybe(
      tdb,
      speciesType,
      speciesUrn,
      firstSeen,
      wildSpeciesIds,
    );
    addChecklistResult(entries, entry);
  }
  return entries;
}

export function addChecklistResult(
  entries: ChecklistEntry[],
  entry: Maybe<ChecklistEntry>,
): void {
  if (isSome(entry)) entries.push(entry);
}

export function readChecklistEntryMaybe(
  tdb: TribbleDB,
  speciesType: string,
  speciesUrn: string,
  firstSeen: string,
  wildSpeciesIds: Set<string>,
): Maybe<ChecklistEntry> {
  const speciesId = asUrn(speciesUrn).id;
  if (speciesId === "unknown") return NONE;
  const entry = readChecklistEntry(
    tdb,
    speciesType,
    speciesId,
    firstSeen,
    wildSpeciesIds,
  );
  return entry;
}

export function compareFirstSeen(
  entryA: ChecklistEntry,
  entryB: ChecklistEntry,
): number {
  return parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen);
}

export function readWildSpeciesIds(
  tdb: TribbleDB,
  speciesType: string,
): Set<string> {
  const query = {
    relation: KnownRelations.SUBJECT,
    target: { type: speciesType, qs: { context: "wild" } },
  };
  const subjectIds = readSubjectIds(tdb, query);
  return subjectIds;
}

export function hasRareStatus(speciesThing: TripleObject | undefined): boolean {
  const status = one(fromNullable(speciesThing?.status));
  return status === "rare";
}

export function hasScarceRarity(
  speciesThing: TripleObject | undefined,
): boolean {
  const rarity = withDefault(one(fromNullable(speciesThing?.rarity)), "");
  const isScarce = SCARCE_RARITY_BANDS.has(rarity);
  return isScarce;
}
