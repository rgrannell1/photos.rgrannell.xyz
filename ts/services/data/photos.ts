import { KnownRelations, KnownTypes } from "../../constants/data.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Photo } from "../../types/domain.ts";
import {
  readCountries,
  readPhoto,
  readPhotos,
} from "./readers.ts";
import { arrayify, one } from "../../commons/arrays.ts";
import { parsePhoto } from "./parsers.ts";
import {
  fromNullable,
  isNone,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../../commons/maybe.ts";

export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).sources();

  return readPhotos(tdb, photos).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
}

/* Sorting on raw TripleObjects avoids valibot validation overhead. */
export function readAllPhotoUrns(tdb: TribbleDB): string[] {
  const photoObjects = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).objects();

  return photoObjects
    .sort((objA, objB) =>
      parseInt(withDefault(one(objB.createdAt), "0")) -
      parseInt(withDefault(one(objA.createdAt), "0"))
    )
    .map((obj) => one(obj.id))
    .filter(isSome);
}

export function readPhotosByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
): Photo[] {
  // select the things by type and id, so qs-variant URNs match too
  let things = tdb.nodes([]);
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);
    things = things.union(tdb.nodes({ type, id }));
  }

  const photoIds = things
    .referencedBy()
    .filter({ type: KnownTypes.PHOTO })
    .urns();

  return readPhotos(tdb, photoIds).sort((photoa, photob) => {
    return parseInt(photob.createdAt) - parseInt(photoa.createdAt);
  });
}

/* Bulk equivalent of readThingCover. Single search avoids per-row blocking. */
export function readThingCovers(tdb: TribbleDB, type: string): Map<string, Photo> {
  const coverTriples = tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  }).triples();

  const covers = new Map<string, Photo>();
  for (const coverTriple of coverTriples) {
    const source: string = coverTriple[0];
    const id = asUrn(coverTriple[2]).id;
    if (covers.has(id)) {
      continue;
    }
    const photo = readPhoto(tdb, source);
    if (!isNone(photo)) {
      covers.set(id, photo);
    }
  }

  return covers;
}

export function readThingCover(
  tdb: TribbleDB,
  thingUrn: string,
): Maybe<Photo> {
  const { type, id } = asUrn(thingUrn);
  const [photoUrn] = tdb.nodes({ type, id })
    .referencedBy(KnownRelations.COVER)
    .filter({ type: KnownTypes.PHOTO })
    .urns();
  if (photoUrn === undefined) {
    return NONE;
  }

  const photo = tdb.readThing(photoUrn);
  if (photo === undefined) {
    return NONE;
  }

  return parsePhoto(tdb, photo);
}

export function readSeenInCountries(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): Country[] {
  const photos = readPhotosByThingIds(tdb, thingUrns);
  const countryUrnSet = new Set<string>();

  for (const photo of photos) {
    for (const countryUrn of arrayify(fromNullable(photo.country))) {
      countryUrnSet.add(countryUrn);
    }
  }

  return readCountries(tdb, countryUrnSet).sort(
    (countryA, countryB) => countryA.name.localeCompare(countryB.name),
  );
}

/* Pre-computed by mirror. Falls back to entity cover if no listing cover. */
export function readCategoryCover(
  tdb: TribbleDB,
  type: string,
): Maybe<Photo> {
  const source = tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type: KnownTypes.LISTING, id: type },
  }).firstSource() ?? tdb.search({
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target: { type },
  }).firstSource();

  return source === undefined ? NONE : readPhoto(tdb, source);
}
