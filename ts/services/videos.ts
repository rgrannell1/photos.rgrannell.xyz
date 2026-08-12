import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Video } from "../types.ts";
import { readAlbum, readVideos } from "./readers.ts";
import { albumUrn } from "../commons/urn.ts";
import { KnownTypes } from "../constants/data.ts";

/*
 * A video annotated with the year of its album, for year grouping.
 */
export type DatedVideo = Video & { year: number };

/*
 * Map each video's album id to that album's start date.
 */
function readAlbumMinDates(tdb: TribbleDB, videos: Video[]): Map<string, number> {
  return new Map(
    videos.map((video) => [video.albumId, readAlbum(tdb, albumUrn(video.albumId))?.minDate ?? 0])
  );
}

/*
 * Annotate videos with their album's year, sorted by album start date,
 * newest album first.
 */
function sortByAlbumDate(tdb: TribbleDB, videos: Video[]): DatedVideo[] {
  const albumMinDate = readAlbumMinDates(tdb, videos);

  const datedVideos = videos.map((video) => ({
    ...video,
    year: new Date(albumMinDate.get(video.albumId) ?? 0).getFullYear(),
  }));

  return datedVideos.sort((videoA, videoB) =>
    (albumMinDate.get(videoB.albumId) ?? 0) - (albumMinDate.get(videoA.albumId) ?? 0)
  );
}

// a run of consecutive videos from one year, with its heading state
export type VideoYearGroup = {
  year: number;
  // the current year runs headerless, matching the albums page
  showHeading: boolean;
  videos: DatedVideo[];
};

/*
 * Pure transform: split a date-sorted video list into consecutive year runs.
 */
export function groupVideosByYear(
  videos: DatedVideo[],
  currentYear: number,
): VideoYearGroup[] {
  const groups: VideoYearGroup[] = [];

  for (const video of videos) {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.year === video.year) {
      lastGroup.videos.push(video);
      continue;
    }

    const showHeading = video.year !== currentYear;
    groups.push({ year: video.year, showHeading, videos: [video] });
  }

  return groups;
}

/*
 * Read and parse all videos, sorted chronologically by album date (oldest first).
 *
 * @param tdb The TribbleDB instance
 *
 * @return The parsed videos
 */
export function readAllVideos(tdb: TribbleDB): DatedVideo[] {
  const videoUrns = tdb.search({
    source: { type: KnownTypes.VIDEO },
  }).sources();

  return sortByAlbumDate(tdb, readVideos(tdb, videoUrns));
}

/*
 * Read videos associated with a set of thing URNs (subjects or locations).
 */
export function readVideosByThingIds(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): DatedVideo[] {
  const videoIds = new Set<string>();

  for (const thingUrn of thingUrns) {
    const { type, id } = asUrn(thingUrn);

    const results = tdb.search({
      source: { type: KnownTypes.VIDEO },
      target: { type, id },
    }).sources();

    for (const result of results) {
      videoIds.add(result);
    }
  }

  return sortByAlbumDate(tdb, readVideos(tdb, videoIds));
}
