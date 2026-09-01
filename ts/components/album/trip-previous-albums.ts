import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Album } from "../../types/domain.ts";
import { routeLinkAttrs } from "../../services/browser/routes.ts";

export type TripPreviousAlbumsAttrs = {
  albums: Album[];
};

/** Draws a route link to an earlier album in the trip. */
function drawPreviousAlbumLink(album: Album): m.Children {
  const albumId = asUrn(album.id).id;
  const linkAttrs = routeLinkAttrs(`/album/${albumId}`);
  return m(m.route.Link, linkAttrs, album.name);
}

/** Appends an earlier album link with its required separator. */
function appendPreviousAlbum(
  parts: m.Children[],
  album: Album,
  albumIdx: number,
): void {
  const separator = albumIdx > 0 ? ", " : null;
  const $link = drawPreviousAlbumLink(album);
  parts.push(separator, $link);
}

/** Builds the prose and links for the earlier trip stops. */
function drawPreviousAlbumParts(albums: Album[]): m.Children[] {
  const introduction = "...after travelling from ";
  const parts: m.Children[] = [introduction];
  for (const [albumIdx, album] of albums.entries()) {
    appendPreviousAlbum(parts, album, albumIdx);
  }
  return parts;
}

/** Draws the earlier trip stops, or nothing when none exist. */
function viewTripPreviousAlbums(
  vnode: m.Vnode<TripPreviousAlbumsAttrs>,
): m.Children {
  const { albums } = vnode.attrs;

  if (albums.length === 0) {
    return null;
  }

  const $parts = drawPreviousAlbumParts(albums);
  return m("p.photo-album-trip-previous", $parts);
}

/** Shown on album pages when the album is part of a trip and has earlier stops. */
export function TripPreviousAlbums() {
  return { view: viewTripPreviousAlbums };
}
