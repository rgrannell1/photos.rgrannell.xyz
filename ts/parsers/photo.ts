import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Photo } from "../types.ts";
import { PhotoSchema } from "./schemas.ts";
import { parseObject } from "./parser.ts";

/*
 * Parse photo from a triple object
 *
 * @param tdb - The TribbleDB instance
 * @param photo - The triple object representing the photo
 * @returns The parsed Photo or undefined if parsing fails
 */
export function parsePhoto(
  _: TribbleDB,
  photo: TripleObject,
): Photo | undefined {
  return parseObject(PhotoSchema, "photo", photo);
}
