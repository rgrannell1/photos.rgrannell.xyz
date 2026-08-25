/* Order and run semantic derivation passes. */

import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  addFeatureMediaLocations,
  addNestedLocations,
  addTransitiveMediaLocations,
} from "./locations.ts";
import { pruneMedialessThings } from "./pruning.ts";
import {
  addInverseRelations,
  addPlaceFeatureSubjects,
  addYear,
} from "./stream.ts";
import { addTaxonSubjects } from "./taxonomy.ts";

export type DerivationPass = {
  name: string;
  after: string[];
  run: (tdb: TribbleDB) => void;
};

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
    const readyIdx = remaining.findIndex((pass) => {
      return pass.after.every((dependency) => completed.has(dependency));
    });
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

const STREAM_PASSES: DerivationPass[] = [
  { name: "addYear", after: [], run: addYear },
  { name: "addPlaceFeatureSubjects", after: [], run: addPlaceFeatureSubjects },
  { name: "addInverseRelations", after: [], run: addInverseRelations },
];

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

export function runStreamPasses(tdb: TribbleDB): void {
  for (const pass of orderPasses(STREAM_PASSES)) {
    pass.run(tdb);
  }
}

export function runFinalPasses(tdb: TribbleDB): void {
  for (const pass of orderPasses(FINAL_PASSES)) {
    pass.run(tdb);
  }
}

export function postIndexing(tdb: TribbleDB): void {
  runStreamPasses(tdb);
  runFinalPasses(tdb);
}
