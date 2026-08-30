/*
 * Unit tests for the year grouping used by the photos grid.
 */

import type { Photo } from "../ts/types/domain.ts";
import { groupPhotosByYear } from "../ts/domain/media/photos.ts";

function assertEquals(actual: unknown, expected: unknown) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

/* A photo carrying only the fields the grouping reads. */
function datedPhoto(id: string, isoDate: string): Photo {
  const createdAt = isoDate === "invalid"
    ? "not-a-date"
    : String(Date.parse(isoDate));

  return { id, createdAt } as unknown as Photo;
}

type GroupSummary = {
  year: number;
  showHeading: boolean;
  photos: string[];
};

function summarise(groups: ReturnType<typeof groupPhotosByYear>): GroupSummary[] {
  return groups.map((group) => ({
    year: group.year,
    showHeading: group.showHeading,
    photos: group.photos.map((photo) => photo.id),
  }));
}

const GROUP_CASES = [
  {
    name: "returns no groups for an empty list",
    photos: [],
    currentYear: 2026,
    expected: [],
  },
  {
    name: "collects one year into a single group",
    photos: [
      datedPhoto("a", "2024-03-01T12:00:00Z"),
      datedPhoto("b", "2024-01-05T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [{ year: 2024, showHeading: true, photos: ["a", "b"] }],
  },
  {
    name: "splits consecutive runs by year",
    photos: [
      datedPhoto("a", "2024-03-01T12:00:00Z"),
      datedPhoto("b", "2023-11-01T12:00:00Z"),
      datedPhoto("c", "2023-02-01T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [
      { year: 2024, showHeading: true, photos: ["a"] },
      { year: 2023, showHeading: true, photos: ["b", "c"] },
    ],
  },
  {
    name: "runs the current year headerless",
    photos: [
      datedPhoto("a", "2026-03-01T12:00:00Z"),
      datedPhoto("b", "2025-03-01T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [
      { year: 2026, showHeading: false, photos: ["a"] },
      { year: 2025, showHeading: true, photos: ["b"] },
    ],
  },
  {
    name: "starts a new group when a year repeats after a gap",
    photos: [
      datedPhoto("a", "2024-03-01T12:00:00Z"),
      datedPhoto("b", "2023-03-01T12:00:00Z"),
      datedPhoto("c", "2024-01-01T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [
      { year: 2024, showHeading: true, photos: ["a"] },
      { year: 2023, showHeading: true, photos: ["b"] },
      { year: 2024, showHeading: true, photos: ["c"] },
    ],
  },
  {
    name: "joins an undated photo to the run above it",
    photos: [
      datedPhoto("a", "2024-03-01T12:00:00Z"),
      datedPhoto("b", "invalid"),
      datedPhoto("c", "2024-01-01T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [{ year: 2024, showHeading: true, photos: ["a", "b", "c"] }],
  },
  {
    name: "gives a leading undated photo no heading",
    photos: [
      datedPhoto("a", "invalid"),
      datedPhoto("b", "2024-01-01T12:00:00Z"),
    ],
    currentYear: 2026,
    expected: [
      { year: null, showHeading: false, photos: ["a"] },
      { year: 2024, showHeading: true, photos: ["b"] },
    ],
  },
];

for (const testCase of GROUP_CASES) {
  Deno.test(`groupPhotosByYear: ${testCase.name}`, () => {
    const groups = groupPhotosByYear(testCase.photos, testCase.currentYear);
    assertEquals(summarise(groups), testCase.expected);
  });
}
