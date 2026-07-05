/*
 * Unit regression tests for the derivation-pass ordering.
 */

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
