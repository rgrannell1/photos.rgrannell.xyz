/* Derive the transitive relations in a location path. */

import type { Triple } from "@rgrannell1/tribbledb";
import { KnownRelations } from "../../../constants/data.ts";
import type { LocationTree } from "./locations.ts";

/** Adds reciprocal containment relations between two nodes in a location path. */
export function addPathRelations(
  triples: Triple[],
  sourceUrn: string,
  targetUrn: string,
): void {
  const forward: Triple = [sourceUrn, KnownRelations.IN, targetUrn];
  const reverse: Triple = [targetUrn, KnownRelations.CONTAINS, sourceUrn];
  triples.push(forward);
  triples.push(reverse);
}

/** Links one path node to every ancestor that follows it. */
export function addRelationsFromSource(
  path: string[],
  sourceIdx: number,
  triples: Triple[],
): void {
  const sourceUrn = path[sourceIdx];
  for (let targetIdx = sourceIdx + 1; targetIdx < path.length; targetIdx++) {
    const targetUrn = path[targetIdx];
    addPathRelations(triples, sourceUrn, targetUrn);
  }
}

/** Derives all reciprocal transitive relations for one location path. */
export function collectPathRelations(path: string[]): Triple[] {
  const triples: Triple[] = [];

  for (let idx = 0; idx < path.length - 1; idx++) {
    addRelationsFromSource(path, idx, triples);
  }

  return triples;
}

/** Traces all parent branches and fails on missing nodes or likely cycles. */
export function traceLocationPath(
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
  for (const parentUrn of node.parents) {
    const parentTriples = traceLocationPath(tree, nextPath, parentUrn);
    triples.push(...parentTriples);
  }
  return triples;
}

/** Derives transitive location triples from every leaf in the tree. */
export function collectNestedLocationTriples(tree: LocationTree): Triple[] {
  const triples: Triple[] = [];
  for (const nodeId of tree.nodes.keys()) {
    if (!tree.branchIds.has(nodeId)) {
      triples.push(...traceLocationPath(tree, [], nodeId));
    }
  }
  return triples;
}
