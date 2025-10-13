import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import type { Photo, Video } from "../types.ts";
import { parseVideo } from "../parsers/video.ts";
import { parsePhoto } from "../parsers/photo.ts";
import { parseSubject } from "../parsers/subject.ts";
import { parseLocation } from "../parsers/location.ts";
import { KnownRelations } from "../constants.ts";
import { parseAlbum } from "../parsers/album.ts";
import { readThing } from "./things.ts";

export function albumYear(album: Album) {
  return new Date(album.minDate).getFullYear();
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

export function readAlbumPhotoIds(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: "photo" },
    relation: "albumId",
    target: { id: asUrn(id).id },
  }).sources();
}

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

  const locations = new Set<string>();
  const subjects = new Set<string>();

  for (const photoId of photoIds) {
    const pid = asUrn(photoId);

    const obj = tdb.search({
      source: { type: pid.type, id: pid.id },
      relation: [KnownRelations.LOCATION, KnownRelations.SUBJECT],
    }).firstObject(true);

    if (!obj) {
      continue;
    }

    const location = obj?.location ?? [];
    const subject = obj?.subject ?? [];

    for (const loc of location) {
      locations.add(loc);
    }
    for (const subj of subject) {
      subjects.add(subj);
    }
  }

  return {
    subjects: Array.from(subjects)
      .flatMap((id) => {
        const obj = readThing(tdb, id);
        return obj ? [obj] : [];
      })
      .map(parseSubject.bind(null, tdb)),
    locations: Array.from(locations)
      .flatMap((id) => {
        const obj = readThing(tdb, id);
        return obj ? [obj] : [];
      })
      .map(parseLocation.bind(null, tdb)),
  };
}
