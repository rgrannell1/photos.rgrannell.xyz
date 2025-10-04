import { Album, Geoocordinates, Photo, Video } from "../types.ts";
import { KnownRelations } from "../constants.js";
import { asUrn } from "@rgrannell1/tribbledb";
import { html } from "lit-element";
import { TribbleDB } from "@rgrannell1/tribbledb";

function getName(tdb: TribbleDB, urn: string): string | undefined {
  const { id, type } = asUrn(urn);

  const definedName = tdb.search({
    source: { id, type },
    relation: KnownRelations.NAME,
  }).firstTarget();

  if (typeof definedName === "undefined") {
    return definedName;
  }

  if (typeof definedName !== "string") {
    throw new TypeError(`name is not a string: ${definedName}`);
  }

  return definedName;
}

function getGeocoordinates(
  tdb: TribbleDB,
  urn: string,
): Geoocordinates | undefined {
  const { id, type } = asUrn(urn);

  const facts = tdb.search({
    source: { id, type },
    relation: [KnownRelations.LONGITUDE, KnownRelations.LATITUDE],
  }).firstObject();

  if (!facts) {
    return undefined;
  }

  return {
    longitude: facts.longitude,
    latitude: facts.latitude,
  };
}

function parseAlbum(album: any): Album {
  return {
    name: album.name,
    minDate: parseInt(album.minDate),
    maxDate: parseInt(album.maxDate),
    thumbnailUrl: album.thumbnailUrl,
    mosaicColours: album.mosaic,
    id: album.id,
    photosCount: album.photosCount,
    flags: album.flags,
  };
}

function parseVideo(video: any): Video {
  return {
    ...video,
  };
}

function parsePhoto(photo: any): Photo {
  return {
    ...photo,
  };
}

function getAlbumPhotoSources(tdb: TribbleDB, id: string): Set<string> {
  return tdb.search({
    source: { type: "photo" },
    relation: "albumId",
    target: { id: id },
  }).sources();
}

function getDistinctNames(tdb: TribbleDB, type: string) {
  const results = tdb.search({
    source: { type },
    relation: "name",
  }).objects() as { id: string; name: string }[];

  return results.sort((res0, res1) => {
    return res0.name.localeCompare(res1.name);
  });
}

export class ThingsService {
  static getName(tdb: TribbleDB, urn: string): string | undefined {
    return getName(tdb, urn);
  }
  static getAlbumPhotoSources(tdb: TribbleDB, id: string): Set<string> {
    return getAlbumPhotoSources(tdb, id);
  }
  static getDistinctNames(tdb: TribbleDB, type: string) {
    return getDistinctNames(tdb, type);
  }

  static getGeocoordinates(tdb: TribbleDB, urn: string) {
    return getGeocoordinates(tdb, urn);
  }
  static videoObjects(tdb: TribbleDB): Video[] {
    return tdb.search({
      source: { type: "video" },
    }).objects().map(parseVideo);
  }
  static photoObjects(
    tdb: TribbleDB,
    query: Record<string, any> = {},
  ): Photo[] {
    return tdb.search({
      ...query,
      source: { type: "photo" },
    }).objects().map(parsePhoto).sort((left: Photo, right: Photo) => {
      return right.createdAt - left.createdAt;
    });
  }
  static albumObjects(tdb: TribbleDB): Album[] {
    return tdb.search({
      source: { type: "album" },
    }).objects().map(parseAlbum)
      .sort((album0: Album, album1: Album) => {
        return album1.minDate - album0.minDate;
      });
  }
}

export class GoogleMapsService {
  static getURL(tdb: TribbleDB, urn: string): string | undefined {
    const res = ThingsService.getGeocoordinates(tdb, urn);
    if (!res) {
      return undefined;
    }

    const { longitude, latitude } = res;

    if (longitude && latitude) {
      const googleMapsUrl =
        `https://www.google.com/maps?q=${latitude},${longitude}`;
      return html`
      <a href="${googleMapsUrl}" target="_blank" rel="noopener">[maps]</a>
      `;
    }

    return undefined;
  }
}

export class SearchService {
  static search(tdb: TribbleDB, query: Record<string, string>) {
    // TODO implement search layer

    // name support
  }
}
