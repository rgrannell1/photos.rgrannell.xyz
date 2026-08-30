/* Support photos operations. */

/* Support photos operations. */
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { asUrn, type Triple, type TripleObject } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Photo } from "../../../types/domain.ts";
import { readPhoto } from "../readers.ts";
import { one } from "../../../commons/collections/arrays.ts";
import { isNone, type Maybe, withDefault } from "../../../commons/collections/maybe.ts";
import type { ThingNodes } from "./photos.ts";

export function comparePhotosNewest(photoA: Photo, photoB: Photo): number {
  const timestampA = parseInt(photoA.createdAt);
  const timestampB = parseInt(photoB.createdAt);
  return timestampB - timestampA;
}

export function comparePhotoObjectsNewest(
  objectA: TripleObject,
  objectB: TripleObject,
): number {
  const timestampA = parseInt(withDefault(one(objectA.createdAt), "0"));
  const timestampB = parseInt(withDefault(one(objectB.createdAt), "0"));
  return timestampB - timestampA;
}

export function readObjectId(object: TripleObject): Maybe<string> {
  return one(object.id);
}

export function readThingNode(tdb: TribbleDB, thingUrn: string) {
  const { type, id } = asUrn(thingUrn);
  return tdb.nodes({ type, id });
}

export function collectThingNodes(tdb: TribbleDB, thingUrns: Set<string>) {
  let things = tdb.nodes([]);
  for (const thingUrn of thingUrns) {
    const thing = readThingNode(tdb, thingUrn);
    things = things.union(thing);
  }
  return things;
}

export function readPhotoIdsForThings(things: ThingNodes): Set<string> {
  return things.referencedBy()
    .filter({ type: KnownTypes.PHOTO })
    .urns();
}

export function readCoverTriples(tdb: TribbleDB, type: string) {
  const query = {
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  };
  const triples = tdb.search(query).triples();
  return triples;
}

export function readCoverPhoto(
  tdb: TribbleDB,
  coverTriple: Triple,
): Maybe<Photo> {
  const photoUrn = coverTriple[0];
  return readPhoto(tdb, photoUrn);
}

export function readCoverId(coverTriple: Triple): string {
  return asUrn(coverTriple[2]).id;
}

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
