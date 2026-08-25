/* Derive location trees and media links to ancestor locations. */

import type { Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownRelations, KnownTypes } from "../../constants/data.ts";

type LocationNode = {
  parents: Set<string>;
};

type LocationTree = {
  nodes: Map<string, LocationNode>;
  branchIds: Set<string>;
};

export function buildLocationTrees(tdb: TribbleDB): LocationTree {
  const tree: LocationTree = {
    nodes: new Map<string, LocationNode>(),
    branchIds: new Set<string>(),
  };
  const results = tdb.search({ relation: KnownRelations.IN }).triples();

  for (const [src, , tgt] of results) {
    const srcNode = tree.nodes.get(src) ?? { parents: new Set<string>() };
    const tgtNode = tree.nodes.get(tgt) ?? { parents: new Set<string>() };
    tree.nodes.set(src, srcNode);
    tree.nodes.set(tgt, tgtNode);
    tree.branchIds.add(tgt);
    srcNode.parents.add(tgt);
  }

  return tree;
}

function collectPathRelations(path: string[]): Triple[] {
  const triples: Triple[] = [];

  for (let idx = 0; idx < path.length - 1; idx++) {
    for (let jdx = idx + 1; jdx < path.length; jdx++) {
      const src = path[idx];
      const tgt = path[jdx];
      triples.push([src, KnownRelations.IN, tgt]);
      triples.push([tgt, KnownRelations.CONTAINS, src]);
    }
  }

  return triples;
}

function traceLocationPath(
  tree: LocationTree,
  path: string[],
  urn: string,
): Triple[] {
  const node = tree.nodes.get(urn);
  if (!node) {
    throw new Error(`no node in location tree for ${urn}`);
  }
  if (path.length > 5) {
    throw new Error(`likely cycle; ${JSON.stringify(path)}`);
  }

  const nextPath = [...path, urn];
  if (node.parents.size === 0) {
    return collectPathRelations(nextPath);
  }

  const triples: Triple[] = [];
  for (const parent of node.parents) {
    triples.push(...traceLocationPath(tree, nextPath, parent));
  }
  return triples;
}

export function addNestedLocations(tdb: TribbleDB): void {
  const tree = buildLocationTrees(tdb);
  const triples: Triple[] = [];

  for (const nodeId of tree.nodes.keys()) {
    if (!tree.branchIds.has(nodeId)) {
      triples.push(...traceLocationPath(tree, [], nodeId));
    }
  }

  tdb.add(triples);
}

function addFeatureLocationsForType(tdb: TribbleDB, sourceType: string): void {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION, { where: { type: KnownTypes.PLACE } })
    .widen()
    .follow(KnownRelations.FEATURES)
    .pairs();
  const triples: Triple[] = pairs.map(([sourceUrn, featureUrn]) => {
    return [sourceUrn, KnownRelations.LOCATION, featureUrn];
  });

  tdb.add(triples);
}

export function addFeatureMediaLocations(tdb: TribbleDB): void {
  addFeatureLocationsForType(tdb, KnownTypes.PHOTO);
  addFeatureLocationsForType(tdb, KnownTypes.VIDEO);
}

function addTransitiveLocationsForType(tdb: TribbleDB, sourceType: string): void {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION)
    .widen()
    .follow(KnownRelations.IN)
    .pairs();
  const triples: Triple[] = pairs.map(([sourceUrn, ancestorUrn]) => {
    return [sourceUrn, KnownRelations.LOCATION, ancestorUrn];
  });

  tdb.add(triples);
}

export function addTransitiveMediaLocations(tdb: TribbleDB): void {
  addTransitiveLocationsForType(tdb, KnownTypes.PHOTO);
  addTransitiveLocationsForType(tdb, KnownTypes.VIDEO);
}
