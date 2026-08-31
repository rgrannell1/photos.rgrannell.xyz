/* Derive media subject and cover links for parent taxa. */

/* Derive media subject and cover links for parent taxa. */
import type { Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  KnownRelations,
  KnownTypes,
  TAXON_RANKS,
} from "../../../constants/data.ts";
import { baseUrn } from "./urns.ts";

type TaxonIndex = {
  taxaBySpecies: Map<string, string[]>;
  taxonUrns: Set<string>;
};

/** Return the indexed parent taxa for one species, or an empty list. */
function readSpeciesTaxa(
  taxaBySpecies: Map<string, string[]>,
  speciesUrn: string,
): string[] {
  const taxa = taxaBySpecies.get(speciesUrn) ?? [];
  return taxa;
}

/** Add one parent taxon to a species index entry. */
function addSpeciesTaxon(
  taxaBySpecies: Map<string, string[]>,
  speciesUrn: string,
  taxonUrn: string,
): void {
  const taxa = readSpeciesTaxa(taxaBySpecies, speciesUrn);
  taxa.push(taxonUrn);
  taxaBySpecies.set(speciesUrn, taxa);
}

/** Index the parent taxon from one rank triple under its base species URN. */
function indexRankTriple(
  index: TaxonIndex,
  sourceUrn: string,
  taxonUrn: string,
): void {
  const speciesUrn = baseUrn(sourceUrn);
  const taxaBySpecies = index.taxaBySpecies;
  addSpeciesTaxon(taxaBySpecies, speciesUrn, taxonUrn);
  index.taxonUrns.add(taxonUrn);
}

/** Read all triples for one taxonomic rank relation. */
function readRankTriples(tdb: TribbleDB, relation: string): Triple[] {
  const query = { relation };
  const triples = tdb.search(query).triples();
  return triples;
}

/** Add every species-to-taxon link for one rank to the taxon index. */
function indexRank(tdb: TribbleDB, index: TaxonIndex, relation: string): void {
  const rankTriples = readRankTriples(tdb, relation);
  for (const [sourceUrn, , taxonUrn] of rankTriples) {
    indexRankTriple(index, sourceUrn, taxonUrn);
  }
}

/** Create an empty index of species parents and known taxon URNs. */
function createTaxonIndex(): TaxonIndex {
  return {
    taxaBySpecies: new Map<string, string[]>(),
    taxonUrns: new Set<string>(),
  };
}

/** Build the complete species-to-parent index across all configured taxonomic ranks. */
function readTaxonIndex(tdb: TribbleDB): TaxonIndex {
  const index = createTaxonIndex();
  const ranks = TAXON_RANKS;
  for (const rank of ranks) {
    indexRank(tdb, index, rank.relation);
  }
  return index;
}

/** Read subject and cover triples that can propagate to parent taxa. */
function readLiftedMediaTriples(tdb: TribbleDB, mediaType: string): Triple[] {
  const liftedRelations = [KnownRelations.SUBJECT, KnownRelations.COVER];
  const triples = tdb.search({
    source: { type: mediaType },
    relation: liftedRelations,
  }).triples();
  return triples;
}

/** Copy one media relation from its species target to each indexed parent taxon. */
function addTaxonRelations(
  mediaTriple: Triple,
  taxaBySpecies: Map<string, string[]>,
  triples: Triple[],
): void {
  const [sourceUrn, relation, targetUrn] = mediaTriple;
  const taxa = taxaBySpecies.get(baseUrn(targetUrn)) ?? [];
  for (const taxonUrn of taxa) {
    triples.push([sourceUrn, relation, taxonUrn]);
  }
}

/** Seed identity triples so parent taxa exist before lifted relations are added. */
function seedTaxonTriples(taxonUrns: Set<string>): Triple[] {
  const triples: Triple[] = [];
  for (const taxonUrn of taxonUrns) {
    const triple: Triple = [taxonUrn, "id", taxonUrn];
    triples.push(triple);
  }
  return triples;
}

/** Lift photo and video subject and cover relations to indexed parent taxa. */
function addLiftedRelations(
  tdb: TribbleDB,
  taxaBySpecies: Map<string, string[]>,
  triples: Triple[],
): void {
  const mediaTypes = [KnownTypes.PHOTO, KnownTypes.VIDEO];
  for (const mediaType of mediaTypes) {
    const mediaTriples = readLiftedMediaTriples(tdb, mediaType);
    for (const mediaTriple of mediaTriples) {
      addTaxonRelations(mediaTriple, taxaBySpecies, triples);
    }
  }
}

/** Add derived parent-taxon subjects and covers to the triple store. */
export function addTaxonSubjects(tdb: TribbleDB): void {
  const { taxaBySpecies, taxonUrns } = readTaxonIndex(tdb);
  const triples = seedTaxonTriples(taxonUrns);
  addLiftedRelations(tdb, taxaBySpecies, triples);
  tdb.add(triples);
}
