import { KnownTypes } from "../../../constants/data.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Photo } from "../../../types/domain.ts";
import { readCountries, readPhoto, readPhotos } from "../readers.ts";

import { isSome, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import {
  addThingCover,
  collectThingNodes,
  comparePhotoObjectsNewest,
  comparePhotosNewest,
  readCoverTriples,
  readObjectId,
  readPhotoIdsForThings,
} from "./selection.ts";
import {
  collectCountryUrns,
  compareCountryNames,
  parseCoverPhoto,
  readCoverReferences,
  readEntityCoverSource,
  readFirstCoverUrn,
  readListingCoverSource,
} from "./covers.ts";

export function readAllPhotos(tdb: TribbleDB): Photo[] {
  const photos = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).sources();

  const sortedPhotos = readPhotos(tdb, photos).sort(comparePhotosNewest);
  return sortedPhotos;
}

/* Sorting on raw TripleObjects avoids valibot validation overhead. */
export function readAllPhotoUrns(tdb: TribbleDB): string[] {
  const photoObjects = tdb.search({
    source: { type: KnownTypes.PHOTO },
  }).objects();

  const sortedObjects = photoObjects.sort(comparePhotoObjectsNewest);
  const objectIds = sortedObjects.map(readObjectId);
  const photoUrns = objectIds.filter(isSome);
  return photoUrns;
}

export type ThingNodes = ReturnType<typeof collectThingNodes>;

export function readPhotosByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
): Photo[] {
  // Select by type and id, so qs-variant URNs match too.
  const things = collectThingNodes(tdb, thingsUrns);
  const photoIds = readPhotoIdsForThings(things);
  const photos = readPhotos(tdb, photoIds).sort(comparePhotosNewest);
  return photos;
}

/* Bulk equivalent of readThingCover. Single search avoids per-row blocking. */
export function readThingCovers(
  tdb: TribbleDB,
  type: string,
): Map<string, Photo> {
  const coverTriples = readCoverTriples(tdb, type);
  const covers = new Map<string, Photo>();
  for (const coverTriple of coverTriples) {
    addThingCover(covers, tdb, coverTriple);
  }

  return covers;
}

export type CoverTarget = { type: string; id?: string };

export type CoverReferences = ReturnType<typeof readCoverReferences>;

export function readThingCover(
  tdb: TribbleDB,
  thingUrn: string,
): Maybe<Photo> {
  const { type, id } = asUrn(thingUrn);
  const references = readCoverReferences(tdb, type, id);
  const photoUrn = readFirstCoverUrn(references);
  if (photoUrn === undefined) return NONE;
  return parseCoverPhoto(tdb, photoUrn);
}

export function readSeenInCountries(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): Country[] {
  const photos = readPhotosByThingIds(tdb, thingUrns);
  const countryUrns = collectCountryUrns(photos);
  const countries = readCountries(tdb, countryUrns).sort(compareCountryNames);
  return countries;
}

/* Pre-computed by mirror. Falls back to entity cover if no listing cover. */
export function readCategoryCover(
  tdb: TribbleDB,
  type: string,
): Maybe<Photo> {
  const listingCover = readListingCoverSource(tdb, type);
  const source = listingCover ?? readEntityCoverSource(tdb, type);

  return source === undefined ? NONE : readPhoto(tdb, source);
}
