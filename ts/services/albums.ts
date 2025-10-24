import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import type { Photo, Video } from "../types.ts";
import { parseVideo } from "../parsers/video.ts";
import { parsePhoto } from "../parsers/photo.ts";
import { parseAlbum } from "../parsers/album.ts";
import { readThingsByPhotoIds } from "./photos.ts";
import { readParsedThing, readParsedThings } from "./things.ts";

export function albumYear(album: Album) {
  return new Date(album.minDate).getFullYear();
}

/*
 * Read albums from the TribbleDB
 */
export function readAlbums(tdb: TribbleDB): Album[] {
  const ids = tdb.search({
    source: { type: "album" },
  }).sources();

  return (readParsedAlbums(tdb, ids) as Album[])
    .sort((album0: Album, album1: Album) => {
      return album1.minDate - album0.minDate;
    });
}

/*
 * Get the photo IDs associated with an album ID
 */
export function readAlbumPhotoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: "photo" },
    relation: "albumId",
    target: { id: asUrn(id).id },
  }).sources();
}

/* */
export function readAlbumPhotosByAlbumId(tdb: TribbleDB, id: string): Photo[] {
  const photoSources = Array.from(readAlbumPhotoIds(tdb, id));

  return photoSources.flatMap((source: string) => {
    const info = tdb.search({
      source: asUrn(source),
    }).firstObject(false);

    if (!info) {
      return [];
    }

    const parsed = parsePhoto(tdb, info);
    return parsed ? [parsed] : [];
  });
}

/* */
export function readAlbumVideosByAlbumId(tdb: TribbleDB, id: string): Video[] {
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

/*
 * Photos in an album are associated with places (`location` relation) and
 * with subjects (`subject` relation). This function enumerates information on all of the
 * things in an album via the relation
 *
 * (x) -> [:subject|:location] -> (:photo) - [:albumId] -> (id:album)
 */
export function readThingsByAlbumId(tdb: TribbleDB, id: string) {
  const photoIds = readAlbumPhotoIds(tdb, id);

  return readThingsByPhotoIds(tdb, photoIds);
}

export const readAlbum = readParsedThing.bind(null, parseAlbum);

export const readParsedAlbums = readParsedThings.bind(null, parseAlbum);
