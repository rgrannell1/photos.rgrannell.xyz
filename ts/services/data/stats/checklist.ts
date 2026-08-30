/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../commons/collections/arrays.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { DATA_TRUE } from "../../../constants/data.ts";
import { fromNullable, withDefault } from "../../../commons/collections/maybe.ts";
import type { ChecklistEntry } from "../../../domain/media/stats.ts";
import type { ChecklistFlags } from "../stats.ts";
import { readSpeciesThing } from "./birds.ts";
import { hasRareStatus, hasScarceRarity } from "./mammals.ts";

export function isScarceSpecies(
  speciesThing: TripleObject | undefined,
): boolean {
  return hasRareStatus(speciesThing) || hasScarceRarity(speciesThing);
}

export function readOriginFlags(
  speciesThing: TripleObject | undefined,
  speciesId: string,
  wildSpeciesIds: Set<string>,
): Pick<ChecklistFlags, "isIrish" | "isWild"> {
  const isIrish = one(fromNullable(speciesThing?.irish)) === DATA_TRUE;
  const isWild = wildSpeciesIds.has(speciesId);
  return { isIrish, isWild };
}

export function hasDataFlag(value: string | string[] | undefined): boolean {
  return one(fromNullable(value)) === DATA_TRUE;
}

export function readStatusFlags(
  speciesThing: TripleObject | undefined,
): Pick<ChecklistFlags, "scarce" | "nemesis" | "target"> {
  const scarce = isScarceSpecies(speciesThing);
  const nemesis = hasDataFlag(speciesThing?.nemesis);
  const target = hasDataFlag(speciesThing?.target);
  return { scarce, nemesis, target };
}

export function readChecklistName(
  speciesThing: TripleObject | undefined,
  speciesId: string,
): string {
  return withDefault(one(fromNullable(speciesThing?.name)), speciesId);
}

export function readChecklistFlags(
  speciesThing: TripleObject | undefined,
  speciesId: string,
  wildSpeciesIds: Set<string>,
): ChecklistFlags {
  const originFlags = readOriginFlags(speciesThing, speciesId, wildSpeciesIds);
  const statusFlags = readStatusFlags(speciesThing);
  return { ...originFlags, ...statusFlags };
}

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
