import { asUrn, TribbleDB, TripleObject } from "@rgrannell1/tribbledb";

export function readThing(
  tdb: TribbleDB,
  id: string,
): TripleObject | undefined {
  const parsed = asUrn(id);

  return tdb.search({
    source: { id: parsed.id, type: parsed.type },
  }).firstObject();
}
