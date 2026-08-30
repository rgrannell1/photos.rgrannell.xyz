/* Support stats operations. */

/* Wildlife statistics and bird life-list from subject triples. */
/* Support stats operations. */
/* Wildlife statistics and bird life-list from subject triples. */
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { DATA_TRUE, KnownRelations } from "../../../constants/data.ts";
import { isSome } from "../../../commons/collections/maybe.ts";
import type { NemesisSpecies, SubjectStats } from "../../../domain/media/stats.ts";
import type { SubjectTriples } from "../stats.ts";
import {
  addMammalPhoto,
  findIrelandUrn,
  readLocationSources,
} from "./subjects.ts";
import { readNemesisSpecies } from "./mammals.ts";

export function groupWildMammalsByPhoto(
  triples: SubjectTriples,
): Map<string, Set<string>> {
  const grouped = new Map<string, Set<string>>();
  for (const [photoUrn, , targetUrn] of triples) {
    addMammalPhoto(grouped, photoUrn, targetUrn);
  }
  const mammalsByPhoto = grouped;
  return mammalsByPhoto;
}

export function readIrelandPhotoUrns(tdb: TribbleDB): Set<string> {
  const irelandUrn = findIrelandUrn(tdb);
  if (!isSome(irelandUrn)) {
    return new Set();
  }
  const photoUrns = readLocationSources(tdb, irelandUrn);
  return photoUrns;
}

export function addIrishMammalIds(
  mammalIds: Set<string>,
  irelandPhotos: Set<string>,
  photoUrn: string,
  photoMammalIds: Set<string>,
): void {
  if (!irelandPhotos.has(photoUrn)) return;
  for (const mammalId of photoMammalIds) mammalIds.add(mammalId);
}

export function readIrishWildMammalIds(
  tdb: TribbleDB,
  triples: SubjectTriples,
): Set<string> {
  const photoMammals = groupWildMammalsByPhoto(triples);
  const irelandPhotos = readIrelandPhotoUrns(tdb);
  const mammalIds = new Set<string>();
  for (const [photoUrn, photoMammalIds] of photoMammals) {
    addIrishMammalIds(mammalIds, irelandPhotos, photoUrn, photoMammalIds);
  }
  return mammalIds;
}

export function makeMammalStats(
  wildMammalIds: Set<string>,
  allMammalIds: Set<string>,
  irishWildSpecies: number,
): SubjectStats {
  return {
    wildSpecies: wildMammalIds.size,
    totalSpecies: allMammalIds.size,
    irishWildSpecies,
  };
}

export function countIrishWildMammals(
  tdb: TribbleDB,
  triples: SubjectTriples,
): number {
  const mammalIds = readIrishWildMammalIds(tdb, triples);
  return mammalIds.size;
}

export function addUnphotographedNemesis(
  species: NemesisSpecies[],
  tdb: TribbleDB,
  speciesType: string,
  speciesUrn: string,
): void {
  const speciesId = asUrn(speciesUrn).id;
  const photographed = isSpeciesPhotographed(tdb, speciesType, speciesId);
  if (photographed) return;
  species.push(readNemesisSpecies(tdb, speciesType, speciesId));
}

export function readNemesisTriples(tdb: TribbleDB, speciesType: string) {
  const query = {
    source: { type: speciesType },
    relation: KnownRelations.NEMESIS,
    target: DATA_TRUE,
  };
  const triples = tdb.search(query).triples();
  return triples;
}

export function isSpeciesPhotographed(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
) {
  const query = {
    source: { type: speciesType, id: speciesId },
    relation: KnownRelations.FIRST_SEEN,
  };
  const triples = tdb.search(query).triples();
  return triples.length > 0;
}

export function readSpeciesThing(
  tdb: TribbleDB,
  speciesType: string,
  speciesId: string,
) {
  return tdb.search({
    source: { type: speciesType, id: speciesId },
  }).firstObject();
}
