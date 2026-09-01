/* Support about operations. */

import m from "mithril";
import { AlbumBanner } from "../../album/cards/album-banner.ts";
import { thumbHashDataUrl } from "../../../services/rendering/year-scroll/photos.ts";
import {
  ABOUT_BANNER_MOSAIC,
  ABOUT_BANNER_URL,
} from "../../../constants/banners.ts";
import type { AboutPageAttrs } from "./about.ts";
import { drawAboutContent } from "./content.ts";

/** Draws the about banner with its mosaic placeholder. */
export function drawAboutBanner(): m.Children {
  const thumbnailDataUrl = thumbHashDataUrl(ABOUT_BANNER_MOSAIC);
  return m(AlbumBanner, {
    src: ABOUT_BANNER_URL,
    alt: "About",
    thumbnailDataUrl,
  });
}

/** Draws the about page with sidebar-aware layout. */
export function viewAboutPage(vnode: m.Vnode<AboutPageAttrs>): m.Children {
  const className = vnode.attrs.visible ? "page sidebar-visible" : "page";
  const $banner = drawAboutBanner();
  return m("main", { class: className }, [$banner, drawAboutContent()]);
}
