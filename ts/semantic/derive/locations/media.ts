/* Support locations operations. */

/* Derive location trees and media links to ancestor locations. */
/* Support locations operations. */
/* Derive location trees and media links to ancestor locations. */
import type { Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { createFeatureLocationTriple } from "./tree.ts";

/** Links each source to place features reached through its location. */
export function addFeatureLocationsForType(
  tdb: TribbleDB,
  sourceType: string,
): void {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION, { where: { type: KnownTypes.PLACE } })
    .widen()
    .follow(KnownRelations.FEATURES)
    .pairs();
  const triples = pairs.map(createFeatureLocationTriple);

  tdb.add(triples);
}

/** Creates a location triple from a source and its ancestor. */
export function createAncestorLocationTriple(pair: [string, string]): Triple {
  const [sourceUrn, ancestorUrn] = pair;
  return [sourceUrn, KnownRelations.LOCATION, ancestorUrn];
}

/** Adds inherited location links from each source to location ancestors. */
export function addTransitiveLocationsForType(
  tdb: TribbleDB,
  sourceType: string,
): void {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION)
    .widen()
    .follow(KnownRelations.IN)
    .pairs();
  const triples = pairs.map(createAncestorLocationTriple);

  tdb.add(triples);
}
