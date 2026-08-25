/*
 * Taxonomy tests: the addTaxonSubjects derivation copies media subjects up
 * to genus, family, and order taxa, and readTaxons title-cases labels.
 */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Triple } from "@rgrannell1/tribbledb";
import { addTaxonSubjects } from "../ts/semantic/derive.ts";
import { readTaxonMembers, readTaxons } from "../ts/commons/things.ts";
import { tdb as realTdb } from "../ts/build/loaders.ts";
import { KnownRelations, TAXON_RANKS } from "../ts/constants/data.ts";
import { one } from "../ts/commons/arrays.ts";

const PUFFIN = "urn:ró:bird:fratercula-arctica";
const ALCIDAE = "urn:ró:family:alcidae";
const FRATERCULA = "urn:ró:genus:fratercula";
const PHOTO = "urn:ró:photo:abc123";
const VIDEO = "urn:ró:video:def456";

type DeriveCase = {
  name: string;
  triples: Triple[];
  expected: Triple[];
};

const DERIVE_CASES: DeriveCase[] = [
  {
    name: "photo subject propagates to family",
    triples: [
      [PHOTO, "subject", PUFFIN],
      [PUFFIN, "family", ALCIDAE],
    ],
    expected: [
      [PHOTO, "subject", ALCIDAE],
      [ALCIDAE, "id", ALCIDAE],
    ],
  },
  {
    name: "qs-variant subject still propagates",
    triples: [
      [PHOTO, "subject", `${PUFFIN}?context=wild`],
      [PUFFIN, "family", ALCIDAE],
    ],
    expected: [
      [PHOTO, "subject", ALCIDAE],
    ],
  },
  {
    name: "video subject propagates to genus",
    triples: [
      [VIDEO, "subject", PUFFIN],
      [PUFFIN, "genus", FRATERCULA],
    ],
    expected: [
      [VIDEO, "subject", FRATERCULA],
    ],
  },
  {
    name: "photo cover propagates to family",
    triples: [
      [PHOTO, "cover", PUFFIN],
      [PUFFIN, "family", ALCIDAE],
    ],
    expected: [
      [PHOTO, "cover", ALCIDAE],
    ],
  },
];

for (const testCase of DERIVE_CASES) {
  Deno.test(`addTaxonSubjects: ${testCase.name}`, () => {
    const tdb = new TribbleDB(testCase.triples);
    addTaxonSubjects(tdb);

    const triples = tdb.triples().map((triple) => JSON.stringify(triple));

    for (const expected of testCase.expected) {
      if (!triples.includes(JSON.stringify(expected))) {
        throw new Error(
          `missing derived triple ${JSON.stringify(expected)}`,
        );
      }
    }
  });
}

type TaxonNameCase = {
  name: string;
  triples: Triple[];
  urn: string;
  expected: string;
};

const TAXON_NAME_CASES: TaxonNameCase[] = [
  {
    name: "latin label keeps its capital",
    triples: [[ALCIDAE, "id", ALCIDAE], [ALCIDAE, "name", "Alcidae"]],
    urn: ALCIDAE,
    expected: "Alcidae",
  },
  {
    name: "common name beats the latin name",
    triples: [
      [ALCIDAE, "id", ALCIDAE],
      [ALCIDAE, "name", "Alcidae"],
      [ALCIDAE, "commonName", "auks"],
    ],
    urn: ALCIDAE,
    expected: "Auks",
  },
  {
    name: "multi-word label gains title case",
    triples: [
      [ALCIDAE, "id", ALCIDAE],
      [ALCIDAE, "name", "alligators and caimans"],
    ],
    urn: ALCIDAE,
    expected: "Alligators And Caimans",
  },
  {
    name: "missing label falls back to the id",
    triples: [[ALCIDAE, "id", ALCIDAE]],
    urn: ALCIDAE,
    expected: "Alcidae",
  },
];

for (const testCase of TAXON_NAME_CASES) {
  Deno.test(`readTaxons: ${testCase.name}`, () => {
    const tdb = new TribbleDB(testCase.triples);
    const [taxon] = readTaxons(tdb, new Set([testCase.urn]));

    const label = one(taxon?.name);
    if (label !== testCase.expected) {
      throw new Error(`expected "${testCase.expected}", got "${String(label)}"`);
    }
  });
}

Deno.test("readTaxonMembers returns member species sorted by name", () => {
  const RAZORBILL = "urn:ró:bird:alca-torda";
  const tdb = new TribbleDB([
    [PUFFIN, "id", PUFFIN],
    [PUFFIN, "name", "Atlantic Puffin"],
    [PUFFIN, "family", ALCIDAE],
    [RAZORBILL, "id", RAZORBILL],
    [RAZORBILL, "name", "Razorbill"],
    [RAZORBILL, "family", ALCIDAE],
  ]);

  const names = readTaxonMembers(tdb, ALCIDAE)
    .map((member) => one(member.name));

  const expected = ["Atlantic Puffin", "Razorbill"];
  if (JSON.stringify(names) !== JSON.stringify(expected)) {
    throw new Error(`expected ${expected}, got ${names}`);
  }
});

function stripVariant(urn: string): string {
  return urn.split("?")[0];
}

Deno.test("every media species subject propagates to its taxa", () => {
  const rankRelations = TAXON_RANKS.map((rank) => rank.relation);

  const taxaBySpecies = new Map<string, string[]>();
  for (const relation of rankRelations) {
    for (const [src, , tgt] of realTdb.search({ relation }).triples()) {
      const taxa = taxaBySpecies.get(src) ?? [];
      taxa.push(tgt);
      taxaBySpecies.set(src, taxa);
    }
  }

  if (taxaBySpecies.size === 0) {
    throw new Error("no taxonomy triples found in the data");
  }

  const missing: string[] = [];
  for (const mediaType of ["photo", "video"]) {
    const subjectTriples = realTdb.search({
      source: { type: mediaType },
      relation: KnownRelations.SUBJECT,
    }).triples();

    const subjectPairs = new Set(
      subjectTriples.map(([src, , tgt]) => `${src} ${tgt}`),
    );

    for (const [src, , tgt] of subjectTriples) {
      for (const taxon of taxaBySpecies.get(stripVariant(tgt)) ?? []) {
        if (!subjectPairs.has(`${src} ${taxon}`)) {
          missing.push(`${src} subject ${taxon}`);
        }
      }
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `missing derived taxon subjects: ${missing.slice(0, 5).join(", ")}`,
    );
  }
});
