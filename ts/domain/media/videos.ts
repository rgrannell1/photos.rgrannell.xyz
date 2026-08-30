/* Pure video grouping by album year. */

/* Pure video grouping by album year. */
import type { Video } from "../../types/domain.ts";

export type DatedVideo = Video & { year: number };

export type VideoYearGroup = {
  year: number;
  showHeading: boolean;
  videos: DatedVideo[];
};

function readLastVideoGroup(
  groups: VideoYearGroup[],
): VideoYearGroup | undefined {
  return groups[groups.length - 1];
}

function appendToVideoYearGroup(
  groups: VideoYearGroup[],
  video: DatedVideo,
): boolean {
  const lastGroup = readLastVideoGroup(groups);
  const continuesYearGroup = lastGroup?.year === video.year;
  if (!continuesYearGroup) {
    return false;
  }
  lastGroup.videos.push(video);
  return true;
}

function addVideoYearGroup(
  groups: VideoYearGroup[],
  video: DatedVideo,
  currentYear: number,
): void {
  const showHeading = video.year !== currentYear;
  const group = { year: video.year, showHeading, videos: [video] };
  groups.push(group);
}

function addVideoToYearGroups(
  groups: VideoYearGroup[],
  currentYear: number,
  video: DatedVideo,
): void {
  const appended = appendToVideoYearGroup(groups, video);
  if (!appended) {
    addVideoYearGroup(groups, video, currentYear);
  }
}

export function groupVideosByYear(
  videos: DatedVideo[],
  currentYear: number,
): VideoYearGroup[] {
  const groups: VideoYearGroup[] = [];
  const addVideo = addVideoToYearGroups.bind(null, groups, currentYear);

  for (const video of videos) {
    addVideo(video);
  }

  return groups;
}
