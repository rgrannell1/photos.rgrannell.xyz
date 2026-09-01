/* Support photos operations. */

/* Support photos operations. */
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { asUrn, type Triple, type TripleObject } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Photo } from "../../../types/domain.ts";
import { readPhoto } from "../readers.ts";
import { selectFirst } from "../../../commons/collections/arrays.ts";
import { isNone, type Maybe, withDefault } from "../../../commons/collections/maybe.ts";
import type { ThingNodes } from "./photos.ts";

/** Order photos from newest to oldest by creation timestamp. */
export function comparePhotosNewest(photoA: Photo, photoB: Photo): number {
  const timestampA = parseInt(photoA.createdAt);
  const timestampB = parseInt(photoB.createdAt);
  return timestampB - timestampA;
}

/** Order photo objects from newest to oldest, with missing dates treated as zero. */
export function comparePhotoObjectsNewest(
  objectA: TripleObject,
  objectB: TripleObject,
): number {
  const timestampA = parseInt(withDefault(selectFirst(objectA.createdAt), "0"));
  const timestampB = parseInt(withDefault(selectFirst(objectB.createdAt), "0"));
  return timestampB - timestampA;
}

/** Read the first object identifier when one exists. */
export function readObjectId(object: TripleObject): Maybe<string> {
  return selectFirst(object.id);
}

/** Select the database node identified by a thing URN. */
export function readThingNode(tdb: TribbleDB, thingUrn: string) {
  const { type, id } = asUrn(thingUrn);
  return tdb.nodes({ type, id });
}

/** Union the nodes for all supplied thing URNs. */
export function collectThingNodes(tdb: TribbleDB, thingUrns: Set<string>) {
  let things = tdb.nodes([]);
  for (const thingUrn of thingUrns) {
    const thing = readThingNode(tdb, thingUrn);
    things = things.union(thing);
  }
  return things;
}

/** Read photo URNs that reference the selected thing nodes. */
export function readPhotoIdsForThings(things: ThingNodes): Set<string> {
  return things.referencedBy()
    .filter({ type: KnownTypes.PHOTO })
    .urns();
}

/** Read cover relations from photos to the requested target type. */
export function readCoverTriples(tdb: TribbleDB, type: string) {
  const query = {
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  };
  const triples = tdb.search(query).triples();
  return triples;
}

/** Read the photo at the source of a cover relation. */
export function readCoverPhoto(
  tdb: TribbleDB,
  coverTriple: Triple,
): Maybe<Photo> {
  const photoUrn = coverTriple[0];
  return readPhoto(tdb, photoUrn);
}

/** Read the target identifier from a cover relation. */
export function readCoverId(coverTriple: Triple): string {
  return asUrn(coverTriple[2]).id;
}

/** Add the first valid cover for a target identifier. */
export function addThingCover(
  covers: Map<string, Photo>,
  tdb: TribbleDB,
  coverTriple: Triple,
): void {
  const id = readCoverId(coverTriple);
  if (covers.has(id)) return;
  const photo = readCoverPhoto(tdb, coverTriple);
  if (isNone(photo)) return;
  covers.set(id, photo);
}
