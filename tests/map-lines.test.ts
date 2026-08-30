/* Characterise the trip line geometry used by the Leaflet map. */

import { curveTripLine } from "../ts/services/map/map-lines/map-lines.ts";

function assertEquals(actual: unknown, expected: unknown): void {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

type MapLineTestCase = {
  name: string;
  points: [number, number][];
  expected: [number, number][];
};

const TEST_CASES: MapLineTestCase[] = [
  {
    name: "keeps a single point unchanged",
    points: [[1, 2]],
    expected: [[1, 2]],
  },
  {
    name: "curves an eastbound leg north",
    points: [[0, 0], [0, 4]],
    expected: [[0, 0], [0.5, 2], [0, 4]],
  },
  {
    name: "joins consecutive curves without duplicate points",
    points: [[0, 0], [0, 4], [0, 8]],
    expected: [[0, 0], [0.5, 2], [0, 4], [0.5, 6], [0, 8]],
  },
];

for (const testCase of TEST_CASES) {
  Deno.test(`curveTripLine: ${testCase.name}`, () => {
    const actual = curveTripLine(testCase.points, 2);
    assertEquals(actual, testCase.expected);
  });
}
