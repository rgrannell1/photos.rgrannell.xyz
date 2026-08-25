/* Pure video grouping by album year. */

import type { Video } from "../types/domain.ts";

export type DatedVideo = Video & { year: number };

export type VideoYearGroup = {
  year: number;
  showHeading: boolean;
  videos: DatedVideo[];
};

export function groupVideosByYear(
  videos: DatedVideo[],
  currentYear: number,
): VideoYearGroup[] {
  const groups: VideoYearGroup[] = [];

  for (const video of videos) {
    const lastGroup = groups[groups.length - 1];
    const continuesYearGroup = lastGroup?.year === video.year;

    if (continuesYearGroup) {
      lastGroup.videos.push(video);
      continue;
    }

    const showHeading = video.year !== currentYear;
    groups.push({ year: video.year, showHeading, videos: [video] });
  }

  return groups;
}
