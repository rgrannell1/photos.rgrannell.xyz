/* Support photos operations. */

/* Support photos operations. */
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Photo } from "../../../types/domain.ts";
import { arrayify } from "../../../commons/collections/arrays.ts";
import { parsePhoto } from "../parsers.ts";
import { fromNullable, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import type { CoverReferences, CoverTarget } from "./photos.ts";

export function readCoverSource(
  tdb: TribbleDB,
  target: CoverTarget,
): string | undefined {
  const query = {
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.COVER,
    target,
  };
  const source = tdb.search(query).firstSource();
  return source;
}

export function readListingCoverSource(
  tdb: TribbleDB,
  type: string,
): string | undefined {
  const target = { type: KnownTypes.LISTING, id: type };
  return readCoverSource(tdb, target);
}

export function readEntityCoverSource(
  tdb: TribbleDB,
  type: string,
): string | undefined {
  return readCoverSource(tdb, { type });
}

export function readCoverReferences(tdb: TribbleDB, type: string, id: string) {
  const thing = tdb.nodes({ type, id });
  const references = thing.referencedBy(KnownRelations.COVER);
  return references;
}

export function readFirstCoverUrn(
  references: CoverReferences,
): string | undefined {
  const photos = references.filter({ type: KnownTypes.PHOTO });
  const [photoUrn] = photos.urns();
  return photoUrn;
}

export function parseCoverPhoto(
  tdb: TribbleDB,
  photoUrn: string,
): Maybe<Photo> {
  const photo = tdb.readThing(photoUrn);
  if (photo === undefined) return NONE;
  return parsePhoto(tdb, photo);
}

export function addPhotoCountries(
  countryUrns: Set<string>,
  photo: Photo,
): void {
  const photoCountries = arrayify(fromNullable(photo.country));
  for (const countryUrn of photoCountries) countryUrns.add(countryUrn);
}

export function collectCountryUrns(photos: Photo[]): Set<string> {
  const countryUrns = new Set<string>();
  for (const photo of photos) addPhotoCountries(countryUrns, photo);
  return countryUrns;
}

export function compareCountryNames(
  countryA: Country,
  countryB: Country,
): number {
  return countryA.name.localeCompare(countryB.name);
}
