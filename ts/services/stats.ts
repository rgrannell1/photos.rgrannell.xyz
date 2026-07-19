/*
 * Wildlife statistics and the bird life-list, derived from subject triples.
 */

import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { countryUrn } from "../models/urn.ts";
import { KnownRelations, KnownTypes } from "../constants/data.ts";

export type SubjectStats = {
  wildSpecies: number;
  totalSpecies: number;
  irishWildSpecies: number;
};

/*
 * Count wild, total, and Irish wild bird species seen across all photos.
 *
 * "Wild" means the subject URN has ?context=wild (or no context).
 * "Irish" means the base bird URN has a birdwatchUrl relation.
 */
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
    .filter({ has: KnownRelations.BIRDWATCH_URL })
    .ids().size;

  return {
    wildSpecies: wildBirdIds.size,
    totalSpecies: allBirdIds.size,
    irishWildSpecies,
  };
}

const IRELAND_URN = countryUrn("ireland");

/*
 * Count wild, total, and Irish wild mammal species seen across all photos.
 *
 * "Wild" means the subject URN has ?context=wild (or no context).
 * "Irish" means the photo also has a location relation to Ireland (transitive).
 */
export function readMammalStats(tdb: TribbleDB): SubjectStats {
  const wildMammalTriples = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL, qs: { context: "wild" } },
  }).triples();

  const allMammalSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL },
  }).triples();

  // Build photo -> [mammal ids] map for wild subjects
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

  // Photos with an Ireland location (transitive, so includes places within Ireland)
  const irelandPhotoUrns = new Set(
    tdb.search({
      relation: KnownRelations.LOCATION,
      target: IRELAND_URN,
    }).sources(),
  );

  // Wild mammal species seen in Ireland
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

/*
 * Count bird species Ireland regularly records, from the wildlife.llm.toml
 * status="regular" relation. Must be read before medialess-species pruning,
 * which drops the unphotographed catalogue entries. Returns 0 if absent.
 */
export function countRegularBirdSpecies(tdb: TribbleDB): number {
  return tdb.search({
    relation: KnownRelations.STATUS,
    target: "regular",
  }).triples().length;
}

export type NemesisSpecies = {
  speciesId: string;
  name: string;
};

/*
 * Nemesis species (things.toml nemesis="true") of one type not yet photographed —
 * the "yet to see" targets. Must be read before medialess-species pruning drops them.
 */
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
    species.push({ speciesId, name: firstValue(speciesThing?.name) ?? speciesId });
  }
  return species;
}

// Rarity bands (from wildlife.llm.toml) that count as scarce for the tag.
const SCARCE_RARITY_BANDS = new Set(["scarce", "rare", "vagrant"]);

export type ChecklistEntry = {
  speciesId: string;
  speciesType: string;
  name: string;
  firstSeen: string;
  isIrish: boolean;
  isWild: boolean;
  scarce: boolean;
  nemesis: boolean;
  target: boolean;
};

/*
 * First value of a triple field, which TribbleDB may return as a scalar or array.
 */
function firstValue(raw: unknown): string | undefined {
  if (Array.isArray(raw)) {
    return raw[0] as string | undefined;
  }
  return raw as string | undefined;
}

/*
 * Read the life-list for one species type, sorted chronologically by first sighting.
 *
 * Includes both wild and captive sightings. "First seen" is read directly
 * from the firstSeen triple relation on each species URN.
 * isWild is true if the species has been photographed in a wild context at least once.
 * isIrish comes from the wildlife catalogue's irish marker, with the BirdWatch
 * URL as a fallback for birds published before the marker existed.
 */
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

    const name = firstValue(speciesThing?.name) ?? speciesId;

    const hasBirdwatchUrl = tdb.search({
      source: { type: speciesType, id: speciesId },
      relation: KnownRelations.BIRDWATCH_URL,
    }).triples().length > 0;
    const isIrish = firstValue(speciesThing?.irish) === "true" || hasBirdwatchUrl;

    const isWild = wildSpeciesIds.has(speciesId);

    // scarce (data-derived): IRBC-rare status, or a low abundance band
    const scarce = firstValue(speciesThing?.status) === "rare" ||
      SCARCE_RARITY_BANDS.has(firstValue(speciesThing?.rarity) ?? "");
    const nemesis = firstValue(speciesThing?.nemesis) === "true";
    const target = firstValue(speciesThing?.target) === "true";

    entries.push({
      speciesId,
      speciesType,
      name,
      firstSeen: firstSeen as string,
      isIrish,
      isWild,
      scarce,
      nemesis,
      target,
    });
  }

  // Sort chronologically — earliest first-sighting first
  entries.sort((entryA, entryB) =>
    parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen)
  );

  return entries;
}

/*
 * Read the bird life-list.
 */
export function readWildBirdChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.BIRD);
}

/*
 * Read the mammal life-list.
 */
export function readWildMammalChecklist(tdb: TribbleDB): ChecklistEntry[] {
  return readWildlifeChecklist(tdb, KnownTypes.MAMMAL);
}

/*
 * Count mammal species in the Irish wildlife catalogue, via the irish marker
 * triple. Must be read before medialess-species pruning drops the
 * unphotographed catalogue entries. Returns 0 if absent.
 */
export function countIrishMammalSpecies(tdb: TribbleDB): number {
  return tdb.search({
    source: { type: KnownTypes.MAMMAL },
    relation: KnownRelations.IRISH,
    target: "true",
  }).triples().length;
}
