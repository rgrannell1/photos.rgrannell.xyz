/* Order and run semantic derivation passes. */

/* Order and run semantic derivation passes. */
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  addFeatureMediaLocations,
  addNestedLocations,
  addTransitiveMediaLocations,
} from "../locations/locations.ts";
import { pruneMedialessThings } from "../classification/pruning.ts";
import {
  addInverseRelations,
  addPlaceFeatureSubjects,
  addYear,
} from "./stream.ts";
import { addTaxonSubjects } from "../classification/taxonomy.ts";
import {
  createPassOrderState,
  orderNextPass,
  validatePasses,
} from "./passes-helpers.ts";

export type DerivationPass = {
  name: string;
  after: string[];
  run: (tdb: TribbleDB) => void;
};

export type PassOrderState = {
  ordered: DerivationPass[];
  completed: Set<string>;
  remaining: DerivationPass[];
};

export function orderPasses(passes: DerivationPass[]): DerivationPass[] {
  validatePasses(passes);
  const state = createPassOrderState(passes);
  while (state.remaining.length > 0) {
    orderNextPass(state);
  }
  const ordered = state.ordered;
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
  {
    name: "addFeatureMediaLocations",
    after: [],
    run: addFeatureMediaLocations,
  },
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
