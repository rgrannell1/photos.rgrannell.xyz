/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { asUrn, type Triple, type TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  KnownRelations,
  SpeciesStatus,
  SubjectContext,
} from "../../../constants/data.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../../../commons/collections/maybe.ts";
import type {
  ChecklistEntry,
  NemesisSpecies,
} from "../../../domain/media/stats.ts";
import type { SubjectTriples } from "../stats.ts";
import { SCARCE_RARITY_BANDS } from "../stats.ts";
import { readSubjectIds } from "./subjects.ts";
import { readSpeciesThing } from "./birds.ts";
import { readChecklistEntry } from "./checklist.ts";

/** Resolves the display name for an unphotographed nemesis species. */
export function readNemesisSpecies(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
): NemesisSpecies {
  const speciesThing = readSpeciesThing(tdb, speciesType, speciesId);
  const name = withDefault(
    selectFirst(fromNullable(speciesThing?.name)),
    speciesId,
  );
  return {
    speciesId,
    name,
  };
}

/** Reads first-sighting triples for one species type. */
export function readFirstSeenTriples(
  tdb: TribbleDB,
  speciesType: string,
): Triple[] {
  const query = {
    source: { type: speciesType },
    relation: KnownRelations.FIRST_SEEN,
  };
  const triples = tdb.search(query).triples();
  return triples;
}

/** Appends a checklist entry only when one exists. */
export function addChecklistResult(
  entries: ChecklistEntry[],
  entry: Maybe<ChecklistEntry>,
): void {
  if (isSome(entry)) entries.push(entry);
}

/** Omits unknown species and resolves other first sightings as checklist entries. */
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

/** Converts first-sighting triples into known checklist entries. */
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

/** Orders checklist entries by their numeric first-sighting year. */
export function compareFirstSeen(
  entryA: ChecklistEntry,
  entryB: ChecklistEntry,
): number {
  return parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen);
}

/** Reads species identifiers recorded in a wild subject context. */
export function readWildSpeciesIds(
  tdb: TribbleDB,
  speciesType: string,
): Set<string> {
  const query = {
    relation: KnownRelations.SUBJECT,
    target: { type: speciesType, qs: { context: SubjectContext.Wild } },
  };
  const subjectIds = readSubjectIds(tdb, query);
  return subjectIds;
}

/** Sorted chronologically by first sighting. Includes wild and captive sightings. */
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

/** Tests whether a species has the explicit rare status. */
export function hasRareStatus(speciesThing: TripleObject | undefined): boolean {
  const status = selectFirst(fromNullable(speciesThing?.status));
  return status === SpeciesStatus.Rare;
}

/** Tests whether a species rarity belongs to a scarce display band. */
export function hasScarceRarity(
  speciesThing: TripleObject | undefined,
): boolean {
  const rarity = withDefault(
    selectFirst(fromNullable(speciesThing?.rarity)),
    "",
  );
  const isScarce = SCARCE_RARITY_BANDS.has(rarity);
  return isScarce;
}
