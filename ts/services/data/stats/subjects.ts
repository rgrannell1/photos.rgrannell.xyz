/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { fromNullable, type Maybe } from "../../../commons/collections/maybe.ts";
import type { SubjectStats } from "../../../domain/media/stats.ts";
import type { SubjectQuery, SubjectTriples } from "../stats.ts";
import { IRELAND_QUERY } from "../stats.ts";

/** Read all triples that match a subject statistics query. */
export function readSubjectTriples(tdb: TribbleDB, query: SubjectQuery) {
  return tdb.search(query).triples();
}

/** Collect unique target identifiers from subject triples. */
export function collectSubjectIds(subjects: SubjectTriples): Set<string> {
  const subjectIds = new Set<string>();
  for (const [, , targetUrn] of subjects) {
    const subjectId = asUrn(targetUrn).id;
    subjectIds.add(subjectId);
  }
  return subjectIds;
}

/** Read the unique subject identifiers selected by a query. */
export function readSubjectIds(
  tdb: TribbleDB,
  query: SubjectQuery,
): Set<string> {
  const subjects = readSubjectTriples(tdb, query);
  return collectSubjectIds(subjects);
}

/** Read bird nodes whose identifiers occur in the supplied set. */
export function readBirdNodes(tdb: TribbleDB, birdIds: Set<string>) {
  return tdb.nodes({ type: KnownTypes.BIRD, id: [...birdIds] });
}

/** Count photographed wild bird species that have an Irish classification. */
export function countIrishWildSpecies(
  tdb: TribbleDB,
  wildBirdIds: Set<string>,
): number {
  const wildBirds = readBirdNodes(tdb, wildBirdIds);
  const irishWildBirds = wildBirds.filter({ has: KnownRelations.IRISH });
  const irishWildBirdIds = irishWildBirds.ids();
  return irishWildBirdIds.size;
}

/** Build bird species statistics from wild, total, and Irish counts. */
export function makeBirdStats(
  wildBirdIds: Set<string>,
  allBirdIds: Set<string>,
  irishWildSpecies: number,
): SubjectStats {
  return {
    wildSpecies: wildBirdIds.size,
    totalSpecies: allBirdIds.size,
    irishWildSpecies,
  };
}

/** Find Ireland's URN when the catalogue defines it. */
export function findIrelandUrn(tdb: TribbleDB): Maybe<string> {
  const urn = tdb.search(IRELAND_QUERY).firstSource();
  return fromNullable(urn);
}

/** Read photo sources whose location matches the supplied URN. */
export function readLocationSources(
  tdb: TribbleDB,
  locationUrn: string,
): Set<string> {
  const sources = tdb.search({
    relation: KnownRelations.LOCATION,
    target: locationUrn,
  }).sources();
  const sourceUrns = new Set(sources);
  return sourceUrns;
}

/** Extract the identifier from a subject URN. */
export function readSubjectId(subjectUrn: string): string {
  return asUrn(subjectUrn).id;
}

/** Add a mammal subject to the set grouped under its photo URN. */
export function addMammalPhoto(
  grouped: Map<string, Set<string>>,
  photoUrn: string,
  targetUrn: string,
): void {
  const mammalIds = grouped.get(photoUrn) ?? new Set<string>();
  const mammalId = readSubjectId(targetUrn);
  mammalIds.add(mammalId);
  grouped.set(photoUrn, mammalIds);
}
