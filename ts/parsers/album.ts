import { asInt } from "../commons/numbers.ts";
import { namesToUrns } from "../services/names.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { arrayify } from "../commons/arrays.ts";
import { readCountries } from "../services/readers.ts";
import { AlbumSchema } from "./schemas.ts";
import { safeParse } from "valibot";
import { logParseWarning } from "../commons/logger.ts";

/*
 * Read album-data
 *
 * @param tdb The TribbleDB instance to read from.
 * @param album The raw album object from the TribbleDB.
 * @returns The parsed album.
 */
export function parseAlbum(tdb: TribbleDB, album: TripleObject) {
  const result = safeParse(AlbumSchema, album);
  if (!result.success) {
    logParseWarning(result.issues);
    throw new Error(`Failed to parse album with id ${album.id}`);
  }

  const data = result.output;
  const countryNames = new Set(arrayify(data.flags));
  const countries = readCountries(tdb, namesToUrns(tdb, countryNames));

  return {
    type: "album",
    name: data.name,
    trip: data.trip,
    minDate: asInt(data.minDate),
    maxDate: asInt(data.maxDate),
    thumbnailUrl: data.thumbnailUrl,
    mosaicColours: data.mosaic,
    id: data.id,
    photosCount: asInt(data.photosCount),
    videosCount: asInt(data.videosCount),
    description: data.description ?? "",
    countries,
  };
}
