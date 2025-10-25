import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import type { Photo, Video } from "../types.ts";
import { parseAlbum } from "../parsers/album.ts";
import { readParsedPhotos, readThingsByPhotoIds } from "./photos.ts";
import { readParsedThing, readParsedThings } from "./things.ts";
import { readParsedVideos } from "./videos.ts";

/*
 * Get the album date
 */
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
 *
 * @param tdb TribbleDB instance
 * @param id Album URN
 */
export function readAlbumPhotoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: "photo" },
    relation: "albumId",
    target: { id: asUrn(id).id },
  }).sources();
}

/*
 * Read photos associated with an album
 *
 * @param tdb TribbleDB instance
 * @param id Album URN
 */
export function readAlbumPhotosByAlbumId(tdb: TribbleDB, id: string): Photo[] {
  return readParsedPhotos(tdb, readAlbumPhotoIds(tdb, id));
}

/*
 * Read videos associated with an album
 *
 * @param tdb TribbleDB instance
 * @param id Album URN
 */
export function readAlbumVideoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: "video" },
    relation: "albumId",
    target: { id: asUrn(id).id },
  }).sources();
}

/*
 * Read videos associated with an album
 *
 * @param tdb TribbleDB instance
 * @param id Album URN
 */
export function readAlbumVideosByAlbumId(tdb: TribbleDB, id: string): Video[] {
  return readParsedVideos(tdb, readAlbumVideoIds(tdb, id));
}

/*
 * Photos in an album are associated with places (`location` relation) and
 * with subjects (`subject` relation). This function enumerates information on all of the
 * things in an album via the relation
 *
 * (x) -> [:subject|:location] -> (:photo) - [:albumId] -> (id:album)
 */
export function readThingsByAlbumId(tdb: TribbleDB, id: string) {
  return readThingsByPhotoIds(tdb, readAlbumPhotoIds(tdb, id));
}

export const readAlbum = (
  tdb: TribbleDB,
  id: string,
) => {
  return readParsedThing(
    parseAlbum,
    tdb,
    id,
  );
};

export const readParsedAlbums = (
  tdb: TribbleDB,
  urns: Set<string>,
) => {
  return readParsedThings(parseAlbum, tdb, urns);
};
