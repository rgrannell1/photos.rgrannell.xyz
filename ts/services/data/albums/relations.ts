/* Support albums operations. */

/* Support albums operations. */
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { KnownTypes } from "../../../constants/data.ts";
import { selectAlbum } from "./selection.ts";

/** Reads the first album object that matches an album ID. */
export function readAlbumObject(tdb: TribbleDB, id: string) {
  const albums = selectAlbum(tdb, id).filter({ type: KnownTypes.ALBUM });
  const objects = albums.objects();
  return objects[0];
}

/** Reads the first year object that matches a numeric year. */
export function readYearObject(tdb: TribbleDB, year: number) {
  const selector = { type: KnownTypes.YEAR, id: String(year) };
  const objects = tdb.nodes(selector).objects();
  return objects[0];
}
