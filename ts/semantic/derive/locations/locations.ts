/* Derive location trees and media links to ancestor locations. */

import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import {
  createLocationTree,
  indexLocationTriple,
} from "./tree.ts";
import { collectNestedLocationTriples } from "./paths.ts";
import {
  addFeatureLocationsForType,
  addTransitiveLocationsForType,
} from "./media.ts";

export type LocationNode = {
  parents: Set<string>;
};

export type LocationTree = {
  nodes: Map<string, LocationNode>;
  branchIds: Set<string>;
};

export function buildLocationTrees(tdb: TribbleDB): LocationTree {
  const tree = createLocationTree();
  const results = tdb.search({ relation: KnownRelations.IN }).triples();

  for (const [sourceUrn, , targetUrn] of results) {
    indexLocationTriple(tree, sourceUrn, targetUrn);
  }

  return tree;
}

export function addNestedLocations(tdb: TribbleDB): void {
  const tree = buildLocationTrees(tdb);
  const triples = collectNestedLocationTriples(tree);
  tdb.add(triples);
}

export function addFeatureMediaLocations(tdb: TribbleDB): void {
  addFeatureLocationsForType(tdb, KnownTypes.PHOTO);
  addFeatureLocationsForType(tdb, KnownTypes.VIDEO);
}

export function addTransitiveMediaLocations(tdb: TribbleDB): void {
  addTransitiveLocationsForType(tdb, KnownTypes.PHOTO);
  addTransitiveLocationsForType(tdb, KnownTypes.VIDEO);
}
