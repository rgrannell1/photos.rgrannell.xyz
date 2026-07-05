/*
 * Wildlife statistics and the bird life-list, derived from subject triples.
 */

import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { countryUrn } from "../models/urn.ts";
import { KnownRelations, KnownTypes } from "../constants.ts";

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

export type ChecklistEntry = {
  birdId: string;
  name: string;
  firstSeen: string;
  isIrish: boolean;
  isWild: boolean;
};

/*
 * Read the bird life-list, sorted chronologically by first sighting.
 *
 * Includes both wild and captive sightings. "First seen" is read directly
 * from the firstSeen triple relation on each bird URN.
 * isWild is true if the bird has been photographed in a wild context at least once.
 */
export function readWildBirdChecklist(tdb: TribbleDB): ChecklistEntry[] {
  const firstSeenTriples = tdb.search({
    source: { type: KnownTypes.BIRD },
    relation: KnownRelations.FIRST_SEEN,
  }).triples();

  const wildBirdIds = new Set(
    tdb.search({
      relation: KnownRelations.SUBJECT,
      target: { type: KnownTypes.BIRD, qs: { context: "wild" } },
    }).triples().map(([, , birdUrn]) => asUrn(birdUrn).id),
  );

  const entries: ChecklistEntry[] = [];

  for (const [birdUrn, , firstSeen] of firstSeenTriples) {
    const birdId = asUrn(birdUrn).id;
    if (birdId === "unknown") continue;

    const birdThing = tdb.search({
      source: { type: KnownTypes.BIRD, id: birdId },
    }).firstObject();

    const rawName = birdThing?.name;
    const name =
      (Array.isArray(rawName) ? rawName[0] : rawName as string | undefined) ??
        birdId;

    const isIrish = tdb.search({
      source: { type: KnownTypes.BIRD, id: birdId },
      relation: KnownRelations.BIRDWATCH_URL,
    }).triples().length > 0;

    const isWild = wildBirdIds.has(birdId);

    entries.push({ birdId, name, firstSeen: firstSeen as string, isIrish, isWild });
  }

  // Sort chronologically — earliest first-sighting first
  entries.sort((entryA, entryB) =>
    parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen)
  );

  return entries;
}
