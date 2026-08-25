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

/* Wild = ?context=wild. Irish = location relation to Ireland (transitive). */
export function readMammalStats(tdb: TribbleDB): SubjectStats {
  const wildMammalTriples = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL, qs: { context: "wild" } },
  }).triples();

  const allMammalSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL },
  }).triples();

  const wildPhotoToMammals = new Map<string, Set<string>>();
  for (const [photoUrn, , targetUrn] of wildMammalTriples) {
    const mammalId = asUrn(targetUrn).id;
    let mammalSet = wildPhotoToMammals.get(photoUrn);
    if (!mammalSet) {
      mammalSet = new Set();
      wildPhotoToMammals.set(photoUrn, mammalSet);
    }
    mammalSet.add(mammalId);
  }

  // Photos with Ireland location (transitive).
  const irelandUrn = findIrelandUrn(tdb);
  const irelandPhotoUrns = new Set(
    isSome(irelandUrn)
      ? tdb.search({
        relation: KnownRelations.LOCATION,
        target: irelandUrn,
      }).sources()
      : [],
  );

  const irishWildMammalIds = new Set<string>();
  for (const [photoUrn, mammalIds] of wildPhotoToMammals) {
    if (irelandPhotoUrns.has(photoUrn)) {
      for (const mammalId of mammalIds) {
        irishWildMammalIds.add(mammalId);
      }
    }
  }

  const wildMammalIds = new Set(
    wildMammalTriples.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );
  const allMammalIds = new Set(
    allMammalSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );

  return {
    wildSpecies: wildMammalIds.size,
    totalSpecies: allMammalIds.size,
    irishWildSpecies: irishWildMammalIds.size,
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

  const wildSpeciesIds = new Set(
    tdb.search({
      relation: KnownRelations.SUBJECT,
      target: { type: speciesType, qs: { context: "wild" } },
    }).triples().map(([, , speciesUrn]) => asUrn(speciesUrn).id),
  );

  const entries: ChecklistEntry[] = [];

  for (const [speciesUrn, , firstSeen] of firstSeenTriples) {
    const speciesId = asUrn(speciesUrn).id;
    if (speciesId === "unknown") continue;

    const speciesThing = tdb.search({
      source: { type: speciesType, id: speciesId },
    }).firstObject();

    const name = withDefault(one(fromNullable(speciesThing?.name)), speciesId);

    const isIrish = one(fromNullable(speciesThing?.irish)) === "true";

    const isWild = wildSpeciesIds.has(speciesId);

    // scarce (data-derived): IRBC-rare status, or a low abundance band
    const isScarce = one(fromNullable(speciesThing?.status)) === "rare" ||
      SCARCE_RARITY_BANDS.has(
        withDefault(one(fromNullable(speciesThing?.rarity)), ""),
      );
    const nemesis = one(fromNullable(speciesThing?.nemesis)) === "true";
    const target = one(fromNullable(speciesThing?.target)) === "true";

    entries.push({
      speciesId,
      speciesType,
      name,
      firstSeen,
      isIrish,
      isWild,
      scarce: isScarce,
      nemesis,
      target,
    });
  }

  entries.sort((entryA, entryB) =>
    parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen)
  );

  return entries;
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
