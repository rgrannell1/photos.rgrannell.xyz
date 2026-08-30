import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Video } from "../../../types/domain.ts";
import { readAlbum, readVideos } from "../readers.ts";
import { albumUrn } from "../../../commons/urn.ts";
import { KnownTypes } from "../../../constants/data.ts";
import { isNone } from "../../../commons/collections/maybe.ts";
import type { DatedVideo } from "../../../domain/media/videos.ts";

type VideoAlbumDate = [string, number];

function readVideoAlbumDate(tdb: TribbleDB, video: Video): VideoAlbumDate {
  const album = readAlbum(tdb, albumUrn(video.albumId));
  const minDate = isNone(album) ? 0 : album.minDate;
  return [video.albumId, minDate];
}

function readAlbumMinDates(
  tdb: TribbleDB,
  videos: Video[],
): Map<string, number> {
  const readAlbumDate = readVideoAlbumDate.bind(null, tdb);
  const albumDates = videos.map(readAlbumDate);
  return new Map(albumDates);
}

function addAlbumYear(
  albumMinDates: Map<string, number>,
  video: Video,
): DatedVideo {
  const minDate = albumMinDates.get(video.albumId) ?? 0;
  const year = new Date(minDate).getFullYear();
  return { ...video, year };
}

function compareVideoAlbumDates(
  albumMinDates: Map<string, number>,
  videoA: Video,
  videoB: Video,
): number {
  const dateA = albumMinDates.get(videoA.albumId) ?? 0;
  const dateB = albumMinDates.get(videoB.albumId) ?? 0;
  return dateB - dateA;
}

function sortDatedVideos(
  albumMinDates: Map<string, number>,
  videos: DatedVideo[],
): DatedVideo[] {
  const compareDates = compareVideoAlbumDates.bind(null, albumMinDates);
  return videos.sort(compareDates);
}

function sortByAlbumDate(tdb: TribbleDB, videos: Video[]): DatedVideo[] {
  const albumMinDates = readAlbumMinDates(tdb, videos);
  const addYear = addAlbumYear.bind(null, albumMinDates);
  const datedVideos = videos.map(addYear);

  return sortDatedVideos(albumMinDates, datedVideos);
}

function readVideoUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.VIDEO } };
  return tdb.search(query).sources();
}

function selectThing(tdb: TribbleDB, thingUrn: string) {
  const { type, id } = asUrn(thingUrn);
  const selector = { type, id };
  return tdb.nodes(selector);
}

export function readAllVideos(tdb: TribbleDB): DatedVideo[] {
  const videoUrns = readVideoUrns(tdb);
  const videos = readVideos(tdb, videoUrns);

  return sortByAlbumDate(tdb, videos);
}

function selectThings(tdb: TribbleDB, thingUrns: Set<string>) {
  let things = tdb.nodes([]);
  for (const thingUrn of thingUrns) {
    const thing = selectThing(tdb, thingUrn);
    things = things.union(thing);
  }
  return things;
}

function readReferencedVideoIds(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): Set<string> {
  const things = selectThings(tdb, thingUrns);
  const videos = things.referencedBy().filter({ type: KnownTypes.VIDEO });
  return videos.urns();
}

export function readVideosByThingIds(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): DatedVideo[] {
  const videoIds = readReferencedVideoIds(tdb, thingUrns);
  const videos = readVideos(tdb, videoIds);
  return sortByAlbumDate(tdb, videos);
}
