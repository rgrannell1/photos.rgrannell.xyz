/*
 * Unit regression tests for pure helpers: exif date formatting and
 * derivation-pass ordering.
 */

import { formatExifDate } from "../ts/services/dates.ts";
import { orderPasses } from "../ts/semantic/derive.ts";

function assertEquals(actual: unknown, expected: unknown) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

function assertThrows(fn: () => unknown) {
  try {
    fn();
  } catch {
    return;
  }
  throw new Error("expected function to throw");
}

// regression: formatExifDate previously destructured a string as an array,
// returning single characters instead of the date and time parts
const EXIF_DATE_CASES = [
  {
    name: "formats an exif datetime",
    input: "2024:05:01 12:34:56",
    expected: "2024/05/01 12:34:56",
  },
  {
    name: "passes empty input through",
    input: "",
    expected: "",
  },
];

for (const testCase of EXIF_DATE_CASES) {
  Deno.test(`formatExifDate: ${testCase.name}`, () => {
    assertEquals(formatExifDate(testCase.input), testCase.expected);
  });
}

function namedPass(name: string, after: string[]) {
  return { name, after, run: () => {} };
}

const ORDER_CASES = [
  {
    name: "keeps declaration order for independent passes",
    passes: [namedPass("first", []), namedPass("second", [])],
    expected: ["first", "second"],
  },
  {
    name: "runs a pass after its dependency",
    passes: [namedPass("prune", ["derive"]), namedPass("derive", [])],
    expected: ["derive", "prune"],
  },
  {
    name: "orders a chain of dependencies",
    passes: [
      namedPass("third", ["second"]),
      namedPass("second", ["first"]),
      namedPass("first", []),
    ],
    expected: ["first", "second", "third"],
  },
];

for (const testCase of ORDER_CASES) {
  Deno.test(`orderPasses: ${testCase.name}`, () => {
    const ordered = orderPasses(testCase.passes).map((pass) => pass.name);
    assertEquals(ordered, testCase.expected);
  });
}

const ORDER_ERROR_CASES = [
  {
    name: "throws on unknown dependencies",
    passes: [namedPass("only", ["missing"])],
  },
  {
    name: "throws on cyclic dependencies",
    passes: [namedPass("chicken", ["egg"]), namedPass("egg", ["chicken"])],
  },
];

for (const testCase of ORDER_ERROR_CASES) {
  Deno.test(`orderPasses: ${testCase.name}`, () => {
    assertThrows(() => orderPasses(testCase.passes));
  });
}
