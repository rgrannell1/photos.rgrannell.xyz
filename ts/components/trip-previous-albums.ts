import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import type { Album } from "../types.ts";

export type TripPreviousAlbumsAttrs = {
  albums: Album[];
};

/**
 * Renders "after travelling from [album], [album], ..." with links to each album.
 * Shown on album pages when the album is part of a trip and has earlier stops.
 */
export function TripPreviousAlbums() {
  return {
    view(vnode: m.Vnode<TripPreviousAlbumsAttrs>) {
      const { albums } = vnode.attrs;

      if (albums.length === 0) {
        return null;
      }

      const parts: m.Child[] = ["...after travelling from "];
      albums.forEach((prev, i) => {
        if (i > 0) parts.push(", ");
        const prevId = asUrn(prev.id).id;
        parts.push(
          m(m.route.Link, {
            href: `/album/${prevId}`,
          }, prev.name),
        );
      });

      return m("p.photo-album-trip-previous", parts);
    },
  };
}
