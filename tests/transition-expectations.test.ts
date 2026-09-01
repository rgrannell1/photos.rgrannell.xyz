/* Table checks for generic transition expectations. */

import { calculateRunCount } from "./expectations/transitions.ts";

const RUN_CASES: Array<{ values: Array<string | undefined>; expected: number }> = [
  { values: [], expected: 0 },
  { values: ["alpha"], expected: 1 },
  { values: ["alpha", "alpha"], expected: 1 },
  { values: ["alpha", "beta", "beta", "alpha"], expected: 3 },
  { values: [undefined, undefined, "alpha", undefined], expected: 3 },
];

Deno.test("calculateRunCount counts every consecutive value run", () => {
  for (const testCase of RUN_CASES) {
    const actual = calculateRunCount(testCase.values);
    if (actual !== testCase.expected) {
      throw new Error(`expected ${testCase.expected} runs, received ${actual}`);
    }
  }
});
