import { TribbleDB, TripleObject } from "@rgrannell1/tribbledb";
import { z } from "zod";
import { Photo } from "../types";
import { PhotoSchema } from "./schemas";
import { parseObject } from "./parser";

/*
 * Parse photo from a triple object
 *
 * @param tdb - The TribbleDB instance
 * @param photo - The triple object representing the photo
 * @returns The parsed Photo or undefined if parsing fails
 */
export function parsePhoto(
  tdb: TribbleDB,
  photo: TripleObject,
): Photo | undefined {
  return parseObject(PhotoSchema, "photo", photo);
}
