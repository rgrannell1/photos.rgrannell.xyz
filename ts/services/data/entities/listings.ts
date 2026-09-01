/* Support things operations. */

/* Support things operations. */
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { capitalise, pluralise } from "../../../commons/strings.ts";
import { KnownTypes } from "../../../constants/data.ts";
import type { Maybe } from "../../../commons/collections/maybe.ts";
import { readThing } from "./things.ts";

/** Builds the default capitalised plural label for a listing type. */
export function defaultListingLabel(type: string): string {
  const plural = pluralise(type);
  return capitalise(plural);
}

/** Reads the listing entity published for a type. */
export function readListingThing(
  tdb: TribbleDB,
  type: string,
): Maybe<TripleObject> {
  const listingUrn = `urn:ró:${KnownTypes.LISTING}:${type}`;
  return readThing(tdb, listingUrn);
}
