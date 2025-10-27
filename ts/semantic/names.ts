import { TribbleDB } from "@rgrannell1/tribbledb";
import { KnownRelations } from "../constants";

/* */
export function nameToUrn(tdb: TribbleDB, name: string): string | undefined {
  return tdb.search({
    relation: KnownRelations.NAME,
    target: name,
  }).firstSource();
}

const NAME_TO_URN_CACHE: Map<string, string> = new Map();

/*
 * Convert names to tribble URNs
 *
 * @param tdb - The TribbleDB instance
 * @param names - A set of names to convert
 *
 * @returns A set of corresponding URNs
 */
export function namesToUrns(tdb: TribbleDB, names: Set<string>): Set<string> {
  const urns: Set<string> = new Set();
  if (names.size === 0) {
    return urns;
  }

  // lookup cached names first
  for (const name of names) {
    if (NAME_TO_URN_CACHE.has(name)) {
      const cachedUrn = NAME_TO_URN_CACHE.get(name);
      if (cachedUrn) {
        urns.add(cachedUrn);
      }
    }
  }

  // if all names are cached, don't query TDB at all,
  // since this method is slow
  if (urns.size === names.size) {
    return urns;
  }

  const namesCursor = tdb.search({
    relation: KnownRelations.NAME,
    target: Array.from(names),
  });

  for (const [urn, _, name] of namesCursor.triples()) {
    if (names.has(name as string)) {
      urns.add(urn as string);
    }
  }

  return urns;
}
