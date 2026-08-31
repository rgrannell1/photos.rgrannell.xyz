/* Support stream operations. */

/* Transform streamed triples and add cheap indexed relations. */
/* Support stream operations. */
/* Transform streamed triples and add cheap indexed relations. */
import { asUrn, type Thing, type Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { humanise } from "../../../commons/strings.ts";
import { ENDPOINT, KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { type TripleProcessor } from "../classification/curies.ts";
import { URN_ALIASES } from "./stream.ts";

/** Expands a CDN-relative target against the configured endpoint. */
export function expandCdnTarget(target: Thing): string {
  return `${ENDPOINT}${target}`;
}

/** Replaces a known URN alias with its canonical value. */
export function canonicaliseUrn(value: Thing): Thing {
  return URN_ALIASES.get(value) ?? value;
}

/** Expands the short local URN syntax and preserves other values. */
export function expandUrn(value: Thing): Thing {
  const hasShortUrn = value.startsWith("::");
  return hasShortUrn ? `urn:ró:${value.slice(2)}` : value;
}

/** Derives a UTC year triple when the source target is a valid date. */
export function createYearTriple(triple: Triple): Triple[] {
  const [source, , target] = triple;
  const date = new Date(target);
  if (isNaN(date.getTime())) {
    return [];
  }
  const year = date.getUTCFullYear().toString();
  return [[source, KnownRelations.YEAR, year]];
}

/** Applies triple processors in sequence to each prior processor's output. */
export function applyTripleProcessors(
  processors: TripleProcessor[],
  triple: Triple,
): Triple[] {
  let outputTriples: Triple[] = [triple];
  for (const processor of processors) {
    outputTriples = outputTriples.flatMap(processor);
  }
  return outputTriples;
}

/** Collects place-feature URNs referenced by feature relations. */
export function collectPlaceFeatureUrns(tdb: TribbleDB): Set<string> {
  const results = tdb.search({ relation: KnownRelations.FEATURES }).triples();
  const featureUrns = new Set<string>();
  for (const [, , target] of results) {
    if (asUrn(target)?.type === KnownTypes.PLACE_FEATURE) {
      featureUrns.add(target);
    }
  }
  return featureUrns;
}

/** Creates identity and human-readable name triples for place features. */
export function createPlaceFeatureTriples(featureUrns: Set<string>): Triple[] {
  const triples: Triple[] = [];
  for (const urn of featureUrns) {
    const { id } = asUrn(urn)!;
    triples.push([urn, "id", urn], [urn, KnownRelations.NAME, humanise(id)]);
  }
  return triples;
}

/** Appends reversed triples for every match of the given relation. */
export function addInverseRelationTriples(
  tdb: TribbleDB,
  relation: string,
  inverseRelation: string,
  triples: Triple[],
): void {
  const search = tdb.search({ relation });
  const results = search.triples();
  for (const [source, , target] of results) {
    triples.push([target, inverseRelation, source]);
  }
}
