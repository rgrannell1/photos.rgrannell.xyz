/* Remove browseable entities which have no linked media. */

/* Remove browseable entities which have no linked media. */
import { asUrn, type Triple, type TripleObject } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../../../commons/collections/arrays.ts";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { baseUrn } from "./urns.ts";

function addReferencedUrns(
  tdb: TribbleDB,
  mediaType: string,
  referenced: Set<string>,
): void {
  const results = tdb.search({ source: { type: mediaType } });
  const triples = results.triples();
  for (const [, , target] of triples) {
    referenced.add(baseUrn(target));
  }
}

function collectMediaReferencedUrns(tdb: TribbleDB): Set<string> {
  const referenced = new Set<string>();
  const mediaTypes = [KnownTypes.PHOTO, KnownTypes.VIDEO];

  for (const mediaType of mediaTypes) {
    addReferencedUrns(tdb, mediaType, referenced);
  }

  return referenced;
}

function readListingType(listingUrn: unknown): string | undefined {
  const isString = typeof listingUrn === "string";
  if (!isString) {
    return undefined;
  }
  const urn = asUrn(listingUrn);
  return urn.id;
}

function readBrowseableType(listing: TripleObject): string | undefined {
  const isBrowseable = one(listing.browseable) === DATA_TRUE;
  if (!isBrowseable) {
    return undefined;
  }
  const listingUrn = one(listing.id);
  return readListingType(listingUrn);
}

export function browseableEntityTypes(tdb: TribbleDB): Set<string> {
  const types = new Set<string>();
  const listings = tdb.search({ source: { type: KnownTypes.LISTING } })
    .objects();

  for (const listing of listings) {
    const type = readBrowseableType(listing);
    if (type) {
      types.add(type);
    }
  }

  return types;
}

function addMedialessThings(
  tdb: TribbleDB,
  type: string,
  referenced: Set<string>,
  medialess: Set<string>,
): void {
  const entityUrns = tdb.search({ source: { type } }).sources();
  for (const urn of entityUrns) {
    const entityUrn = baseUrn(urn);
    if (!referenced.has(entityUrn)) {
      medialess.add(entityUrn);
    }
  }
}

function collectMedialessThings(tdb: TribbleDB): Set<string> {
  const referenced = collectMediaReferencedUrns(tdb);
  const medialess = new Set<string>();

  for (const type of browseableEntityTypes(tdb)) {
    addMedialessThings(tdb, type, referenced, medialess);
  }

  return medialess;
}

function isMedialessTriple(triple: Triple, medialess: Set<string>): boolean {
  const [sourceUrn, , targetUrn] = triple;
  const sourceIsMedialess = medialess.has(baseUrn(sourceUrn));
  const targetIsMedialess = medialess.has(baseUrn(targetUrn));
  return sourceIsMedialess || targetIsMedialess;
}

function collectStaleTriples(tdb: TribbleDB, medialess: Set<string>): Triple[] {
  const staleTriples: Triple[] = [];
  const triples = tdb.triples();
  for (const triple of triples) {
    if (isMedialessTriple(triple, medialess)) {
      staleTriples.push(triple);
    }
  }
  return staleTriples;
}

export function pruneMedialessThings(tdb: TribbleDB): void {
  const medialess = collectMedialessThings(tdb);
  if (medialess.size === 0) {
    return;
  }

  const staleTriples = collectStaleTriples(tdb, medialess);
  tdb.delete(staleTriples);
}
