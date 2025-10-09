import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { Album } from "../types.ts";
import { z } from "zod";
import { asInt } from "../numbers.ts";

const AlbumSchema = z.object({
  name: z.string(),
  minDate: z.union([z.string(), z.number()]),
  maxDate: z.union([z.string(), z.number()]),
  thumbnailUrl: z.string(),
  mosaic: z.any(),
  id: z.string(),
  photosCount: z.union([z.string(), z.number()]),
  flags: z.any(),
});

/*
 * Read album-data
 *
 */
function parseAlbum(album: TripleObject): Album {
  const result = AlbumSchema.safeParse(album);
  if (!result.success) {
    throw new Error(
      `Invalid album object: ${JSON.stringify(result.error.issues)}`,
    );
  }

  return {
    name: result.data.name,
    minDate: asInt(result.data.minDate),
    maxDate: asInt(result.data.maxDate),
    thumbnailUrl: result.data.thumbnailUrl,
    mosaicColours: result.data.mosaic,
    id: result.data.id,
    photosCount: asInt(result.data.photosCount),
    flags: result.data.flags,
  };
}

/*
 * Read albums from the TribbleDB
 *
 */
export function readAlbums(tdb: TribbleDB): Album[] {
  return tdb.search({
    source: { type: "album" },
  }).objects().map(parseAlbum)
    .sort((album0: Album, album1: Album) => {
      return album1.minDate - album0.minDate;
    });
}
