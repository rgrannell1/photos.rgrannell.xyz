/* Support albums operations. */

/* Support albums operations. */
import { asUrn } from "@rgrannell1/tribbledb";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Album } from "../../../types/domain.ts";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import type { NodeSelection } from "./albums.ts";

export function selectAlbum(tdb: TribbleDB, id: string): NodeSelection {
  const selector = { id };
  return tdb.nodes(selector);
}

export function selectAlbumUrn(tdb: TribbleDB, urn: string): NodeSelection {
  const selector = { id: asUrn(urn).id };
  return tdb.nodes(selector);
}

export function selectTrip(tdb: TribbleDB, tripUrn: string): NodeSelection {
  const { type, id } = asUrn(tripUrn);
  const selector = { type, id };
  return tdb.nodes(selector);
}

export function compareNewestAlbum(albumA: Album, albumB: Album): number {
  return albumB.minDate - albumA.minDate;
}

export function compareOldestAlbum(albumA: Album, albumB: Album): number {
  return albumA.minDate - albumB.minDate;
}

export function readAlbumUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.ALBUM } };
  return tdb.search(query).sources();
}

export function readReferencedMediaIds(
  albums: NodeSelection,
  relation: string,
  type: string,
): Set<string> {
  const filter = { where: { type } };
  const media = albums.referencedBy(relation, filter);
  return media.urns();
}

export function selectThing(tdb: TribbleDB, thingUrn: string): NodeSelection {
  const { type, id } = asUrn(thingUrn);
  const selector = { type, id };
  return tdb.nodes(selector);
}

// Select by type and id so query-string variant URNs match too.
export function selectThings(
  tdb: TribbleDB,
  thingUrns: Set<string>,
): NodeSelection {
  let things = tdb.nodes([]);
  for (const thingUrn of thingUrns) {
    const thing = selectThing(tdb, thingUrn);
    things = things.union(thing);
  }
  return things;
}

export function readReferencedAlbumIds(things: NodeSelection): Set<string> {
  const references = things.referencedBy().widen();
  const albumIds = references.follow(KnownRelations.ALBUM_ID).ids();
  return albumIds;
}
