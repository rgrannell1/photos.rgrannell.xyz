/* Support photos operations. */

/* Support photos operations. */
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import type { NodeView, TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Country, Photo } from "../../../types/domain.ts";
import { arrayify } from "../../../commons/collections/arrays.ts";
import { parsePhoto } from "../parsers.ts";
import {
  fromNullable,
  type Maybe,
  NONE,
} from "../../../commons/collections/maybe.ts";
import type { CoverReferences, CoverTarget } from "./photos.ts";

/** Find the first photo source assigned as a cover for a target. */
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

/** Find the cover photo source for a listing type. */
export function readListingCoverSource(
  tdb: TribbleDB,
  type: string,
): string | undefined {
  const target = { type: KnownTypes.LISTING, id: type };
  return readCoverSource(tdb, target);
}

/** Find the cover photo source for an entity type. */
export function readEntityCoverSource(
  tdb: TribbleDB,
  type: string,
): string | undefined {
  return readCoverSource(tdb, { type });
}

/** Read nodes that reference an entity as their cover target. */
export function readCoverReferences(
  tdb: TribbleDB,
  type: string,
  id: string,
): NodeView {
  const thing = tdb.nodes({ type, id });
  const references = thing.referencedBy(KnownRelations.COVER);
  return references;
}

/** Select the first photo URN from cover references. */
export function readFirstCoverUrn(
  references: CoverReferences,
): string | undefined {
  const photos = references.filter({ type: KnownTypes.PHOTO });
  const [photoUrn] = photos.urns();
  return photoUrn;
}

/** Parse a cover photo when its referenced thing exists. */
export function parseCoverPhoto(
  tdb: TribbleDB,
  photoUrn: string,
): Maybe<Photo> {
  const photo = tdb.readThing(photoUrn);
  if (photo === undefined) return NONE;
  return parsePhoto(tdb, photo);
}

/** Add every country attached to a photo into a shared set. */
export function addPhotoCountries(
  countryUrns: Set<string>,
  photo: Photo,
): void {
  const photoCountries = arrayify(fromNullable(photo.country));
  for (const countryUrn of photoCountries) countryUrns.add(countryUrn);
}

/** Collect unique country URNs across a photo collection. */
export function collectCountryUrns(photos: Photo[]): Set<string> {
  const countryUrns = new Set<string>();
  for (const photo of photos) addPhotoCountries(countryUrns, photo);
  return countryUrns;
}

/** Compare countries by their display names. */
export function compareCountryNames(
  countryA: Country,
  countryB: Country,
): number {
  return countryA.name.localeCompare(countryB.name);
}
