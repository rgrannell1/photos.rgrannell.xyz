import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import type { Album } from "../types.ts";
import type { Photo, Video } from "../types.ts";
import { readThingsByPhotoIds } from "./photos.ts";
import { readPhotos } from "./readers.ts";
import { KnownRelations, KnownTypes } from "../constants.ts";
import { readAlbums, readVideos } from "./readers.ts";

/*
 * Get the album date
 */
export function albumYear(album: Album): number {
  return new Date(album.minDate).getFullYear();
}

/*
 * Read albums from the TribbleDB
 */
export function readAllAlbums(tdb: TribbleDB): Album[] {
  const ids = tdb.search({
    source: { type: KnownTypes.ALBUM },
  }).sources();

  return (readAlbums(tdb, ids) as Album[])
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
    source: { type: KnownTypes.PHOTO },
    relation: KnownRelations.ALBUM_ID,
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
  return readPhotos(tdb, readAlbumPhotoIds(tdb, id));
}

/*
 * Read videos associated with an album
 *
 * @param tdb TribbleDB instance
 * @param id Album URN
 */
export function readAlbumVideoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: KnownTypes.VIDEO },
    relation: KnownRelations.ALBUM_ID,
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
  return readVideos(tdb, readAlbumVideoIds(tdb, id));
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

/*
 * Read all albums in a trip, sorted by minDate ascending (chronological order).
 * Use this to show "previous hops" on an album page (albums in the same trip
 * with an earlier minDate).
 */
export function getTripAlbums(tdb: TribbleDB, tripUrn: string): Album[] {
  const { type, id } = asUrn(tripUrn);
  const ids = tdb.search({
    source: { type: KnownTypes.ALBUM },
    relation: KnownRelations.TRIP,
    target: { type, id },
  }).sources();

  return (readAlbums(tdb, ids) as Album[]).sort(
    (a: Album, b: Album) => a.minDate - b.minDate,
  );
}

/*
 * Read albums associated with a set of thing IDs
 */
export function readAlbumsByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
) {
  const photoIds = new Set<string>();

  // first, collect photo-ids associated with the things
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);

    const results = tdb.search({ target: { type, id } }).sources();

    for (const result of results) {
      photoIds.add(result);
    }
  }

  const albumIds = new Set<string>();

  // next, collect album-ids associated with the photos
  for (const photoId of photoIds) {
    const pid = asUrn(photoId);

    const albums = tdb.search({
      source: { type: pid.type, id: pid.id },
      relation: KnownRelations.ALBUM_ID,
    }).targets();

    for (const id of albums) {
      albumIds.add(`urn:ró:album:${id}`);
    }
  }

  return readAlbums(tdb, albumIds);
}
