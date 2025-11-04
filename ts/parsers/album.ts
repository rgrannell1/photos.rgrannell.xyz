import { asInt } from "../numbers.ts";
import { namesToUrns } from "../semantic/names.ts";
import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import { arrayify } from "../arrays.ts";
import { readParsedCountries } from "../services/location.ts";
import { AlbumSchema } from "./schemas.ts";

const NAME_TO_URN_CACHE: Map<string, string> = new Map();

/*
 * Read album-data
 *
 * @param tdb The TribbleDB instance to read from.
 * @param album The raw album object from the TribbleDB.
 * @returns The parsed album.
 */
export function parseAlbum(tdb: TribbleDB, album: TripleObject): Album {
  const result = AlbumSchema.safeParse(album);
  if (!result.success) {
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.error.issues)}`,
    );
  }

  const countryNames = new Set(arrayify(result.data.flags));
  const countries = readParsedCountries(tdb, namesToUrns(tdb, countryNames));

  return {
    name: result.data.name,
    minDate: asInt(result.data.minDate),
    maxDate: asInt(result.data.maxDate),
    thumbnailUrl: result.data.thumbnailUrl,
    mosaicColours: result.data.mosaic,
    id: result.data.id,
    photosCount: asInt(result.data.photosCount),
    videosCount: asInt(result.data.videosCount),
    description: result.data.description ?? "",
    countries,
  };
}
