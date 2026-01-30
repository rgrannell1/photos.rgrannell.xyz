/*
 * We want to limit how much we send to the server,
 * so some triples are modified or derived client-side
 */

import { asUrn, type TribbleDB, type Triple } from "@rgrannell1/tribbledb";

import { humanise } from "../commons/strings.ts";
import {
  CDN_RELATIONS,
  CURIE_REGEX,
  CURIES,
  ENDPOINT,
  KnownRelations,
  KnownTypes,
  RelationSymmetries,
} from "../constants.ts";

const styleNames = new Set<string>();

/*
 * Expand CDN urls with their endpoint
 */
export function expandCdnUrls(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  const isCDNRelation = Array.from(CDN_RELATIONS).some((candidate: string) => {
    return rel === candidate;
  });

  if (!isCDNRelation) {
    return [triple];
  }

  return [[
    src,
    rel,
    `${ENDPOINT}${tgt}`,
  ]];
}

/*
 * Expand shortened URNS into urn:ró:
 */
export function expandUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    typeof src === "string" && src.startsWith("::")
      ? `urn:ró:${src.slice(2)}`
      : src,
    rel,
    typeof tgt === "string" && tgt.startsWith("::")
      ? `urn:ró:${tgt.slice(2)}`
      : tgt,
  ]];
}

/*
 * Add years as a relation, when a date is present
 */
export function addYear(tdb: TribbleDB) {
  const years = tdb.search({
    relation: KnownRelations.CREATED_AT,
  }).triples().flatMap(([src, _, tgt]) => {
    const date = new Date(tgt);

    if (isNaN(date.getTime())) {
      return [];
    }

    const year = date.getUTCFullYear().toString();

    return [[src, KnownRelations.YEAR, year]] as Triple[];
  });

  tdb.add(years);
}

/*
 * Place features only appear as targets of [place, "features", place_feature].
 * Add triples so each place_feature is a valid subject with id and name.
 */
export function addPlaceFeatureSubjects(tdb: TribbleDB) {
  const results = tdb.search({
    relation: KnownRelations.FEATURES,
  }).triples();

  const featureUrns = new Set<string>();
  for (const [, , tgt] of results) {
    const parsed = asUrn(tgt);
    if (parsed?.type === KnownTypes.PLACE_FEATURE) {
      featureUrns.add(tgt);
    }
  }

  const triples: Triple[] = [];
  for (const urn of featureUrns) {
    const { id } = asUrn(urn)!;
    triples.push(
      [urn, "id", urn],
      [urn, KnownRelations.NAME, humanise(id)],
    );
  }
  tdb.add(triples);
}

/*
 * Reverse relationships
 *
 * some relations imply other; X parent-of Y implies Y child-of X
 */
export function addInverseRelations(tdb: TribbleDB) {
  const triples: Triple[] = [];

  for (const [to, from] of RelationSymmetries) {
    const results = tdb.search({
      relation: to,
    }).triples();

    for (const [src, _, tgt] of results) {
      triples.push([tgt, from, src]);
    }
  }

  tdb.add(triples);
}

const CURIE_CACHE = new Map<string, string>();

/*
 * Expand curie-formatted URLS into their full form.
 */
export function expandCurie(curies: Record<string, string>, value: string) {
  const cached = CURIE_CACHE.get(value);
  if (cached) {
    return cached;
  }

  if (typeof value !== "string" || !CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);

  if (!match) {
    return value;
  }

  const prefix = match[1];
  const id = match[2];

  const result = curies[prefix] ? `${curies[prefix]}${id}` : value;

  CURIE_CACHE.set(value, result);
  return result;
}

/*
 * Some URNs are sent in CURIE format to compact them; expand
 * e.g [wiki:olm] => https://en.wikipedia.org/wiki/olm
 */
export function expandTripleCuries(
  triple: Triple,
) {
  const [src, rel, tgt] = triple;

  return [
    [
      expandCurie(CURIES, src),
      rel,
      expandCurie(CURIES, tgt),
    ],
  ];
}

/*
 * Construct a location tree based on `in` relations.
 */
export function buildLocationTrees(
  tdb: TribbleDB,
) {
  // This is a bit unpleasant
  const treeState = {
    nodes: new Map<string, {
      id: string;
      parents: Set<string>;
    }>(),
    // used later to detect whether a node is a leaf
    branchIds: new Set<string>(),
  };

  const results = tdb.search({
    relation: KnownRelations.IN,
  }).triples();

  const nodes = treeState.nodes;
  for (const [src, , tgt] of results) {
    let srcNode = nodes.get(src);
    if (!srcNode) {
      srcNode = { id: src, parents: new Set() };
      nodes.set(src, srcNode);
    }

    let tgtNode = nodes.get(tgt);
    if (!tgtNode) {
      tgtNode = { id: tgt, parents: new Set() };
      nodes.set(tgt, tgtNode);
    }

    treeState.branchIds.add(tgt);
    srcNode?.parents.add(tgt);
  }

  return treeState;
}

// This should be in mirror, but for testing...
export const HARD_CODED_TRIPLES: Triple[] = [
  ["urn:ró:rating:%E2%AD%90", KnownRelations.NAME, "⭐"],
  ["urn:ró:rating:%E2%AD%90%E2%AD%90", KnownRelations.NAME, "⭐⭐"],
  ["urn:ró:rating:%E2%AD%90%E2%AD%90%E2%AD%90", KnownRelations.NAME, "⭐⭐⭐"],
  [
    "urn:ró:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
    KnownRelations.NAME,
    "⭐⭐⭐⭐",
  ],
  [
    "urn:ró:rating:%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90%E2%AD%90",
    KnownRelations.NAME,
    "⭐⭐⭐⭐⭐",
  ],
];

/*
 * Compose all triple modifiers together.
 *
 * This is a bottleneck
 * - takes roughly 100ms to run as of Nov 25 tribbledb v0.16
 * - takes 70ms after v0.18 Nov 25 and moving some derivations to non-linear scan adds
 *
 * @param triple The input triple to modify.
 */
export function deriveTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    expandUrns,
    expandTripleCuries,
    expandCdnUrls,
  ];

  let outputTriples: Triple[] = [triple];
  for (const fn of tripleProcessors) {
    let nextStep: Triple[] = [];

    for (const triple of outputTriples) {
      nextStep.push(...(fn(triple) as Triple[]));
    }

    outputTriples = [...nextStep];
    nextStep = [];
  }

  return outputTriples;
}

/*
 * Operations that add but do not modify existing triples,
 * to be run after all indexing is complete.
 */
export function postIndexing(tdb: TribbleDB) {
  addYear(tdb);
  addPlaceFeatureSubjects(tdb);
  addInverseRelations(tdb);
  addNestedLocations(tdb);
}

/*
 * During the initial flatmap processing of the ingested triples,
 * we built up a tree describing which places are contained in which others.
 * Construct the transitive relations in this function.
 */
export function addNestedLocations(tdb: TribbleDB) {
  const treeState = buildLocationTrees(tdb);
  /*
   * Recurse up the tree from the leaves, tracing the path we followed.
   */
  function recurse(path: string[], urn: string): Triple[] {
    const triples: Triple[] = [];

    const node = treeState.nodes.get(urn);

    // Probably not possible
    if (!node) {
      throw new Error(`no node in location tree for ${urn}`);
    }

    // Beats implementing cycle-detection
    if (path.length > 5) {
      throw new Error(`likely cycle; ${JSON.stringify(path)}`);
    }

    if (node.parents.size === 0) {
      // in this case, we have a path A :IN B :IN C :IN D
      // return [A, B], [A, C], [A, D], [B, C], ..., [C, D]
      // which should be the set of transitive in relations.
      // For good measure, throw in the `contains` inverse relation
      const totalPath = [...path, urn];

      for (let idx = 0; idx < totalPath.length - 1; idx++) {
        for (let jdx = idx; jdx < totalPath.length; jdx++) {
          const src = totalPath[idx];
          const tgt = totalPath[jdx];

          if (src === tgt) {
            continue;
          }

          triples.push([src, KnownRelations.IN, tgt]);
          triples.push([tgt, KnownRelations.CONTAINS, src]);
        }
      }
    } else {
      for (const parent of node.parents) {
        triples.push(...recurse([...path, urn], parent));
      }
    }

    return triples;
  }

  const triples: Triple[] = [];

  // Recurse up from all leaves A :IN B, and
  // return all transitive location relations
  for (const nodeId of treeState.nodes.keys()) {
    if (treeState.branchIds.has(nodeId)) {
      continue;
    }

    triples.push(...recurse([], nodeId));
  }

  tdb.add(triples);
}

/*
 * TODO: if a photo is in Zaragoza, it's in Spain. Make sure that
         link is captured.
 */
