import { asInt } from "../commons/numbers.ts";
import { namesToUrns } from "../semantic/names.ts";
import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Album } from "../types.ts";
import { arrayify } from "../commons/arrays.ts";
import { readCountries } from "../services/location.ts";
import { AlbumSchema } from "./schemas.ts";
import { safeParse } from "valibot";

/*
 * Read album-data
 *
 * @param tdb The TribbleDB instance to read from.
 * @param album The raw album object from the TribbleDB.
 * @returns The parsed album.
 */
export function parseAlbum(tdb: TribbleDB, album: TripleObject): Album {
  const result = safeParse(AlbumSchema, album);
  if (!result.success) {
    // todo: better error handling
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.issues)}`,
    );
  }

  const data = result.output;
  const countryNames = new Set(arrayify(data.flags));
  const countries = readCountries(tdb, namesToUrns(tdb, countryNames));

  return {
    name: data.name,
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
