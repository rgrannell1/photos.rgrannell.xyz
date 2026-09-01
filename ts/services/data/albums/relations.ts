/* Support albums operations. */

/* Support albums operations. */
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { KnownTypes } from "../../../constants/data.ts";
import { selectAlbum } from "./selection.ts";

/** Reads the first album object that matches an album ID. */
export function readAlbumObject(tdb: TribbleDB, id: string): TripleObject {
  const albums = selectAlbum(tdb, id).filter({ type: KnownTypes.ALBUM });
  const objects = albums.objects();
  return objects[0];
}

/** Reads the first year object that matches a numeric year. */
export function readYearObject(tdb: TribbleDB, year: number): TripleObject {
  const selector = { type: KnownTypes.YEAR, id: String(year) };
  const objects = tdb.nodes(selector).objects();
  return objects[0];
}
