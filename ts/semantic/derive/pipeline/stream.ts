/* Transform streamed triples and add cheap indexed relations. */

/* Transform streamed triples and add cheap indexed relations. */
import { type Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";

import {
  CDN_RELATIONS,
  KnownRelations,
  RelationSymmetries,
} from "../../../constants/data.ts";
import { createCurieProcessors, type TripleProcessor } from "../classification/curies.ts";
import {
  addInverseRelationTriples,
  applyTripleProcessors,
  canonicaliseUrn,
  collectPlaceFeatureUrns,
  createPlaceFeatureTriples,
  createYearTriple,
  expandCdnTarget,
  expandUrn,
} from "./stream-helpers.ts";

export const URN_ALIASES = new Map<string, string>();

/** Expand CDN targets only for relations that contain CDN URLs. */
export function expandCdnUrls(triple: Triple): Triple[] {
  const [source, relation, target] = triple;
  if (!CDN_RELATIONS.has(relation)) {
    return [triple];
  }
  const expandedTarget = expandCdnTarget(target);
  return [[source, relation, expandedTarget]];
}

/** Replace aliased source and target URNs with their canonical forms. */
export function canonicaliseUrns(triple: Triple): Triple[] {
  if (URN_ALIASES.size === 0) {
    return [triple];
  }

  const [source, relation, target] = triple;
  const canonicalSource = canonicaliseUrn(source);
  const canonicalTarget = canonicaliseUrn(target);
  return [[canonicalSource, relation, canonicalTarget]];
}

/** Expand compact source and target URNs in a triple. */
export function expandUrns(triple: Triple): Triple[] {
  const [source, relation, target] = triple;
  const expandedSource = expandUrn(source);
  const expandedTarget = expandUrn(target);
  return [[expandedSource, relation, expandedTarget]];
}

/** Create the ordered processor that normalises each streamed triple. */
export function createTripleDeriver(): TripleProcessor {
  const [registerCuries, expandCuries] = createCurieProcessors();
  const processors: TripleProcessor[] = [
    registerCuries,
    expandUrns,
    expandCuries,
    expandCdnUrls,
    canonicaliseUrns,
  ];
  return applyTripleProcessors.bind(null, processors);
}

/** Derive and store year triples from creation dates. */
export function addYear(tdb: TribbleDB): void {
  const results = tdb.search({ relation: KnownRelations.CREATED_AT });
  const years = results.triples().flatMap(createYearTriple);

  tdb.add(years);
}

/** Derive subject triples for all referenced place features. */
export function addPlaceFeatureSubjects(tdb: TribbleDB): void {
  const featureUrns = collectPlaceFeatureUrns(tdb);
  const triples = createPlaceFeatureTriples(featureUrns);
  tdb.add(triples);
}

/** Add inverse triples for every configured relation symmetry. */
export function addInverseRelations(tdb: TribbleDB): void {
  const triples: Triple[] = [];
  const symmetries = RelationSymmetries;
  for (const [relation, inverseRelation] of symmetries) {
    addInverseRelationTriples(tdb, relation, inverseRelation, triples);
  }
  tdb.add(triples);
}
