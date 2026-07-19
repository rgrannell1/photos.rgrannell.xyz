/*
 * We want to limit how much we send to the server,
 * so some triples are modified or derived client-side
 */

import { asUrn, type Triple } from "@rgrannell1/tribbledb";
import { type TribbleDB } from "@rgrannell1/tribbledb/v2";

import { humanise } from "../commons/strings.ts";
import {
  CDN_RELATIONS,
  CURIE_REGEX,
  CURIES,
  ENDPOINT,
  KnownRelations,
  KnownTypes,
  PrunableEntityTypes,
  RelationSymmetries,
} from "../constants/data.ts";

/*
 * Canonical URN for each known alias. Any triple whose source or target
 * matches an alias key is rewritten to use the canonical form, ensuring
 * duplicate entities are merged before indexing.
 *
 * Deliberately empty at present: past aliases (e.g country:usa) were fixed
 * upstream in mirror. Kept as an extension point for future data slips.
 */
const URN_ALIASES = new Map<string, string>();

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
 * Rewrite aliased URNs to their canonical form so duplicate entities are
 * merged before indexing. E.g. country:usa → country:united-states-of-america.
 */
export function canonicaliseUrns(triple: Triple): Triple[] {
  if (URN_ALIASES.size === 0) {
    return [triple];
  }

  const [src, rel, tgt] = triple;

  return [[
    typeof src === "string" ? (URN_ALIASES.get(src) ?? src) : src,
    rel,
    typeof tgt === "string" ? (URN_ALIASES.get(tgt) ?? tgt) : tgt,
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
    canonicaliseUrns,
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
 * For each media item at a place, emit source → location → place_feature
 * for all features of that place. Must run after addInverseRelations.
 */
function addFeatureLocationsForType(tdb: TribbleDB, sourceType: string) {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION, { where: { type: KnownTypes.PLACE } })
    .widen()
    .follow(KnownRelations.FEATURES)
    .pairs();

  const newTriples: Triple[] = pairs.map(([sourceUrn, featureUrn]) => {
    return [sourceUrn, KnownRelations.LOCATION, featureUrn];
  });

  tdb.add(newTriples);
}

export function addFeatureMediaLocations(tdb: TribbleDB) {
  addFeatureLocationsForType(tdb, KnownTypes.PHOTO);
  addFeatureLocationsForType(tdb, KnownTypes.VIDEO);
}

/*
 * Strip any query-string variant (e.g. ?context=wild) from a URN, so all
 * variants of an entity collapse to one identity.
 */
function baseUrn(value: unknown): string {
  return typeof value === "string" ? value.split("?")[0] : "";
}

/*
 * Whether any photo or video references this entity. Counts references to every
 * query-string variant, so a bird photographed only in one context still counts.
 */
function hasMediaReference(tdb: TribbleDB, urn: string): boolean {
  const { type, id } = asUrn(urn);
  const referencing = tdb.nodes({ type, id }).referencedBy();

  if (referencing.filter({ type: KnownTypes.PHOTO }).count() > 0) {
    return true;
  }

  return referencing.filter({ type: KnownTypes.VIDEO }).count() > 0;
}

/*
 * Collect the base URNs of browseable entities that no photo or video
 * references. Query-string variants collapse to one base URN.
 */
function collectMedialessThings(tdb: TribbleDB): Set<string> {
  const medialess = new Set<string>();

  for (const type of PrunableEntityTypes) {
    const entityUrns = tdb.search({ source: { type } }).sources();

    for (const urn of entityUrns) {
      if (!hasMediaReference(tdb, urn)) {
        medialess.add(baseUrn(urn));
      }
    }
  }

  return medialess;
}

/*
 * Remove browseable entities (wildlife, vehicles, places) that no photo or video
 * references — directly or transitively. Must run after the transitive and
 * feature media-location derivations, so ancestor places and features of
 * photographed places are correctly retained. Every triple mentioning a pruned
 * entity, as source or target, is deleted, so no surviving entity can link to a
 * removed one.
 */
export function pruneMedialessThings(tdb: TribbleDB) {
  const medialess = collectMedialessThings(tdb);
  if (medialess.size === 0) {
    return;
  }

  const staleTriples: Triple[] = [];
  for (const triple of tdb.triples()) {
    const [src, , tgt] = triple;
    if (medialess.has(baseUrn(src)) || medialess.has(baseUrn(tgt))) {
      staleTriples.push(triple);
    }
  }

  tdb.delete(staleTriples);
}

/*
 * A named derivation pass over the TribbleDB, with explicit dependencies on
 * other passes. Ordering constraints live here as data, not prose comments.
 */
type DerivationPass = {
  name: string;
  after: string[];
  run: (tdb: TribbleDB) => void;
};

/*
 * Order passes so each runs after everything it depends on. Stable with
 * respect to declaration order; throws on unknown or cyclic dependencies.
 */
export function orderPasses(passes: DerivationPass[]): DerivationPass[] {
  const passNames = new Set(passes.map((pass) => pass.name));

  for (const pass of passes) {
    for (const dependency of pass.after) {
      if (!passNames.has(dependency)) {
        throw new Error(
          `pass "${pass.name}" depends on unknown pass "${dependency}"`,
        );
      }
    }
  }

  const ordered: DerivationPass[] = [];
  const completed = new Set<string>();
  const remaining = [...passes];

  while (remaining.length > 0) {
    const readyIdx = remaining.findIndex((pass) =>
      pass.after.every((dependency) => completed.has(dependency))
    );

    if (readyIdx === -1) {
      const stuck = remaining.map((pass) => pass.name).join(", ");
      throw new Error(`cyclic pass dependencies among: ${stuck}`);
    }

    const [ready] = remaining.splice(readyIdx, 1);
    ordered.push(ready);
    completed.add(ready.name);
  }

  return ordered;
}

/*
 * Operations that add but do not modify existing triples,
 * to be run after all indexing is complete.
 */
const POST_INDEXING_PASSES: DerivationPass[] = [
  { name: "addYear", after: [], run: addYear },
  { name: "addPlaceFeatureSubjects", after: [], run: addPlaceFeatureSubjects },
  { name: "addInverseRelations", after: [], run: addInverseRelations },
  { name: "addNestedLocations", after: [], run: addNestedLocations },
  {
    name: "addTransitiveMediaLocations",
    after: ["addNestedLocations"],
    run: addTransitiveMediaLocations,
  },
  {
    name: "addFeatureMediaLocations",
    after: ["addInverseRelations"],
    run: addFeatureMediaLocations,
  },
  {
    name: "pruneMedialessThings",
    after: ["addTransitiveMediaLocations", "addFeatureMediaLocations"],
    run: pruneMedialessThings,
  },
];

export function postIndexing(tdb: TribbleDB) {
  for (const pass of orderPasses(POST_INDEXING_PASSES)) {
    pass.run(tdb);
  }
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
 * For every item of the given source type with a direct location, walk up the
 * transitive `in` hierarchy (pre-computed by addNestedLocations) and emit a
 * location triple for every ancestor. Must run after addNestedLocations.
 */
function addTransitiveLocationsForType(tdb: TribbleDB, sourceType: string) {
  const pairs = tdb.paths({ type: sourceType })
    .follow(KnownRelations.LOCATION)
    .widen()
    .follow(KnownRelations.IN)
    .pairs();

  const newTriples: Triple[] = pairs.map(([sourceUrn, ancestorUrn]) => {
    return [sourceUrn, KnownRelations.LOCATION, ancestorUrn];
  });

  tdb.add(newTriples);
}

export function addTransitiveMediaLocations(tdb: TribbleDB) {
  addTransitiveLocationsForType(tdb, KnownTypes.PHOTO);
  addTransitiveLocationsForType(tdb, KnownTypes.VIDEO);
}
