/* Support locations operations. */

/* Derive location trees and media links to ancestor locations. */
/* Support locations operations. */
/* Derive location trees and media links to ancestor locations. */
import type { Triple } from "@rgrannell1/tribbledb";
import { KnownRelations } from "../../../constants/data.ts";
import type { LocationNode, LocationTree } from "./locations.ts";

/** Create an empty location graph with indexed nodes and ancestor branches. */
export function createLocationTree(): LocationTree {
  const nodes = new Map<string, LocationNode>();
  const branchIds = new Set<string>();
  return { nodes, branchIds };
}

/** Read a location node, or create an unindexed leaf node when absent. */
export function getLocationNode(tree: LocationTree, urn: string): LocationNode {
  return tree.nodes.get(urn) ?? { parents: new Set<string>() };
}

/** Index a direct parent relationship between two location URNs. */
export function indexLocationTriple(
  tree: LocationTree,
  sourceUrn: string,
  targetUrn: string,
): void {
  const sourceNode = getLocationNode(tree, sourceUrn);
  const targetNode = getLocationNode(tree, targetUrn);
  tree.nodes.set(sourceUrn, sourceNode);
  tree.nodes.set(targetUrn, targetNode);
  tree.branchIds.add(targetUrn);
  sourceNode.parents.add(targetUrn);
}

/** Convert a media and ancestor-location pair into a location triple. */
export function createFeatureLocationTriple(pair: [string, string]): Triple {
  const [sourceUrn, featureUrn] = pair;
  return [sourceUrn, KnownRelations.LOCATION, featureUrn];
}
