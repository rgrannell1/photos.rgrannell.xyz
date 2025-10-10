import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { KnownRelations } from "../constants";

export function nameToUrn(tdb: TribbleDB, name: string): string | undefined {
  return tdb.search({
    relation: KnownRelations.NAME,
    target: name,
  }).firstSource();
}

export function countryNameToUrn(
  tdb: TribbleDB,
  name: string,
): string | undefined {
  return tdb.search({
    source: { type: "country" },
    relation: KnownRelations.NAME,
    target: name,
  }).firstSource();
}

export function urnToFlag(tdb: TribbleDB, urn: string): string | undefined {
  return tdb.search({
    source: asUrn(urn),
    relation: KnownRelations.FLAG,
  }).firstTarget();
}
