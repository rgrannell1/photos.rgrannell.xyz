/* Transform streamed triples and add cheap indexed relations. */

import { asUrn, type Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { humanise } from "../../commons/strings.ts";
import {
  CDN_RELATIONS,
  ENDPOINT,
  KnownRelations,
  KnownTypes,
  RelationSymmetries,
} from "../../constants/data.ts";
import { createCurieProcessors, type TripleProcessor } from "./curies.ts";

const URN_ALIASES = new Map<string, string>();

export function expandCdnUrls(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;
  return CDN_RELATIONS.has(rel) ? [[src, rel, `${ENDPOINT}${tgt}`]] : [triple];
}

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

export function expandUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;
  const hasShortSourceUrn = typeof src === "string" && src.startsWith("::");
  const hasShortTargetUrn = typeof tgt === "string" && tgt.startsWith("::");
  return [[
    hasShortSourceUrn ? `urn:ró:${src.slice(2)}` : src,
    rel,
    hasShortTargetUrn ? `urn:ró:${tgt.slice(2)}` : tgt,
  ]];
}

function applyTripleProcessors(
  processors: TripleProcessor[],
  triple: Triple,
): Triple[] {
  let outputTriples: Triple[] = [triple];
  for (const processor of processors) {
    const nextTriples: Triple[] = [];
    for (const outputTriple of outputTriples) {
      nextTriples.push(...processor(outputTriple));
    }
    outputTriples = nextTriples;
  }
  return outputTriples;
}

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

export function addYear(tdb: TribbleDB): void {
  const years = tdb.search({ relation: KnownRelations.CREATED_AT })
    .triples()
    .flatMap(([src, _, tgt]) => {
      const date = new Date(tgt);
      if (isNaN(date.getTime())) {
        return [];
      }
      const yearTriple: Triple = [
        src,
        KnownRelations.YEAR,
        date.getUTCFullYear().toString(),
      ];
      return [yearTriple];
    });

  tdb.add(years);
}

export function addPlaceFeatureSubjects(tdb: TribbleDB): void {
  const results = tdb.search({ relation: KnownRelations.FEATURES }).triples();
  const featureUrns = new Set<string>();

  for (const [, , tgt] of results) {
    if (asUrn(tgt)?.type === KnownTypes.PLACE_FEATURE) {
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

export function addInverseRelations(tdb: TribbleDB): void {
  const triples: Triple[] = [];
  for (const [to, from] of RelationSymmetries) {
    const results = tdb.search({ relation: to }).triples();
    for (const [src, _, tgt] of results) {
      triples.push([tgt, from, src]);
    }
  }
  tdb.add(triples);
}
