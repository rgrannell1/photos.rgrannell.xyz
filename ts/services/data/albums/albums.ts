import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Album } from "../../../types/domain.ts";
import type { Photo, Video } from "../../../types/domain.ts";
import { readPhotos } from "../readers.ts";
import { DATA_TRUE, KnownRelations, KnownTypes } from "../../../constants/data.ts";
import { readAlbums, readVideos } from "../readers.ts";
import { albumUrn } from "../../../commons/urn.ts";
import { one } from "../../../commons/collections/arrays.ts";
import { fromNullable, type Maybe } from "../../../commons/collections/maybe.ts";
import {
  compareNewestAlbum,
  compareOldestAlbum,
  readAlbumUrns,
  readReferencedAlbumIds,
  readReferencedMediaIds,
  selectAlbumUrn,
  selectThings,
  selectTrip,
} from "./selection.ts";
import { readAlbumObject, readYearObject } from "./relations.ts";

export type NodeSelection = ReturnType<TribbleDB["nodes"]>;

export function isAlbumHidden(tdb: TribbleDB, id: string): boolean {
  const album = readAlbumObject(tdb, id);
  const hidden = one(album?.hidden);

  return hidden === DATA_TRUE;
}

/* Published by mirror as urn:ró:year:<YYYY>  recap  <markdown>. */
export function readYearRecap(tdb: TribbleDB, year: number): Maybe<string> {
  const yearNode = readYearObject(tdb, year);
  const recap = one(yearNode?.[KnownRelations.RECAP]);

  return fromNullable(recap);
}

export function readAllAlbums(tdb: TribbleDB): Album[] {
  const ids = readAlbumUrns(tdb);
  const albums = readAlbums(tdb, ids);

  return albums.sort(compareNewestAlbum);
}

export function readAlbumPhotoIds(tdb: TribbleDB, id: string): Set<string> {
  const album = selectAlbumUrn(tdb, id);
  return readReferencedMediaIds(
    album,
    KnownRelations.ALBUM_ID,
    KnownTypes.PHOTO,
  );
}

export function readAlbumPhotosByAlbumId(tdb: TribbleDB, id: string): Photo[] {
  return readPhotos(tdb, readAlbumPhotoIds(tdb, id));
}

export function readAlbumVideoIds(tdb: TribbleDB, id: string): Set<string> {
  const album = selectAlbumUrn(tdb, id);
  return readReferencedMediaIds(
    album,
    KnownRelations.ALBUM_ID,
    KnownTypes.VIDEO,
  );
}

export function readAlbumVideosByAlbumId(tdb: TribbleDB, id: string): Video[] {
  return readVideos(tdb, readAlbumVideoIds(tdb, id));
}

/* Shows earlier albums (previous hops) in the same trip. */
export function readTripAlbums(tdb: TribbleDB, tripUrn: string): Album[] {
  const trip = selectTrip(tdb, tripUrn);
  const ids = readReferencedMediaIds(
    trip,
    KnownRelations.TRIP,
    KnownTypes.ALBUM,
  );
  const albums = readAlbums(tdb, ids);

  return albums.sort(compareOldestAlbum);
}

/* Published by mirror. */
export function readTripName(tdb: TribbleDB, tripUrn: string): Maybe<string> {
  const trip = selectTrip(tdb, tripUrn).objects()[0];
  const title = one(trip?.[KnownRelations.TITLE]);

  return fromNullable(title);
}

export function readAlbumsByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
) {
  const things = selectThings(tdb, thingsUrns);
  const albumIds = readReferencedAlbumIds(things);
  const albumUrns = new Set([...albumIds].map(albumUrn));
  return readAlbums(tdb, albumUrns);
}
