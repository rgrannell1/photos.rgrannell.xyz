import m from "mithril";
import { BannerImagePair } from "./photo.ts";
import { supportsCSSScrollDrivenAnimations } from "../services/feature-detection.ts";

const PARALLAX_RATE = 0.15;
const PARALLAX_MAX_PX = 80;

export type AlbumBannerAttrs = {
  src: string;
  alt: string;
  thumbnailDataUrl: string | null;
};

export function AlbumBanner(): m.Component<AlbumBannerAttrs> {
  let rafId: number | null = null;
  let scrollListener: () => void = () => {};

  return {
    oncreate(vnode: m.Vnode<AlbumBannerAttrs>) {
      if (supportsCSSScrollDrivenAnimations()) {
        console.log("[parallax] using CSS scroll-driven animations");
        const section = (vnode as m.VnodeDOM<AlbumBannerAttrs>).dom as HTMLElement;
        section.classList.add("parallax-css");
        return;
      }

      console.log("[parallax] CSS scroll-driven animations unsupported, using JS fallback");

      const section = (vnode as m.VnodeDOM<AlbumBannerAttrs>).dom;
      const img = section.querySelector(
        ".album-banner-image",
      ) as HTMLImageElement | null;
      if (!img) return;

      const update = () => {
        const y = Math.min(
          window.scrollY * PARALLAX_RATE,
          PARALLAX_MAX_PX,
        );
        img.style.transform = `translateY(${y}px)`;
      };

      scrollListener = () => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
          update();
          rafId = null;
        });
      };

      window.addEventListener("scroll", scrollListener, { passive: true });
      update();
    },
    onremove() {
      window.removeEventListener("scroll", scrollListener);
      if (rafId !== null) cancelAnimationFrame(rafId);
    },
    view(vnode: m.Vnode<AlbumBannerAttrs>) {
      const { src, alt, thumbnailDataUrl } = vnode.attrs;
      return m(
        "section.album-banner",
        { "aria-label": alt },
        m(
          "div.album-banner-inner",
          m(BannerImagePair, { thumbnailUrl: src, thumbnailDataUrl }),
        ),
      );
    },
  };
}
