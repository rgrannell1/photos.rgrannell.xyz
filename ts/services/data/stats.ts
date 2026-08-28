/* Wildlife statistics and bird life-list from subject triples. */

import { asUrn } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations, KnownTypes } from "../../constants/data.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
  withDefault,
} from "../../commons/maybe.ts";
import type { ChecklistEntry, NemesisSpecies, SubjectStats } from "../../domain/stats.ts";

/* Wild = ?context=wild. Irish = irish marker. */
export function readBirdStats(tdb: TribbleDB): SubjectStats {
  const wildBirdSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.BIRD, qs: { context: "wild" } },
  }).triples();

  const allBirdSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.BIRD },
  }).triples();

  const wildBirdIds = new Set(
    wildBirdSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );
  const allBirdIds = new Set(
    allBirdSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );

  const irishWildSpecies = tdb
    .nodes({ type: KnownTypes.BIRD, id: [...wildBirdIds] })
    .filter({ has: KnownRelations.IRISH })
    .ids().size;

  return {
    wildSpecies: wildBirdIds.size,
    totalSpecies: allBirdIds.size,
    irishWildSpecies,
  };
}

// Countries are place entities with numeric ids. There is no urn:ró:place:ireland.
const IRELAND_NAME = "Ireland";

function findIrelandUrn(tdb: TribbleDB): Maybe<string> {
  const urn = tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.NAME,
    target: IRELAND_NAME,
  }).firstSource();
  return fromNullable(urn);
}

function readWildMammalTriples(tdb: TribbleDB) {
  return tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL, qs: { context: "wild" } },
  }).triples();
}

function groupWildMammalsByPhoto(
  triples: ReturnType<typeof readWildMammalTriples>,
): Map<string, Set<string>> {
  const grouped = new Map<string, Set<string>>();
  for (const [photoUrn, , targetUrn] of triples) {
    const mammalIds = grouped.get(photoUrn) ?? new Set<string>();
    mammalIds.add(asUrn(targetUrn).id);
    grouped.set(photoUrn, mammalIds);
  }
  return grouped;
}

function readIrelandPhotoUrns(tdb: TribbleDB): Set<string> {
  const irelandUrn = findIrelandUrn(tdb);
  if (!isSome(irelandUrn)) {
    return new Set();
  }
  return new Set(tdb.search({
    relation: KnownRelations.LOCATION,
    target: irelandUrn,
  }).sources());
}

function readIrishWildMammalIds(
  tdb: TribbleDB,
  triples: ReturnType<typeof readWildMammalTriples>,
): Set<string> {
  const photoMammals = groupWildMammalsByPhoto(triples);
  const irelandPhotos = readIrelandPhotoUrns(tdb);
  const mammalIds = new Set<string>();
  for (const [photoUrn, photoMammalIds] of photoMammals) {
    if (!irelandPhotos.has(photoUrn)) {
      continue;
    }
    for (const mammalId of photoMammalIds) {
      mammalIds.add(mammalId);
    }
  }
  return mammalIds;
}

/* Wild = ?context=wild. Irish = location relation to Ireland (transitive). */
export function readMammalStats(tdb: TribbleDB): SubjectStats {
  const wildMammalTriples = readWildMammalTriples(tdb);
  const allMammalSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL },
  }).triples();
  const wildMammalIds = new Set(
    wildMammalTriples.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );
  const allMammalIds = new Set(
    allMammalSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );

  return {
    wildSpecies: wildMammalIds.size,
    totalSpecies: allMammalIds.size,
    irishWildSpecies: readIrishWildMammalIds(tdb, wildMammalTriples).size,
  };
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
  const nemesisTriples = tdb.search({
    source: { type: speciesType },
    relation: KnownRelations.NEMESIS,
    target: "true",
  }).triples();

  const species: NemesisSpecies[] = [];
  for (const [speciesUrn] of nemesisTriples) {
    const speciesId = asUrn(speciesUrn).id;
    const photographed = tdb.search({
      source: { type: speciesType, id: speciesId },
      relation: KnownRelations.FIRST_SEEN,
    }).triples().length > 0;
    if (photographed) {
      continue;
    }
    const speciesThing = tdb.search({
      source: { type: speciesType, id: speciesId },
    }).firstObject();
    species.push({
      speciesId,
      name: withDefault(one(fromNullable(speciesThing?.name)), speciesId),
    });
  }
  return species;
}

// Rarity bands (from wildlife.llm.toml) that count as scarce for the tag.
const SCARCE_RARITY_BANDS = new Set(["scarce", "rare", "vagrant"]);

/* Sorted chronologically by first sighting. Includes wild and captive sightings. */
function readWildlifeChecklist(tdb: TribbleDB, speciesType: string): ChecklistEntry[] {
  const firstSeenTriples = tdb.search({
    source: { type: speciesType },
    relation: KnownRelations.FIRST_SEEN,
  }).triples();

  const wildSpeciesIds = readWildSpeciesIds(tdb, speciesType);

  const entries: ChecklistEntry[] = [];

  for (const [speciesUrn, , firstSeen] of firstSeenTriples) {
    const speciesId = asUrn(speciesUrn).id;
    if (speciesId === "unknown") continue;

    entries.push(
      readChecklistEntry(tdb, speciesType, speciesId, firstSeen, wildSpeciesIds),
    );
  }

  entries.sort((entryA, entryB) =>
    parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen)
  );

  return entries;
}

function readWildSpeciesIds(tdb: TribbleDB, speciesType: string): Set<string> {
  return new Set(
    tdb.search({
      relation: KnownRelations.SUBJECT,
      target: { type: speciesType, qs: { context: "wild" } },
    }).triples().map(([, , speciesUrn]) => asUrn(speciesUrn).id),
  );
}

function readChecklistEntry(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
  firstSeen: string,
  wildSpeciesIds: Set<string>,
): ChecklistEntry {
  const speciesThing = tdb.search({
    source: { type: speciesType, id: speciesId },
  }).firstObject();
  const name = withDefault(one(fromNullable(speciesThing?.name)), speciesId);
  // Scarce means IRBC-rare status or a low abundance band.
  const isScarce = one(fromNullable(speciesThing?.status)) === "rare" ||
    SCARCE_RARITY_BANDS.has(withDefault(one(fromNullable(speciesThing?.rarity)), ""));

  return {
    speciesId,
    speciesType,
    name,
    firstSeen,
    isIrish: one(fromNullable(speciesThing?.irish)) === "true",
    isWild: wildSpeciesIds.has(speciesId),
    scarce: isScarce,
    nemesis: one(fromNullable(speciesThing?.nemesis)) === "true",
    target: one(fromNullable(speciesThing?.target)) === "true",
  };
}

export function readWildBirdChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.BIRD);
}

export function readWildMammalChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.MAMMAL);
}

/* Must read before medialess-species pruning. */
export function countIrishMammalSpecies(tdb: TribbleDB): number {
  return tdb.search({
    source: { type: KnownTypes.MAMMAL },
    relation: KnownRelations.IRISH,
    target: "true",
  }).triples().length;
}
