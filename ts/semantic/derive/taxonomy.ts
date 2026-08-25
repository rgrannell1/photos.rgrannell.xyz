/* Derive media subject and cover links for parent taxa. */

import type { Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  KnownRelations,
  KnownTypes,
  TAXON_RANKS,
} from "../../constants/data.ts";
import { baseUrn } from "./urns.ts";

export function addTaxonSubjects(tdb: TribbleDB): void {
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
      const taxa = taxaBySpecies.get(baseUrn(tgt)) ?? [];
      for (const taxonUrn of taxa) {
        triples.push([src, relation, taxonUrn]);
      }
    }
  }

  tdb.add(triples);
}
