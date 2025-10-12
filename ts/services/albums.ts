import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import { z } from "zod";
import { asInt } from "../numbers.ts";
import { countryNameToUrn, urnToFlag } from "../semantic/names.ts";
import type { Photo, Video } from "../types.ts";
import { parseVideo } from "./videos.ts";
import { parsePhoto } from "./photos.ts";

const AlbumSchema = z.object({
  name: z.string(),
  minDate: z.string(),
  maxDate: z.string(),
  thumbnailUrl: z.string(),
  mosaic: z.any(),
  id: z.string(),
  photosCount: z.string(),
  videosCount: z.string(),
  flags: z.any(),
  description: z.string().optional(),
});

/*
 * Read album-data
 *
 * @param tdb The TribbleDB instance to read from.
 * @param album The raw album object from the TribbleDB.
 * @returns The parsed album.
 */
function parseAlbum(tdb: TribbleDB, album: TripleObject): Album {
  const result = AlbumSchema.safeParse(album);
  if (!result.success) {
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.error.issues)}`,
    );
  }

  const countryNames = Array.isArray(result.data.flags)
    ? result.data.flags
    : [result.data.flags];

  const countries = countryNames.flatMap((countryName: string) => {
    const urn = countryNameToUrn(tdb, countryName);
    const flag = urn ? urnToFlag(tdb, urn) : undefined;

    if (!urn || !flag) {
      return [];
    }

    return [{
      urn,
      name: countryName,
      flag,
    }];
  });

  return {
    name: result.data.name,
    minDate: asInt(result.data.minDate),
    maxDate: asInt(result.data.maxDate),
    thumbnailUrl: result.data.thumbnailUrl,
    mosaicColours: result.data.mosaic,
    id: result.data.id,
    photosCount: asInt(result.data.photosCount),
    videosCount: asInt(result.data.videosCount),
    description: result.data.description ?? "",
    countries,
  };
}

/*
 * Read albums from the TribbleDB
 */
export function readAlbums(tdb: TribbleDB): Album[] {
  return tdb.search({
    source: { type: "album" },
  }).objects()
    .map(parseAlbum.bind(null, tdb))
    .sort((album0: Album, album1: Album) => {
      return album1.minDate - album0.minDate;
    });
}

export function readAlbumById(tdb: TribbleDB, id: string): Album | undefined {
  return tdb.search({
    source: asUrn(id),
  }).objects()
    .map(parseAlbum.bind(null, tdb))[0];
}

export function readAlbumPhotosById(tdb: TribbleDB, id: string): Photo[] {
  const photoSources = Array.from(
    tdb.search({
      source: { type: "photo" },
      relation: "albumId",
      target: { id: asUrn(id).id },
    }).sources(),
  );

  return photoSources.flatMap((source: string) => {
    const info = tdb.search({
      source: asUrn(source),
    }).firstObject(false);

    return info ? [parsePhoto(tdb, info)] : [];
  });
}
export function readAlbumVideosById(tdb: TribbleDB, id: string): Video[] {
  const videoSources = Array.from(
    tdb.search({
      source: { type: "video" },
      relation: "albumId",
      target: { id: asUrn(id).id },
    }).sources(),
  );

  return videoSources.flatMap((source: string) => {
    const info = tdb.search({
      source: asUrn(source),
    }).firstObject(false);

    return info ? [parseVideo(tdb, info)] : [];
  });
}
