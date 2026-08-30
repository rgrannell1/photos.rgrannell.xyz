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

export function readSubjectTriples(tdb: TribbleDB, query: SubjectQuery) {
  return tdb.search(query).triples();
}

export function collectSubjectIds(subjects: SubjectTriples): Set<string> {
  const subjectIds = new Set<string>();
  for (const [, , targetUrn] of subjects) {
    const subjectId = asUrn(targetUrn).id;
    subjectIds.add(subjectId);
  }
  return subjectIds;
}

export function readSubjectIds(
  tdb: TribbleDB,
  query: SubjectQuery,
): Set<string> {
  const subjects = readSubjectTriples(tdb, query);
  return collectSubjectIds(subjects);
}

export function readBirdNodes(tdb: TribbleDB, birdIds: Set<string>) {
  return tdb.nodes({ type: KnownTypes.BIRD, id: [...birdIds] });
}

export function countIrishWildSpecies(
  tdb: TribbleDB,
  wildBirdIds: Set<string>,
): number {
  const wildBirds = readBirdNodes(tdb, wildBirdIds);
  const irishWildBirds = wildBirds.filter({ has: KnownRelations.IRISH });
  const irishWildBirdIds = irishWildBirds.ids();
  return irishWildBirdIds.size;
}

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

export function findIrelandUrn(tdb: TribbleDB): Maybe<string> {
  const urn = tdb.search(IRELAND_QUERY).firstSource();
  return fromNullable(urn);
}

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

export function readSubjectId(subjectUrn: string): string {
  return asUrn(subjectUrn).id;
}

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
