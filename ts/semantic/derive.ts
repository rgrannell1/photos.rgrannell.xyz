/*
 * Triples derived client-side, to limit how much data we publish.
 */

import { asUrn, type Triple } from "@rgrannell1/tribbledb";
import { type TribbleDB } from "@rgrannell1/tribbledb/v2";

import { one } from "../commons/arrays.ts";
import { humanise } from "../commons/strings.ts";
import {
  CDN_RELATIONS,
  CURIE_REGEX,
  ENDPOINT,
  KnownRelations,
  KnownTypes,
  RelationSymmetries,
  TAXON_RANKS,
} from "../constants/data.ts";

/*
 * Canonical URN for each known alias, so duplicate entities merge before
 * indexing. Empty at present: past aliases were fixed upstream in mirror.
 */
const URN_ALIASES = new Map<string, string>();

/*
 * Expand CDN urls with their endpoint
 */
export function expandCdnUrls(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (!CDN_RELATIONS.has(rel)) {
    return [triple];
  }

  return [[
    src,
    rel,
    `${ENDPOINT}${tgt}`,
  ]];
}

/*
 * Rewrite aliased URNs, e.g. country:usa → country:united-states-of-america.
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

    const yearTriple: Triple = [src, KnownRelations.YEAR, year];
    return [yearTriple];
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
 * Add inverse relations. X parent-of Y implies Y child-of X.
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
 * Curie prefix → expansion URL, read from the in-band curie triples the
 * publisher streams before any triple that uses them.
 */
const curieDefinitions: Record<string, string> = {};

/*
 * Record an in-band curie definition and drop it from the indexed triples.
 */
export function registerCurieDefinitions(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CURIE) {
    return [triple];
  }

  if (typeof src === "string" && typeof tgt === "string") {
    curieDefinitions[tgt] = src;
  }

  return [];
}

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

  // only cache expansions. An unknown prefix may gain a definition later
  if (!curies[prefix]) {
    return value;
  }

  const result = `${curies[prefix]}${id}`;
  CURIE_CACHE.set(value, result);
  return result;
}

/*
 * Expand compacted CURIE URNs, e.g wiki:olm => https://en.wikipedia.org/wiki/olm
 */
export function expandTripleCuries(
  triple: Triple,
): Triple[] {
  const [src, rel, tgt] = triple;

  return [
    [
      expandCurie(curieDefinitions, src),
      rel,
      expandCurie(curieDefinitions, tgt),
    ],
  ];
}

/*
 * Construct a location tree based on `in` relations.
 */
export function buildLocationTrees(
  tdb: TribbleDB,
) {
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

/*
 * Compose all triple modifiers together.
 */
export function deriveTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    registerCurieDefinitions,
    expandUrns,
    expandTripleCuries,
    expandCdnUrls,
    canonicaliseUrns,
  ];

  let outputTriples: Triple[] = [triple];
  for (const fn of tripleProcessors) {
    const nextStep: Triple[] = [];

    for (const triple of outputTriples) {
      nextStep.push(...fn(triple));
    }

    outputTriples = nextStep;
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
 * Media references species only. Copy each media subject and cover up to the
 * species taxa, so taxon pages work through the existing readers. Each taxon
 * also gains an id triple.
 */
export function addTaxonSubjects(tdb: TribbleDB) {
  const taxaBySpecies = new Map<string, string[]>();
  const taxonUrns = new Set<string>();

  for (const rank of TAXON_RANKS) {
    const rankTriples = tdb.search({ relation: rank.relation }).triples();

    for (const [src, , tgt] of rankTriples) {
      const species = baseUrn(src);
      const taxa = taxaBySpecies.get(species) ?? [];
      taxa.push(tgt);
      taxaBySpecies.set(species, taxa);
      taxonUrns.add(tgt);
    }
  }

  const triples: Triple[] = [];
  for (const taxonUrn of taxonUrns) {
    triples.push([taxonUrn, "id", taxonUrn]);
  }

  const liftedRelations = [KnownRelations.SUBJECT, KnownRelations.COVER];

  for (const mediaType of [KnownTypes.PHOTO, KnownTypes.VIDEO]) {
    const mediaTriples = tdb.search({
      source: { type: mediaType },
      relation: liftedRelations,
    }).triples();

    for (const [src, relation, tgt] of mediaTriples) {
      // subjects may carry qs variants (?context=wild); taxa hang off the base
      const taxa = taxaBySpecies.get(baseUrn(tgt)) ?? [];
      for (const taxonUrn of taxa) {
        triples.push([src, relation, taxonUrn]);
      }
    }
  }

  tdb.add(triples);
}

/*
 * Strip any query-string variant (e.g. ?context=wild) from a URN, so all
 * variants of an entity collapse to one identity.
 */
function baseUrn(value: unknown): string {
  return typeof value === "string" ? value.split("?")[0] : "";
}

/*
 * Base URNs of every entity a photo or video references. Variants collapse, so
 * a bird photographed in one context only still counts.
 */
function collectMediaReferencedUrns(tdb: TribbleDB): Set<string> {
  const referenced = new Set<string>();

  for (const mediaType of [KnownTypes.PHOTO, KnownTypes.VIDEO]) {
    const triples = tdb.search({ source: { type: mediaType } }).triples();
    for (const [, , target] of triples) {
      referenced.add(baseUrn(target));
    }
  }

  return referenced;
}

/*
 * Entity types mirror flags as browseable: wildlife, vehicles, places. These
 * are pruned at load when no media references them. Infrastructure types never
 * carry the flag, so pruning never touches them.
 */
export function browseableEntityTypes(tdb: TribbleDB): Set<string> {
  const types = new Set<string>();
  const listings = tdb.search({ source: { type: KnownTypes.LISTING } })
    .objects();

  for (const listing of listings) {
    if (one(listing.browseable) !== "true") {
      continue;
    }

    const listingUrn = one(listing.id);
    if (typeof listingUrn === "string") {
      types.add(asUrn(listingUrn).id);
    }
  }

  return types;
}

/*
 * Base URNs of browseable entities that no photo or video references.
 */
function collectMedialessThings(tdb: TribbleDB): Set<string> {
  const referenced = collectMediaReferencedUrns(tdb);
  const medialess = new Set<string>();

  for (const type of browseableEntityTypes(tdb)) {
    const entityUrns = tdb.search({ source: { type } }).sources();

    for (const urn of entityUrns) {
      if (!referenced.has(baseUrn(urn))) {
        medialess.add(baseUrn(urn));
      }
    }
  }

  return medialess;
}

/*
 * Remove browseable entities that no photo or video references, and every
 * triple mentioning them. Must run after the transitive and feature
 * media-location passes, so ancestor places and features are retained.
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
 * A derivation pass and the passes it must run after.
 */
type DerivationPass = {
  name: string;
  after: string[];
  run: (tdb: TribbleDB) => void;
};

/*
 * Order passes so each runs after its dependencies. Stable with respect to
 * declaration order. Throws on unknown or cyclic dependencies.
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
 * Idempotent derivations, safe to re-run while the stream loads. TribbleDB
 * deduplicates adds, so a repeat run is a no-op.
 */
const STREAM_PASSES: DerivationPass[] = [
  { name: "addYear", after: [], run: addYear },
  { name: "addPlaceFeatureSubjects", after: [], run: addPlaceFeatureSubjects },
  { name: "addInverseRelations", after: [], run: addInverseRelations },
];

/*
 * Whole-dataset derivations. Run once after the stream ends and after a final
 * stream-pass run, so the joins see complete inverse relations.
 */
const FINAL_PASSES: DerivationPass[] = [
  { name: "addNestedLocations", after: [], run: addNestedLocations },
  {
    name: "addTransitiveMediaLocations",
    after: ["addNestedLocations"],
    run: addTransitiveMediaLocations,
  },
  { name: "addFeatureMediaLocations", after: [], run: addFeatureMediaLocations },
  { name: "addTaxonSubjects", after: [], run: addTaxonSubjects },
  {
    name: "pruneMedialessThings",
    after: [
      "addTransitiveMediaLocations",
      "addFeatureMediaLocations",
      "addTaxonSubjects",
    ],
    run: pruneMedialessThings,
  },
];

export function runStreamPasses(tdb: TribbleDB) {
  for (const pass of orderPasses(STREAM_PASSES)) {
    pass.run(tdb);
  }
}

export function runFinalPasses(tdb: TribbleDB) {
  for (const pass of orderPasses(FINAL_PASSES)) {
    pass.run(tdb);
  }
}

/* Run every derivation pass. Used by the build and benchmarks. */
export function postIndexing(tdb: TribbleDB) {
  runStreamPasses(tdb);
  runFinalPasses(tdb);
}

/*
 * Build transitive `in` and `contains` relations from the location tree.
 */
export function addNestedLocations(tdb: TribbleDB) {
  const treeState = buildLocationTrees(tdb);
  /*
   * Recurse up the tree from the leaves, tracing the path we followed.
   */
  function recurse(path: string[], urn: string): Triple[] {
    const triples: Triple[] = [];

    const node = treeState.nodes.get(urn);

    if (!node) {
      throw new Error(`no node in location tree for ${urn}`);
    }

    // Beats implementing cycle-detection
    if (path.length > 5) {
      throw new Error(`likely cycle; ${JSON.stringify(path)}`);
    }

    if (node.parents.size === 0) {
      // path A :IN B :IN C :IN D generates transitive relations:
      // [A, B], [A, C], [A, D], [B, C], ..., [C, D]
      // plus their inverse contains relations
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

  // recurse up from each leaf
  for (const nodeId of treeState.nodes.keys()) {
    if (treeState.branchIds.has(nodeId)) {
      continue;
    }

    triples.push(...recurse([], nodeId));
  }

  tdb.add(triples);
}

/*
 * Emit a location triple for every ancestor of an item's place. Must run after
 * addNestedLocations.
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
