/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { type TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { DATA_TRUE } from "../../../constants/data.ts";
import { fromNullable, withDefault } from "../../../commons/collections/maybe.ts";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import type { ChecklistFlags } from "../stats.ts";
import { readSpeciesThing } from "./birds.ts";
import { hasRareStatus, hasScarceRarity } from "./mammals.ts";

/** Reports whether species data marks a species as rare or scarce. */
export function isScarceSpecies(
  speciesThing: TripleObject | undefined,
): boolean {
  return hasRareStatus(speciesThing) || hasScarceRarity(speciesThing);
}

/** Reads Irish and wild-origin flags for a checklist species. */
export function readOriginFlags(
  speciesThing: TripleObject | undefined,
  speciesId: string,
  wildSpeciesIds: Set<string>,
): Pick<ChecklistFlags, "isIrish" | "isWild"> {
  const isIrish = selectFirst(fromNullable(speciesThing?.irish)) === DATA_TRUE;
  const isWild = wildSpeciesIds.has(speciesId);
  return { isIrish, isWild };
}

/** Reports whether a triple value contains the canonical true marker. */
export function hasDataFlag(value: string | string[] | undefined): boolean {
  return selectFirst(fromNullable(value)) === DATA_TRUE;
}

/** Reads scarcity, nemesis, and target flags from species data. */
export function readStatusFlags(
  speciesThing: TripleObject | undefined,
): Pick<ChecklistFlags, "scarce" | "nemesis" | "target"> {
  const scarce = isScarceSpecies(speciesThing);
  const nemesis = hasDataFlag(speciesThing?.nemesis);
  const target = hasDataFlag(speciesThing?.target);
  return { scarce, nemesis, target };
}

/** Reads the species name, with its ID as the fallback. */
export function readChecklistName(
  speciesThing: TripleObject | undefined,
  speciesId: string,
): string {
  return withDefault(selectFirst(fromNullable(speciesThing?.name)), speciesId);
}

/** Combines origin and status flags for a checklist species. */
export function readChecklistFlags(
  speciesThing: TripleObject | undefined,
  speciesId: string,
  wildSpeciesIds: Set<string>,
): ChecklistFlags {
  const originFlags = readOriginFlags(speciesThing, speciesId, wildSpeciesIds);
  const statusFlags = readStatusFlags(speciesThing);
  return { ...originFlags, ...statusFlags };
}

/** Builds a checklist entry from species data and its first sighting. */
export function readChecklistEntry(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
  firstSeen: string,
  wildSpeciesIds: Set<string>,
): ChecklistEntry {
  const speciesThing = readSpeciesThing(tdb, speciesType, speciesId);
  const name = readChecklistName(speciesThing, speciesId);
  const flags = readChecklistFlags(speciesThing, speciesId, wildSpeciesIds);

  return {
    speciesId,
    speciesType,
    name,
    firstSeen,
    ...flags,
  };
}
