import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Album } from "../../types.ts";

export type TripPreviousAlbumsAttrs = {
  albums: Album[];
};

function viewTripPreviousAlbums(
  vnode: m.Vnode<TripPreviousAlbumsAttrs>,
): m.Children {
  const { albums } = vnode.attrs;

  if (albums.length === 0) {
    return null;
  }

  const parts: m.Child[] = ["...after travelling from "];
  for (const [idx, prev] of albums.entries()) {
    if (idx > 0) {
      parts.push(", ");
    }
    const prevId = asUrn(prev.id).id;
    parts.push(
      m(m.route.Link, {
        href: `/album/${prevId}`,
      }, prev.name),
    );
  }

  return m("p.photo-album-trip-previous", parts);
}

/** Shown on album pages when the album is part of a trip and has earlier stops. */
export function TripPreviousAlbums() {
  return { view: viewTripPreviousAlbums };
}
