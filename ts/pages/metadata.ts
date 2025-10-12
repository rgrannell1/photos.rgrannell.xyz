import m from "mithril";
import { Photo } from "../components/photo.ts";
import type { Photo as PhotoType } from "../types.ts";
import { AlbumButton } from "../components/album-button.ts";
import { ExifData } from "../components/exif-data.ts";

type MetadataPage = {
  photo: PhotoType;
};

export function MetadataPage() {
  return {
    view(vnode: m.Vnode<MetadataPage>) {
      const { photo } = vnode.attrs;

      const $links = m("p", [
        m("a", { href: photo.fullImage, rel: "noreferrer" }, "[webp]"),
        m("a", { href: photo.pngUrl, rel: "noreferrer" }, "[png]"),
        // [share]
        m(AlbumButton, { id: photo.albumId }),
      ]);

      const $exif = m(ExifData, { photo });

      return m("section", [
        m("h1", "Metadata"),
        m(Photo, {
          ...photo,
          loading: "eager",
        }),
        $links,
        $exif,
      ]);
    },
  };
}
