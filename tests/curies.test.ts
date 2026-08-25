/*
 * Regression tests for in-band curie handling: definitions stream first,
 * register into the expansion map, and drop from the indexed triples.
 */

import { createTripleDeriver } from "../ts/semantic/derive/mod.ts";
import type { Triple } from "@rgrannell1/tribbledb";

function assertEquals(actual: unknown, expected: unknown) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

const DEFINITIONS: Triple[] = [
  ["urn:ró:", "curie", "i"],
  ["https://en.wikipedia.org/wiki/", "curie", "wiki"],
];

const EXPANSION_CASES: { name: string; input: Triple; expected: Triple[] }[] = [
  {
    name: "curie definitions drop from the indexed triples",
    input: ["urn:ró:", "curie", "i"],
    expected: [],
  },
  {
    name: "sources and targets expand through registered definitions",
    input: ["[i:photo:abc]", "subject", "[i:bird:robin]"],
    expected: [["urn:ró:photo:abc", "subject", "urn:ró:bird:robin"]],
  },
  {
    name: "url curies expand through registered definitions",
    input: ["[i:bird:olm]", "wikipedia", "[wiki:Olm]"],
    expected: [["urn:ró:bird:olm", "wikipedia", "https://en.wikipedia.org/wiki/Olm"]],
  },
  {
    name: "unknown prefixes pass through unchanged",
    input: ["[i:photo:abc]", "wikipedia", "[nope:thing]"],
    expected: [["urn:ró:photo:abc", "wikipedia", "[nope:thing]"]],
  },
];

Deno.test("deriveTriples expands curies from in-band definitions", () => {
  const deriveTriples = createTripleDeriver();

  for (const definition of DEFINITIONS) {
    assertEquals(deriveTriples(definition), []);
  }

  for (const testCase of EXPANSION_CASES) {
    assertEquals(deriveTriples(testCase.input), testCase.expected);
  }
});

Deno.test("separate triple derivers isolate curie definitions", () => {
  const input: Triple = ["[cache:item]", "name", "example"];
  const firstDeriver = createTripleDeriver();
  const secondDeriver = createTripleDeriver();

  firstDeriver(["urn:first:", "curie", "cache"]);
  assertEquals(firstDeriver(input), [["urn:first:item", "name", "example"]]);

  secondDeriver(["urn:second:", "curie", "cache"]);
  assertEquals(secondDeriver(input), [["urn:second:item", "name", "example"]]);
});
