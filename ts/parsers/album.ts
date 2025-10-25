import { z } from "zod";
import { asInt } from "../numbers.ts";
import { namesToUrns } from "../semantic/names.ts";
import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Album } from "../types";
import { arrayify } from "../arrays";
import { readParsedCountries } from "../services/location";

const AlbumSchema = z.object({
  name: z.string(),
  minDate: z.string(),
  maxDate: z.string(),
  thumbnailUrl: z.string(),
  mosaic: z.any(),
  id: z.string(),
  photosCount: z.string(),
  videosCount: z.string(),
  flags: z.any(),
  description: z.string().optional(),
});

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

  const countryNames = arrayify(result.data.flags);
  const countryUrns = namesToUrns(tdb, countryNames);
  const countries = readParsedCountries(tdb, countryUrns);

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
