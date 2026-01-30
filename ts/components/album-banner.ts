import m from "mithril";

const PARALLAX_RATE = 0.15;
const PARALLAX_MAX_PX = 80;

export type AlbumBannerAttrs = { src: string; alt: string };

export function AlbumBanner(): m.Component<AlbumBannerAttrs> {
  let rafId: number | null = null;
  let scrollListener: () => void = () => {};

  return {
    oncreate(vnode: m.Vnode<AlbumBannerAttrs>) {
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
      const { src, alt } = vnode.attrs;
      return m(
        "section.album-banner",
        { "aria-label": alt },
        m("div.album-banner-inner", [
          m("img.album-banner-image", {
            src,
            alt,
            loading: "eager",
          }),
        ]),
      );
    },
  };
}
