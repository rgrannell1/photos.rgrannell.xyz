import m from "mithril";
import { broadcast } from "../events.ts";
import { Photos } from "../services/photos";

function InfoSVG() {
  return m("svg.photo-icon", {
    height: 40,
    width: 40,
    preserveAspectRatio: "xMinYMin",
    viewBox: "-2 -2 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  }, [
    m("path", {
      d: "m10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1 -2 0v-5a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
    }),
  ]);
}

type PhotoMetadata = {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  thumbnailDataUrl: string;
};

type MetadataIconAttrs = {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  mosaicColours: string;
};

export function MetadataIcon() {
  function onclick(photoMetadata: PhotoMetadata, _: Event) {
    broadcast("click_photo_metadata", { ...photoMetadata });
  }

  return {
    view(vnode: m.Vnode<MetadataIconAttrs>) {
      const { id, imageUrl, thumbnailUrl, mosaicColours } = vnode.attrs;

      const photoMetadata = {
        id,
        imageUrl,
        thumbnailUrl,
        thumbnailDataUrl: Photos.encodeBitmapDataURL(mosaicColours),
      };

      m("div.photo-metadata-popover", {
        onclick: onclick.bind(null, photoMetadata),
      }, [
        InfoSVG(),
      ]);
    },
  };
}
