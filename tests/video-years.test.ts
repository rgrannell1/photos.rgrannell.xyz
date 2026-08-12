/*
 * Unit tests for the year grouping used by the videos page.
 */

import { type DatedVideo, groupVideosByYear } from "../ts/services/videos.ts";

function assertEquals(actual: unknown, expected: unknown) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);

  if (actualJson !== expectedJson) {
    throw new Error(`expected ${expectedJson}, got ${actualJson}`);
  }
}

/* A video carrying only the fields the grouping reads. */
function datedVideo(id: string, year: number): DatedVideo {
  return { id, year } as unknown as DatedVideo;
}

type GroupSummary = {
  year: number;
  showHeading: boolean;
  videos: string[];
};

function summarise(groups: ReturnType<typeof groupVideosByYear>): GroupSummary[] {
  return groups.map((group) => ({
    year: group.year,
    showHeading: group.showHeading,
    videos: group.videos.map((video) => video.id),
  }));
}

const GROUP_CASES = [
  {
    name: "returns no groups for an empty list",
    videos: [],
    currentYear: 2026,
    expected: [],
  },
  {
    name: "collects one year into a single group",
    videos: [datedVideo("a", 2024), datedVideo("b", 2024)],
    currentYear: 2026,
    expected: [{ year: 2024, showHeading: true, videos: ["a", "b"] }],
  },
  {
    name: "splits consecutive runs by year",
    videos: [
      datedVideo("a", 2024),
      datedVideo("b", 2023),
      datedVideo("c", 2023),
    ],
    currentYear: 2026,
    expected: [
      { year: 2024, showHeading: true, videos: ["a"] },
      { year: 2023, showHeading: true, videos: ["b", "c"] },
    ],
  },
  {
    name: "runs the current year headerless",
    videos: [datedVideo("a", 2026), datedVideo("b", 2025)],
    currentYear: 2026,
    expected: [
      { year: 2026, showHeading: false, videos: ["a"] },
      { year: 2025, showHeading: true, videos: ["b"] },
    ],
  },
  {
    name: "starts a new group when a year repeats after a gap",
    videos: [
      datedVideo("a", 2024),
      datedVideo("b", 2023),
      datedVideo("c", 2024),
    ],
    currentYear: 2026,
    expected: [
      { year: 2024, showHeading: true, videos: ["a"] },
      { year: 2023, showHeading: true, videos: ["b"] },
      { year: 2024, showHeading: true, videos: ["c"] },
    ],
  },
];

for (const testCase of GROUP_CASES) {
  Deno.test(`groupVideosByYear: ${testCase.name}`, () => {
    const groups = groupVideosByYear(testCase.videos, testCase.currentYear);
    assertEquals(summarise(groups), testCase.expected);
  });
}
