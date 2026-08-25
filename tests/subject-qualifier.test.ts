/*
 * Unit tests for the subject context chip: which URNs earn one, and what it
 * reads. Mirror writes both "captive" and "captivity", so both must collapse
 * to one label.
 */

import { subjectQualifier, urnContext } from "../ts/commons/urn.ts";
import { NONE } from "../ts/commons/maybe.ts";

function assertEquals(actual: unknown, expected: unknown) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

const CONTEXT_CASES = [
  {
    name: "reads the context of a qualified urn",
    urn: "urn:ró:bird:inca-tern?context=captive",
    expected: "captive",
  },
  {
    name: "has no context without a query string",
    urn: "urn:ró:bird:inca-tern",
    expected: NONE,
  },
  {
    name: "has no context when the query string omits it",
    urn: "urn:ró:bird:inca-tern?flag=ie",
    expected: NONE,
  },
];

for (const testCase of CONTEXT_CASES) {
  Deno.test(`urnContext: ${testCase.name}`, () => {
    assertEquals(urnContext(testCase.urn), testCase.expected);
  });
}

const QUALIFIER_CASES = [
  {
    name: "labels a captive subject",
    urn: "urn:ró:bird:inca-tern?context=captive",
    expected: "captive",
  },
  {
    name: "labels captivity as captive too",
    urn: "urn:ró:bird:inca-tern?context=captivity",
    expected: "captive",
  },
  {
    name: "labels a museum subject",
    urn: "urn:ró:bird:great-auk?context=museum",
    expected: "museum",
  },
  {
    name: "leaves a wild subject unmarked",
    urn: "urn:ró:bird:common-guillemot?context=wild",
    expected: NONE,
  },
  {
    name: "leaves a subject with no context unmarked",
    urn: "urn:ró:bird:common-guillemot",
    expected: NONE,
  },
  {
    name: "shows an unknown context as it is written",
    urn: "urn:ró:bird:inca-tern?context=rehabilitated",
    expected: "rehabilitated",
  },
];

for (const testCase of QUALIFIER_CASES) {
  Deno.test(`subjectQualifier: ${testCase.name}`, () => {
    assertEquals(subjectQualifier(testCase.urn), testCase.expected);
  });
}
