/* Lazy emoji reader tests. */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { readThingEmoji } from "../ts/services/data/emoji.ts";

const PLACE = "urn:ró:place:test-place";
const FEATURE = "urn:ró:place_feature:test-feature";

const CASES = [
  {
    name: "reads a place feature emoji",
    triples: [
      [FEATURE, "id", FEATURE],
      [FEATURE, "emoji", "🏛️"],
    ] as [string, string, string][],
    thing: {
      id: PLACE,
      name: "Test Place",
      type: "place" as const,
      features: FEATURE,
    },
    expected: "🏛️",
  },
  {
    name: "uses a place flag first",
    triples: [
      [FEATURE, "id", FEATURE],
      [FEATURE, "emoji", "🏛️"],
    ] as [string, string, string][],
    thing: {
      id: PLACE,
      name: "Test Place",
      type: "place" as const,
      features: FEATURE,
      flag: "Ireland",
    },
    expected: "Ireland",
  },
  {
    name: "falls back when a place has no feature",
    triples: [] as [string, string, string][],
    thing: { id: PLACE, name: "Test Place", type: "place" as const },
    expected: "📍",
  },
];

for (const testCase of CASES) {
  Deno.test(`readThingEmoji: ${testCase.name}`, () => {
    const tdb = new TribbleDB(testCase.triples);
    const actual = readThingEmoji(tdb, PLACE, "Test Place", testCase.thing);

    if (actual !== testCase.expected) {
      throw new Error(`expected ${testCase.expected}, got ${actual}`);
    }
  });
}
