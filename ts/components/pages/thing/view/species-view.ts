/* Support thing operations. */

import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../../../../commons/collections/arrays.ts";
import type { Photo as PhotoType } from "../../../../types/domain.ts";
import { PhotoAlbum, type PhotoAlbumAttrs } from "../../../album/photo-album.ts";
import { ThingCaption } from "../../../thing/thing-caption.ts";
import {
  selectLoadingMode,
  thumbHashDataUrl,
} from "../../../../services/rendering/year-scroll/photos.ts";
import { ShareButton } from "../../../share-button.ts";
import { sharePhotoUrl } from "../../../../services/browser/window.ts";
import { type Maybe, NONE, withDefault } from "../../../../commons/collections/maybe.ts";
import type { CachedReader, ThingPageAttrs } from "./thing.ts";
import { cachedByUrn } from "../data/cache.ts";
import { drawMediaSection } from "./media.ts";
import { drawMemberCard, readMemberSpecies } from "../data/species-data.ts";
import { readShareName } from "./share.ts";

/** Combines image, identity, and interaction attributes for a member album. */
export function buildMemberAlbumAttrs(
  imageAttrs: Pick<
    PhotoAlbumAttrs,
    "imageUrl" | "thumbnailUrl" | "thumbnailDataUrl" | "loading"
  >,
  identityAttrs: Pick<PhotoAlbumAttrs, "trip" | "label"> & m.Attributes,
  interactionAttrs: Pick<PhotoAlbumAttrs, "child" | "href">,
): PhotoAlbumAttrs & m.Attributes {
  return { ...imageAttrs, ...identityAttrs, ...interactionAttrs };
}

/** Builds stable identity attributes for a taxon member card. */
export function buildMemberIdentityAttrs(
  member: TripleObject,
  id: string,
  thingId: string,
): Pick<PhotoAlbumAttrs, "trip" | "label"> & m.Attributes {
  return {
    key: `member-${id}`,
    label: withDefault(selectFirst(member.name), thingId),
    trip: NONE,
  };
}

/** Builds the caption and thing-page navigation for a taxon member. */
export function buildMemberInteractionAttrs(
  member: TripleObject,
  thingId: string,
  type: string,
): Pick<PhotoAlbumAttrs, "child" | "href"> {
  const $child = m(ThingCaption, { thing: member });
  const href = `/thing/${type}:${thingId}`;
  return { child: $child, href };
}

/** Builds cover image attributes with the indexed loading policy. */
export function buildMemberImageAttrs(
  cover: PhotoType,
  idx: number,
): Pick<
  PhotoAlbumAttrs,
  "imageUrl" | "thumbnailUrl" | "thumbnailDataUrl" | "loading"
> {
  const loading = selectLoadingMode(idx);
  const thumbnailDataUrl: Maybe<string> = thumbHashDataUrl(cover.mosaicColours);
  const attrs: Pick<
    PhotoAlbumAttrs,
    "imageUrl" | "thumbnailUrl" | "thumbnailDataUrl" | "loading"
  > = {
    imageUrl: cover.fullImage,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl,
    loading,
  };
  return attrs;
}

/** Renders a taxon member that has a cover photo. */
export function drawCoveredMember(
  member: TripleObject,
  cover: PhotoType,
  id: string,
  thingId: string,
  type: string,
  idx: number,
): m.Children {
  const imageAttrs = buildMemberImageAttrs(cover, idx);
  const identityAttrs = buildMemberIdentityAttrs(member, id, thingId);
  const interactionAttrs = buildMemberInteractionAttrs(member, thingId, type);
  const attrs = buildMemberAlbumAttrs(
    imageAttrs,
    identityAttrs,
    interactionAttrs,
  );
  return m(PhotoAlbum, attrs);
}

/** Renders taxon members as a species album section. */
export function drawMemberCards(
  members: TripleObject[],
  readThingCover: (urn: string) => Maybe<PhotoType>,
): m.Children {
  const drawCard = drawMemberCard.bind(null, readThingCover);
  const $cards = members.flatMap(drawCard);
  const $section = drawMediaSection(
    "Species",
    "section.album-container",
    $cards,
  );
  return $section;
}

/** Omits the species section when the thing has no taxon members. */
export function viewSpeciesSection(
  membersFor: CachedReader<TripleObject[]>,
  vnode: m.Vnode<ThingPageAttrs>,
): m.Children {
  const members = membersFor(vnode.attrs);

  if (members.length === 0) {
    return null;
  }
  const $section = drawMemberCards(members, vnode.attrs.readThingCover);
  return $section;
}

/** Creates a species section with a URN-keyed member cache. */
export function SpeciesSection() {
  const membersFor = cachedByUrn(readMemberSpecies);

  return { view: viewSpeciesSection.bind(null, membersFor) };
}

/** Renders a share control for a concrete thing identifier. */
export function drawKnownShareButton(
  type: string,
  id: string,
  things: TripleObject[],
): m.Children {
  const name = readShareName(things, id);
  const url = sharePhotoUrl(`thing/${type}:${id}`);
  const attrs = { url, name };
  return m(ShareButton, attrs);
}

/** Wildcard listings have no prebaked social card, so they get no share link. */
export function drawShareButton(
  urn: string,
  things: TripleObject[],
): m.Children {
  const { type, id } = asUrn(urn);

  if (id === "*") {
    return null;
  }
  const $button = drawKnownShareButton(type, id, things);
  return $button;
}
