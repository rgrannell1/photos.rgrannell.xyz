/* Support albums operations. */

/* Support albums operations. */
import { asUrn } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Album } from "../../../types/domain.ts";
import { KnownRelations, KnownTypes } from "../../../constants/data.ts";
import type { NodeSelection } from "./albums.ts";

/** Select an album node by its identifier. */
export function selectAlbum(tdb: TribbleDB, id: string): NodeSelection {
  const selector = { id };
  return tdb.nodes(selector);
}

/** Select an album node by the identifier parsed from its URN. */
export function selectAlbumUrn(tdb: TribbleDB, urn: string): NodeSelection {
  const selector = { id: asUrn(urn).id };
  return tdb.nodes(selector);
}

/** Select a trip node by the type and identifier in its URN. */
export function selectTrip(tdb: TribbleDB, tripUrn: string): NodeSelection {
  const { type, id } = asUrn(tripUrn);
  const selector = { type, id };
  return tdb.nodes(selector);
}

/** Order albums from newest to oldest minimum date. */
export function compareNewestAlbum(albumA: Album, albumB: Album): number {
  return albumB.minDate - albumA.minDate;
}

/** Order albums from oldest to newest minimum date. */
export function compareOldestAlbum(albumA: Album, albumB: Album): number {
  return albumA.minDate - albumB.minDate;
}

/** Read the URNs of all album source nodes. */
export function readAlbumUrns(tdb: TribbleDB): Set<string> {
  const query = { source: { type: KnownTypes.ALBUM } };
  return tdb.search(query).sources();
}

/** Read media IDs that reference the selected albums through one relation. */
export function readReferencedMediaIds(
  albums: NodeSelection,
  relation: string,
  type: string,
): Set<string> {
  const filter = { where: { type } };
  const media = albums.referencedBy(relation, filter);
  return media.urns();
}

/** Select a thing node by the type and identifier in its URN. */
export function selectThing(tdb: TribbleDB, thingUrn: string): NodeSelection {
  const { type, id } = asUrn(thingUrn);
  const selector = { type, id };
  return tdb.nodes(selector);
}

// Select by type and id so query-string variant URNs match too.
/** Combine selections for thing URNs while ignoring URN query variants. */
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

/** Read album IDs reached from references to the selected things. */
export function readReferencedAlbumIds(things: NodeSelection): Set<string> {
  const references = things.referencedBy().widen();
  const albumIds = references.follow(KnownRelations.ALBUM_ID).ids();
  return albumIds;
}
