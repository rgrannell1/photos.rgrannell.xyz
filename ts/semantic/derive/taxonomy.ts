/* Derive media subject and cover links for parent taxa. */

import type { Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  KnownRelations,
  KnownTypes,
  TAXON_RANKS,
} from "../../constants/data.ts";
import { baseUrn } from "./urns.ts";

type TaxonIndex = {
  taxaBySpecies: Map<string, string[]>;
  taxonUrns: Set<string>;
};

function readTaxonIndex(tdb: TribbleDB): TaxonIndex {
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
  return { taxaBySpecies, taxonUrns };
}

function seedTaxonTriples(taxonUrns: Set<string>): Triple[] {
  const triples: Triple[] = [];
  for (const taxonUrn of taxonUrns) {
    triples.push([taxonUrn, "id", taxonUrn]);
  }
  return triples;
}

function addLiftedRelations(
  tdb: TribbleDB,
  taxaBySpecies: Map<string, string[]>,
  triples: Triple[],
): void {
  const liftedRelations = [KnownRelations.SUBJECT, KnownRelations.COVER];
  for (const mediaType of [KnownTypes.PHOTO, KnownTypes.VIDEO]) {
    const mediaTriples = tdb.search({
      source: { type: mediaType },
      relation: liftedRelations,
    }).triples();

    for (const [src, relation, tgt] of mediaTriples) {
      const taxa = taxaBySpecies.get(baseUrn(tgt)) ?? [];
      for (const taxonUrn of taxa) {
        triples.push([src, relation, taxonUrn]);
      }
    }
  }
}

export function addTaxonSubjects(tdb: TribbleDB): void {
  const { taxaBySpecies, taxonUrns } = readTaxonIndex(tdb);
  const triples = seedTaxonTriples(taxonUrns);
  addLiftedRelations(tdb, taxaBySpecies, triples);
  tdb.add(triples);
}
