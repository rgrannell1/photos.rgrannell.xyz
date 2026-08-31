/* Remove browseable entities which have no linked media. */

/* Remove browseable entities which have no linked media. */
import { asUrn, type Triple, type TripleObject } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../../../commons/collections/arrays.ts";
import { DATA_TRUE, KnownTypes } from "../../../constants/data.ts";
import { baseUrn } from "./urns.ts";

/** Add the base URNs referenced by media triples to a shared set. */
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

/** Collect every entity base URN referenced by a photo or video. */
function collectMediaReferencedUrns(tdb: TribbleDB): Set<string> {
  const referenced = new Set<string>();
  const mediaTypes = [KnownTypes.PHOTO, KnownTypes.VIDEO];

  for (const mediaType of mediaTypes) {
    addReferencedUrns(tdb, mediaType, referenced);
  }

  return referenced;
}

/** Read the entity type from a listing URN, or return undefined for invalid input. */
function readListingType(listingUrn: unknown): string | undefined {
  const isString = typeof listingUrn === "string";
  if (!isString) {
    return undefined;
  }
  const urn = asUrn(listingUrn);
  return urn.id;
}

/** Read a listing's entity type only when the listing is browseable. */
function readBrowseableType(listing: TripleObject): string | undefined {
  const isBrowseable = one(listing.browseable) === DATA_TRUE;
  if (!isBrowseable) {
    return undefined;
  }
  const listingUrn = one(listing.id);
  return readListingType(listingUrn);
}

/** Collect the entity types published as browseable listings. */
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

/** Add unreferenced entities of one browseable type to the medialess set. */
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

/** Collect browseable entities that no photo or video references. */
function collectMedialessThings(tdb: TribbleDB): Set<string> {
  const referenced = collectMediaReferencedUrns(tdb);
  const medialess = new Set<string>();

  for (const type of browseableEntityTypes(tdb)) {
    addMedialessThings(tdb, type, referenced, medialess);
  }

  return medialess;
}

/** Test whether either endpoint of a triple is a medialess entity. */
function isMedialessTriple(triple: Triple, medialess: Set<string>): boolean {
  const [sourceUrn, , targetUrn] = triple;
  const sourceIsMedialess = medialess.has(baseUrn(sourceUrn));
  const targetIsMedialess = medialess.has(baseUrn(targetUrn));
  return sourceIsMedialess || targetIsMedialess;
}

/** Collect every triple connected to a medialess entity. */
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

/** Delete browseable entities and relationships that have no linked media. */
export function pruneMedialessThings(tdb: TribbleDB): void {
  const medialess = collectMedialessThings(tdb);
  if (medialess.size === 0) {
    return;
  }

  const staleTriples = collectStaleTriples(tdb, medialess);
  tdb.delete(staleTriples);
}
