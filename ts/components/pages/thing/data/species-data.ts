/* Support thing operations. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../../../commons/collections/arrays.ts";
import type { Photo as PhotoType } from "../../../../types/domain.ts";
import { PhotoGrid } from "../../../media/images/photo-grid.ts";
import { TAXON_TYPES } from "../../../../constants/data.ts";
import { isNone, type Maybe, NONE } from "../../../../commons/collections/maybe.ts";
import type { CachedReader, ThingPageAttrs } from "../view/thing.ts";
import { cachedByUrn, readThingPhotos } from "./cache.ts";
import { slicePhotos } from "../view/media.ts";
import { drawCoveredMember } from "../view/species-view.ts";

export function drawPhotoGrid(photos: PhotoType[], urn: string): m.Children {
  const attrs = {
    total: photos.length,
    getPhotos: slicePhotos.bind(null, photos),
    resetKey: urn,
  };
  const grid = m(PhotoGrid, attrs);
  const heading = m("h3", "Photos");
  return m("div", [heading, grid]);
}

export function viewPhotoSection(
  photosFor: CachedReader<PhotoType[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const photos = photosFor(vnode.attrs);

  if (photos.length === 0) {
    return null;
  }
  const grid = drawPhotoGrid(photos, vnode.attrs.urn);
  return grid;
}

export function PhotoSection() {
  const photosFor = cachedByUrn(readThingPhotos);

  return { view: viewPhotoSection.bind(null, photosFor) };
}

export function isTaxonUrn(urn: string): boolean {
  return TAXON_TYPES.has(asUrn(urn).type);
}

export function hasTaxonUrn(urn: Maybe<string>): urn is string {
  if (isNone(urn)) {
    return false;
  }
  return isTaxonUrn(urn);
}

export function readThingUrn(thing: TripleObject | undefined): Maybe<string> {
  const urn = thing ? one(thing.id) : NONE;
  return urn;
}

/* Member species of the page's taxon. Empty for non-taxon things. */
export function readMemberSpecies(
  attrs: ThingPageAttrs,
): TripleObject[] {
  const [thing] = attrs.things;
  const urn = readThingUrn(thing);
  if (!hasTaxonUrn(urn)) {
    return [];
  }

  return attrs.readTaxonMembers(urn);
}

export function drawMemberCardFromUrn(
  member: TripleObject,
  cover: PhotoType,
  id: string,
  idx: number,
): m.Children {
  const { type, id: thingId } = asUrn(id);
  return drawCoveredMember(member, cover, id, thingId, type, idx);
}

export function drawMemberCardWithId(
  readThingCover: (urn: string) => Maybe<PhotoType>,
  member: TripleObject,
  id: string,
  idx: number,
): m.Children[] {
  const cover = readThingCover(id);
  if (isNone(cover)) {
    return [];
  }
  const card = drawMemberCardFromUrn(member, cover, id, idx);
  return [card];
}

export function drawMemberCard(
  readThingCover: (urn: string) => Maybe<PhotoType>,
  member: TripleObject,
  idx: number,
): m.Children[] {
  const id = one(member.id);
  if (isNone(id)) {
    return [];
  }
  const card = drawMemberCardWithId(readThingCover, member, id, idx);
  return card;
}
