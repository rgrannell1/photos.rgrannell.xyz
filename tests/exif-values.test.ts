/* Characterise EXIF value formatting used by the photo metadata table. */

import {
  formatAperture,
  formatDimensions,
  formatFocalLength,
  formatShutterSpeed,
} from "../ts/components/media/exif-values.ts";
import { type Maybe, NONE } from "../ts/commons/maybe.ts";

function assertEquals(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`expected ${expected}, got ${actual}`);
  }
}

type UnaryFormatCase = {
  name: string;
  value: Maybe<string>;
  expected: string;
};

const FOCAL_LENGTH_CASES: UnaryFormatCase[] = [
  { name: "missing", value: NONE, expected: "Unknown" },
  { name: "unknown", value: "Unknown", expected: "Unknown" },
  { name: "manual lens", value: "0", expected: "Manual lens" },
  { name: "known", value: "50", expected: "50mm" },
];

const SHUTTER_SPEED_CASES: UnaryFormatCase[] = [
  { name: "missing", value: NONE, expected: "Unknown" },
  { name: "invalid", value: "invalid", expected: "Unknown" },
  { name: "one second", value: "1", expected: "1 s" },
  { name: "fraction", value: "0.5", expected: "1/2 s" },
];

const APERTURE_CASES: UnaryFormatCase[] = [
  { name: "missing", value: NONE, expected: "Unknown" },
  { name: "unknown", value: "Unknown", expected: "Unknown" },
  { name: "manual", value: "0.0", expected: "Manual aperture control" },
  { name: "known", value: "2.8", expected: "ƒ/2.8" },
];

for (const testCase of FOCAL_LENGTH_CASES) {
  Deno.test(`formatFocalLength: ${testCase.name}`, () => {
    assertEquals(formatFocalLength(testCase.value), testCase.expected);
  });
}

for (const testCase of SHUTTER_SPEED_CASES) {
  Deno.test(`formatShutterSpeed: ${testCase.name}`, () => {
    assertEquals(formatShutterSpeed(testCase.value), testCase.expected);
  });
}

for (const testCase of APERTURE_CASES) {
  Deno.test(`formatAperture: ${testCase.name}`, () => {
    assertEquals(formatAperture(testCase.value), testCase.expected);
  });
}

Deno.test("formatDimensions: formats known dimensions", () => {
  assertEquals(formatDimensions("400", "300"), "400 x 300");
});

Deno.test("formatDimensions: handles a missing dimension", () => {
  assertEquals(formatDimensions("400", NONE), "Unknown");
});
