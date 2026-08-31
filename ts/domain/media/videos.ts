/* Pure video grouping by album year. */

/* Pure video grouping by album year. */
import type { Video } from "../../types/domain.ts";

export type DatedVideo = Video & { year: number };

export type VideoYearGroup = {
  year: number;
  showHeading: boolean;
  videos: DatedVideo[];
};

/** Return the most recently created year group, if one exists. */
function readLastVideoGroup(
  groups: VideoYearGroup[],
): VideoYearGroup | undefined {
  return groups[groups.length - 1];
}

/** Append a video when it continues the current year group. */
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

/** Start a year group and hide its heading for the current year. */
function addVideoYearGroup(
  groups: VideoYearGroup[],
  video: DatedVideo,
  currentYear: number,
): void {
  const showHeading = video.year !== currentYear;
  const group = { year: video.year, showHeading, videos: [video] };
  groups.push(group);
}

/** Append a video to its current group or start its next group. */
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

/** Group ordered videos into consecutive years for display. */
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
