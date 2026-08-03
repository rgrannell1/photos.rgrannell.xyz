import m from "mithril";
import { BannerImagePair } from "../media/photo.ts";
import { supportsCSSScrollDrivenAnimations } from "../../services/feature-detection.ts";

const PARALLAX_RATE = 0.15;
const PARALLAX_MAX_PX = 80;

export type AlbumBannerAttrs = {
  src: string;
  alt: string;
  thumbnailDataUrl?: string | null;
};

type BannerState = {
  // pending requestAnimationFrame id for the JS parallax fallback, or null when idle
  rafId: number | null;
  // bound scroll handler, kept so onremove can unregister it
  scrollListener: () => void;
};

function noop(): void {}

/* Offset the banner image against the scroll position. */
function applyParallax(img: HTMLImageElement): void {
  const offsetY = Math.min(
    window.scrollY * PARALLAX_RATE,
    PARALLAX_MAX_PX,
  );
  img.style.transform = `translateY(${offsetY}px)`;
}

function stepParallax(bannerState: BannerState, img: HTMLImageElement): void {
  applyParallax(img);
  bannerState.rafId = null;
}

function trackBannerScroll(
  bannerState: BannerState,
  img: HTMLImageElement,
): void {
  if (bannerState.rafId !== null) {
    return;
  }
  bannerState.rafId = requestAnimationFrame(
    stepParallax.bind(null, bannerState, img),
  );
}

function mountAlbumBanner(
  bannerState: BannerState,
  vnode: m.Vnode<AlbumBannerAttrs>,
): void {
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

  bannerState.scrollListener = trackBannerScroll.bind(null, bannerState, img);
  window.addEventListener("scroll", bannerState.scrollListener, {
    passive: true,
  });
  applyParallax(img);
}

function unmountAlbumBanner(bannerState: BannerState): void {
  window.removeEventListener("scroll", bannerState.scrollListener);
  if (bannerState.rafId !== null) cancelAnimationFrame(bannerState.rafId);
}

function viewAlbumBanner(vnode: m.Vnode<AlbumBannerAttrs>): m.Children {
  const { src, alt, thumbnailDataUrl } = vnode.attrs;
  return m(
    "section.album-banner",
    { "aria-label": alt },
    m(
      "div.album-banner-inner",
      m(BannerImagePair, {
        thumbnailUrl: src,
        thumbnailDataUrl: thumbnailDataUrl ?? null,
        alt,
      }),
    ),
  );
}

export function AlbumBanner(): m.Component<AlbumBannerAttrs> {
  const bannerState: BannerState = {
    rafId: null,
    scrollListener: noop,
  };

  return {
    oncreate: mountAlbumBanner.bind(null, bannerState),
    onremove: unmountAlbumBanner.bind(null, bannerState),
    view: viewAlbumBanner,
  };
}
