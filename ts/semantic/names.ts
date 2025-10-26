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
export function namesToUrns(tdb: TribbleDB, names: Set<string>): Set<string> {
  const urns: Set<string> = new Set();

  const namesCursor = tdb.search({
    relation: KnownRelations.NAME,
  });

  for (const [urn, _, name] of namesCursor.triples()) {
    if (names.has(name as string)) {
      urns.add(urn as string);
    }
  }

  return urns;
}
