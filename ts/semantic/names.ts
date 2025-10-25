import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { KnownRelations } from "../constants";

/* */
export function nameToUrn(tdb: TribbleDB, name: string): string | undefined {
  return tdb.search({
    relation: KnownRelations.NAME,
    target: name,
  }).firstSource();
}

/*
 * Convert names to tribble URNs
 */
export function namesToUrns(tdb: TribbleDB, names: string[]): Set<string> {
  const urns: Set<string> = new Set();

  const namesCursor = tdb.search({
    relation: KnownRelations.NAME,
  });

  for (const name of names) {
    const urn = nameToUrn(namesCursor, name);
    if (urn) {
      urns.add(urn);
    }
  }

  return urns;
}
