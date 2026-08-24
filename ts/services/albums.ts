import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Album } from "../types.ts";
import type { Photo, Video } from "../types.ts";
import { readPhotos } from "./readers.ts";
import { KnownRelations, KnownTypes } from "../constants/data.ts";
import { readAlbums, readPlace, readTransfers, readVideos } from "./readers.ts";
import { albumUrn } from "../commons/urn.ts";
import { hasValidCoordinates } from "./places.ts";
import { one } from "../commons/arrays.ts";

export function albumYear(album: Album): number {
  return new Date(album.minDate).getFullYear();
}

export function isAlbumHidden(tdb: TribbleDB, id: string): boolean {
  const album = tdb.nodes({ id })
    .filter({ type: KnownTypes.ALBUM })
    .objects()[0];

  return one(album?.hidden) === "true";
}

/* Published by mirror as urn:ró:year:<YYYY>  recap  <markdown>. */
export function readYearRecap(tdb: TribbleDB, year: number): string | undefined {
  const yearNode = tdb.nodes({
    type: KnownTypes.YEAR,
    id: String(year),
  }).objects()[0];

  return one(yearNode?.[KnownRelations.RECAP]);
}

export function readAllAlbums(tdb: TribbleDB): Album[] {
  const ids = tdb.search({
    source: { type: KnownTypes.ALBUM },
  }).sources();

  return readAlbums(tdb, ids)
    .sort((album0: Album, album1: Album) => {
      return album1.minDate - album0.minDate;
    });
}

export function readAlbumPhotoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.nodes({ id: asUrn(id).id })
    .referencedBy(KnownRelations.ALBUM_ID, { where: { type: KnownTypes.PHOTO } })
    .urns();
}

export function readAlbumPhotosByAlbumId(tdb: TribbleDB, id: string): Photo[] {
  return readPhotos(tdb, readAlbumPhotoIds(tdb, id));
}

export function readAlbumVideoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.nodes({ id: asUrn(id).id })
    .referencedBy(KnownRelations.ALBUM_ID, { where: { type: KnownTypes.VIDEO } })
    .urns();
}

export function readAlbumVideosByAlbumId(tdb: TribbleDB, id: string): Video[] {
  return readVideos(tdb, readAlbumVideoIds(tdb, id));
}

/* Shows earlier albums (previous hops) in the same trip. */
export function readTripAlbums(tdb: TribbleDB, tripUrn: string): Album[] {
  const { type, id } = asUrn(tripUrn);
  const ids = tdb.nodes({ type, id })
    .referencedBy(KnownRelations.TRIP, { where: { type: KnownTypes.ALBUM } })
    .urns();

  return readAlbums(tdb, ids).sort(
    (albumA: Album, albumB: Album) => albumA.minDate - albumB.minDate,
  );
}

/* Published by mirror. */
export function readTripName(tdb: TribbleDB, tripUrn: string): string | undefined {
  const { type, id } = asUrn(tripUrn);
  const trip = tdb.nodes({ type, id }).objects()[0];

  return one(trip?.[KnownRelations.TITLE]);
}

export function readAlbumsByThingIds(
  tdb: TribbleDB,
  thingsUrns: Set<string>,
) {
  // select the things by type and id, so qs-variant URNs match too
  let things = tdb.nodes([]);
  for (const thingUrn of thingsUrns) {
    const { type, id } = asUrn(thingUrn);
    things = things.union(tdb.nodes({ type, id }));
  }

  const albumIds = things
    .referencedBy()
    .widen()
    .follow(KnownRelations.ALBUM_ID)
    .ids();

  const albumUrns = new Set([...albumIds].map(albumUrn));
  return readAlbums(tdb, albumUrns);
}

export type TripPolyline = {
  tripUrn: string;
  latLngs: [number, number][];
  mode?: string;
};

/* Returns one polyline per transfer for map drawing, skipping null island. */
export function readTransferPolylines(tdb: TribbleDB): TripPolyline[] {
  const transferUrns = new Set(
    tdb.search({ source: { type: KnownTypes.TRANSFER } }).sources(),
  );
  const transfers = readTransfers(tdb, transferUrns);
  const result: TripPolyline[] = [];

  for (const transfer of transfers) {
    const sourcePlace = readPlace(tdb, transfer.source);
    const destPlace = readPlace(tdb, transfer.destination);
    if (!sourcePlace || !destPlace) {
      continue;
    }
    if (!hasValidCoordinates(sourcePlace) || !hasValidCoordinates(destPlace)) {
      continue;
    }
    result.push({
      tripUrn: transfer.id,
      latLngs: [
        [sourcePlace.latitude, sourcePlace.longitude],
        [destPlace.latitude, destPlace.longitude],
      ],
      ...(transfer.mode != null && { mode: transfer.mode }),
    });
  }

  return result;
}
