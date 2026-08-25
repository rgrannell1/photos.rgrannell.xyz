/* Render an album banner and manage its parallax effect. */

import m from "mithril";
import { BannerImagePair } from "../media/banner-image-pair.ts";
import { supportsCSSScrollDrivenAnimations } from "../../services/feature-detection.ts";
import { PARALLAX_MAX_PX, PARALLAX_RATE } from "../../constants/layout.ts";
import {
  ALBUM_BANNER_IMAGE_SELECTOR,
  PARALLAX_CSS_CLASS,
} from "../../constants/selectors.ts";
import { isSome, type Maybe, NONE } from "../../commons/maybe.ts";

export type AlbumBannerAttrs = {
  src: string;
  alt: string;
  thumbnailDataUrl?: Maybe<string>;
};

type BannerState = {
  rafId: Maybe<number>;
  teardownParallax: Maybe<() => void>;
};

function applyParallax(image: HTMLImageElement): void {
  const offsetY = Math.min(
    window.scrollY * PARALLAX_RATE,
    PARALLAX_MAX_PX,
  );
  image.style.transform = `translateY(${offsetY}px)`;
}

function stepParallax(
  bannerState: BannerState,
  image: HTMLImageElement,
): void {
  applyParallax(image);
  bannerState.rafId = NONE;
}

function trackBannerScroll(
  bannerState: BannerState,
  image: HTMLImageElement,
): void {
  if (isSome(bannerState.rafId)) {
    return;
  }
  bannerState.rafId = requestAnimationFrame(
    stepParallax.bind(null, bannerState, image),
  );
}

function stopParallax(
  bannerState: BannerState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  if (isSome(bannerState.rafId)) {
    cancelAnimationFrame(bannerState.rafId);
  }
}

function mountAlbumBanner(
  bannerState: BannerState,
  vnode: m.Vnode<AlbumBannerAttrs>,
): void {
  const section = (vnode as m.VnodeDOM<AlbumBannerAttrs>).dom as HTMLElement;
  if (supportsCSSScrollDrivenAnimations()) {
    console.log("[parallax] using CSS scroll-driven animations");
    section.classList.add(PARALLAX_CSS_CLASS);
    return;
  }

  console.log("[parallax] CSS scroll-driven animations unsupported, using JS fallback");

  const image = section.querySelector(
    ALBUM_BANNER_IMAGE_SELECTOR,
  ) as HTMLImageElement | null;
  if (!image) {
    return;
  }

  const onScroll = trackBannerScroll.bind(null, bannerState, image);
  window.addEventListener("scroll", onScroll, { passive: true });
  applyParallax(image);
  bannerState.teardownParallax = stopParallax.bind(
    null,
    bannerState,
    onScroll,
  );
}

function unmountAlbumBanner(bannerState: BannerState): void {
  if (isSome(bannerState.teardownParallax)) {
    bannerState.teardownParallax();
  }
  bannerState.teardownParallax = NONE;
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
        thumbnailDataUrl: thumbnailDataUrl ?? NONE,
        alt,
      }),
    ),
  );
}

export function AlbumBanner(): m.Component<AlbumBannerAttrs> {
  const bannerState: BannerState = {
    rafId: NONE,
    teardownParallax: NONE,
  };

  return {
    oncreate: mountAlbumBanner.bind(null, bannerState),
    onremove: unmountAlbumBanner.bind(null, bannerState),
    view: viewAlbumBanner,
  };
}
