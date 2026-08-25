import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Video } from "../../types/domain.ts";
import { readAlbum, readVideos } from "./readers.ts";
import { albumUrn } from "../../commons/urn.ts";
import { KnownTypes } from "../../constants/data.ts";
import { isNone } from "../../commons/maybe.ts";
import type { DatedVideo } from "../../domain/videos.ts";

function readAlbumMinDates(tdb: TribbleDB, videos: Video[]): Map<string, number> {
  return new Map(
    videos.map((video) => {
      const album = readAlbum(tdb, albumUrn(video.albumId));
      return [video.albumId, isNone(album) ? 0 : album.minDate];
    }),
  );
}

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

export function readAllVideos(tdb: TribbleDB): DatedVideo[] {
  const videoUrns = tdb.search({
    source: { type: KnownTypes.VIDEO },
  }).sources();

  return sortByAlbumDate(tdb, readVideos(tdb, videoUrns));
}

export function readVideosByThingIds(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): DatedVideo[] {
  let things = tdb.nodes([]);
  for (const thingUrn of thingUrns) {
    const { type, id } = asUrn(thingUrn);
    things = things.union(tdb.nodes({ type, id }));
  }

  const videoIds = things
    .referencedBy()
    .filter({ type: KnownTypes.VIDEO })
    .urns();

  return sortByAlbumDate(tdb, readVideos(tdb, videoIds));
}
