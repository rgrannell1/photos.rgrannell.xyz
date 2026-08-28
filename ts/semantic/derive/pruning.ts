/* Remove browseable entities which have no linked media. */

import { asUrn, type Triple } from "@rgrannell1/tribbledb";
import type { TribbleDB } from "@rgrannell1/tribbledb/v2";
import { one } from "../../commons/arrays.ts";
import { DATA_TRUE, KnownTypes } from "../../constants/data.ts";
import { baseUrn } from "./urns.ts";

function collectMediaReferencedUrns(tdb: TribbleDB): Set<string> {
  const referenced = new Set<string>();

  for (const mediaType of [KnownTypes.PHOTO, KnownTypes.VIDEO]) {
    const triples = tdb.search({ source: { type: mediaType } }).triples();
    for (const [, , target] of triples) {
      referenced.add(baseUrn(target));
    }
  }

  return referenced;
}

export function browseableEntityTypes(tdb: TribbleDB): Set<string> {
  const types = new Set<string>();
  const listings = tdb.search({ source: { type: KnownTypes.LISTING } })
    .objects();

  for (const listing of listings) {
    if (one(listing.browseable) !== DATA_TRUE) {
      continue;
    }

    const listingUrn = one(listing.id);
    if (typeof listingUrn === "string") {
      types.add(asUrn(listingUrn).id);
    }
  }

  return types;
}

function collectMedialessThings(tdb: TribbleDB): Set<string> {
  const referenced = collectMediaReferencedUrns(tdb);
  const medialess = new Set<string>();

  for (const type of browseableEntityTypes(tdb)) {
    const entityUrns = tdb.search({ source: { type } }).sources();
    for (const urn of entityUrns) {
      if (!referenced.has(baseUrn(urn))) {
        medialess.add(baseUrn(urn));
      }
    }
  }

  return medialess;
}

export function pruneMedialessThings(tdb: TribbleDB): void {
  const medialess = collectMedialessThings(tdb);
  if (medialess.size === 0) {
    return;
  }

  const staleTriples: Triple[] = [];
  for (const triple of tdb.triples()) {
    const [src, , tgt] = triple;
    const sourceIsMedialess = medialess.has(baseUrn(src));
    const targetIsMedialess = medialess.has(baseUrn(tgt));
    if (sourceIsMedialess || targetIsMedialess) {
      staleTriples.push(triple);
    }
  }

  tdb.delete(staleTriples);
}
