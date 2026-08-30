import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Album } from "../../types/domain.ts";

export type TripPreviousAlbumsAttrs = {
  albums: Album[];
};

function drawPreviousAlbumLink(album: Album): m.Children {
  const albumId = asUrn(album.id).id;
  const linkAttrs = { href: `/album/${albumId}` };
  return m(m.route.Link, linkAttrs, album.name);
}

function appendPreviousAlbum(
  parts: m.Children[],
  album: Album,
  albumIdx: number,
): void {
  const separator = albumIdx > 0 ? ", " : null;
  const link = drawPreviousAlbumLink(album);
  parts.push(separator, link);
}

function drawPreviousAlbumParts(albums: Album[]): m.Children[] {
  const introduction = "...after travelling from ";
  const parts: m.Children[] = [introduction];
  for (const [albumIdx, album] of albums.entries()) {
    appendPreviousAlbum(parts, album, albumIdx);
  }
  return parts;
}

function viewTripPreviousAlbums(
  vnode: m.Vnode<TripPreviousAlbumsAttrs>,
): m.Children {
  const { albums } = vnode.attrs;

  if (albums.length === 0) {
    return null;
  }

  const parts = drawPreviousAlbumParts(albums);
  return m("p.photo-album-trip-previous", parts);
}

/** Shown on album pages when the album is part of a trip and has earlier stops. */
export function TripPreviousAlbums() {
  return { view: viewTripPreviousAlbums };
}
