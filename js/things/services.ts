import { Album, Video } from "../types.ts";
import { KnownRelations } from "../constants.js";
import { asUrn } from "../library/tribble.js";
import { html } from "lit-element";

function getName(tdb, urn: string): string | undefined {
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

function getGeocoordinates(tdb, urn: string): Geoocordinates | undeifned {
  const { id, type } = asUrn(urn);

  const facts = tdb.search({
    source: { id, type },
    relation: {
      relation: [KnownRelations.LONGITUDE, KnownRelations.LATITUDE],
    },
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
    count: album.photos_count,
    flags: album.flags,
  };
}

function parseVideo(video: any): Video {
  return {
    ...video
  }
}

export class ThingsService {
  static getName(tdb, urn: string): string | undefined {
    return getName(tdb, urn);
  }
  static getDistinctNames(tdb, type: string) {
    const results = tdb.search({
      source: { type },
      relation: "name",
    }).objects() as { id: string; name: string }[];

    return results.sort((res0, res1) => {
      return res0.name.localeCompare(res1.name);
    });
  }

  static getGeocoordinates(tdb, urn: string) {
    return getGeocoordinates(tdb, urn);
  }
  static videoObjects(tdb): Video[] {
    return tdb.search({
      source: { type: "video" },
    }).objects().map(parseVideo);
  }
  static photoObjects(tdb) {
    return tdb.search({
      source: { type: "photo" },
    }).objects();
  }
  static albumObjects(tdb): Album[] {
    return tdb.search({
      source: { type: "album" },
    }).objects().map(parseAlbum)
      .sort((album0: Album, album1: Album) => {
        return album1.minDate - album0.minDate;
      });
  }
}

export class GoogleMapsService {
  static getURL(tdb, urn: string): string | undefined {
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
