import m from "mithril";
import { ImagePair } from "./photo.ts";

export type PhotoAlbumAttrs = {
  imageUrl: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string;
  loading: "eager" | "lazy";
  child?: m.Children;
  onclick?: (e: Event) => void;
  minDate?: number;
};

export function PhotoAlbum() {
  return {
    view(vnode: m.Vnode<PhotoAlbumAttrs>) {
      const {
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl,
        loading,
        child,
        minDate,
        onclick,
      } = vnode.attrs;

      return m("div.photo-album", { "data-min-date": minDate }, [
        m(ImagePair, {
          imageUrl,
          thumbnailUrl,
          thumbnailDataUrl,
          loading,
          onclick,
        }),
        child,
      ]);
    },
  };
}
