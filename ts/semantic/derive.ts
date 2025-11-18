/*
 * We want to limit how much we send to the server,
 * so some triples are modified or derived client-side
 */

import type { Triple } from "@rgrannell1/tribbledb";

import {
  CDN_RELATIONS,
  CURIE_REGEX,
  CURIES,
  ENDPOINT,
  KnownRelations,
  RelationSymmetries,
} from "../constants.ts";
import { Strings } from "../commons/strings.ts";

/*
 * Convert star ratings into URNs.
 */
export function convertRatingsToUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.RATING) {
    return [triple];
  }

  const starCount = (tgt.match(/⭐/g) || []).length;
  return [[
    src,
    rel,
    `urn:ró:rating:${starCount - 1}`,
  ]];
}

/*
 * Convert `country` relations to URNs
 */
export function convertCountriesToUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.COUNTRY) {
    return [triple];
  }

  const id = tgt.toLowerCase().replace(/ /g, "-");
  const countryUrn = `urn:ró:country:${id}`;

  return [[
    src,
    rel,
    countryUrn,
  ]];
}

const styleNames = new Set<string>();

/* */
export function convertStylesToUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.STYLE) {
    return [triple];
  }

  const id = tgt.toLowerCase().replace(/ /g, "-");
  const styleUrn = `urn:ró:style:${id}`;

  if (!styleNames.has(tgt)) {
    styleNames.add(tgt);
    return [
      [
        src,
        rel,
        styleUrn,
      ],
      [
        styleUrn,
        KnownRelations.NAME,
        tgt,
      ],
    ];
  } else {
    return [[
      src,
      rel,
      styleUrn,
    ]];
  }
}

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

export function convertRelationCasing(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    src,
    Strings.camelCase(rel),
    tgt,
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
 * Allow search by season
 */
export function addSeason(triple: Triple) {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(tgt);
  if (isNaN(date.getTime())) {
    return [triple];
  }

  const month = date.getUTCMonth() + 1;
  let season = "Winter";
  if (month >= 3 && month <= 5) {
    season = "Spring";
  } else if (month >= 6 && month <= 8) {
    season = "Summer";
  } else if (month >= 9 && month <= 11) {
    season = "Autumn";
  }

  return [
    triple,
    [
      src,
      KnownRelations.SEASON,
      season,
    ],
  ];
}

/*
 * Add years as a relation, when a date is present
 */
export function addYear(triple: Triple) {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(tgt);
  if (isNaN(date.getTime())) {
    return [triple];
  }

  const year = date.getUTCFullYear().toString();

  return [
    triple,
    [
      src,
      KnownRelations.YEAR,
      year,
    ],
  ];
}

/*
 * Reverse relationships
 *
 * some relations imply other; X parent-of Y implies Y child-of X
 */
export function addInverseRelations(triple: Triple) {
  const [src, rel, tgt] = triple;

  for (const [to, from] of RelationSymmetries) {
    if (rel === to) {
      return [
        triple,
        [
          tgt,
          from,
          src,
        ],
      ];
    }
  }

  return [triple];
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

// This is a bit unpleasant
const TREE_STATE = {
  nodes: new Map<string, {
    id: string;
    parents: Set<string>;
  }>(),
  // used later to detect whether a node is a leaf
  branchIds: new Set<string>(),
};

/*
 * Construct a location tree based on `in` relations.
 */
export function buildLocationTrees(
  triple: Triple,
) {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.IN) {
    return [triple];
  }

  const nodes = TREE_STATE.nodes;

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

  TREE_STATE.branchIds.add(tgt);
  srcNode?.parents.add(tgt);

  return [triple];
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
 * This is a bottleneck (takes roughly 100ms to run)
 *
 * @param triple The input triple to modify.
 */
export function deriveTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    convertRatingsToUrns,
    convertCountriesToUrns,
    convertStylesToUrns,
    convertRelationCasing,
    expandCdnUrls,
    expandUrns,
    addSeason,
    addYear,
    addInverseRelations,
    expandTripleCuries,
    buildLocationTrees,
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
 * During the initial flatmap processing of the ingested triples,
 * we built up a tree describing which places are contained in which others.
 * Construct the transitive relations in this function.
 */
export function addNestedLocations(): Triple[] {
  /*
   * Recurse up the tree from the leaves, tracing the path we followed.
   */
  function recurse(path: string[], urn: string): Triple[] {
    const triples: Triple[] = [];

    const node = TREE_STATE.nodes.get(urn);

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
  for (const nodeId of TREE_STATE.nodes.keys()) {
    if (TREE_STATE.branchIds.has(nodeId)) {
      continue;
    }

    triples.push(...recurse([], nodeId));
  }

  return triples;
}

/*
 * TODO: if a photo is in Zaragoza, it's in Spain. Make sure that
         link is captured.
 */
