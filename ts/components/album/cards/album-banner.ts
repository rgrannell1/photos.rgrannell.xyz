/* Render an album banner and manage its parallax effect. */

import m from "mithril";
import {
  BannerImagePair,
  type BannerImagePairAttrs,
} from "../../media/images/banner-image-pair.ts";
import { supportsCSSScrollDrivenAnimations } from "../../../services/browser/feature-detection.ts";
import { PARALLAX_MAX_PX, PARALLAX_RATE } from "../../../constants/layout.ts";
import {
  ALBUM_BANNER_IMAGE_SELECTOR,
  PARALLAX_CSS_CLASS,
} from "../../../constants/selectors.ts";
import { isSome, type Maybe, NONE } from "../../../commons/collections/maybe.ts";

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
  const transform = `translateY(${offsetY}px)`;
  image.style.transform = transform;
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
  const step = stepParallax.bind(null, bannerState, image);
  const rafId = requestAnimationFrame(step);
  bannerState.rafId = rafId;
}

function stopParallax(
  bannerState: BannerState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  const rafId = bannerState.rafId;
  const hasScheduledFrame = isSome(rafId);
  if (hasScheduledFrame) {
    cancelAnimationFrame(rafId);
  }
}

function enableCssParallax(section: HTMLElement): boolean {
  const isSupported = supportsCSSScrollDrivenAnimations();
  if (!isSupported) {
    return false;
  }
  console.log("[parallax] using CSS scroll-driven animations");
  const className = PARALLAX_CSS_CLASS;
  section.classList.add(className);
  return true;
}

function enableJsParallax(
  bannerState: BannerState,
  section: HTMLElement,
): void {
  console.log(
    "[parallax] CSS scroll-driven animations unsupported, using JS fallback",
  );
  const image = section.querySelector(
    ALBUM_BANNER_IMAGE_SELECTOR,
  ) as HTMLImageElement | null;
  if (!image) {
    return;
  }

  const onScroll = trackBannerScroll.bind(null, bannerState, image);
  const teardown = stopParallax.bind(null, bannerState, onScroll);
  window.addEventListener("scroll", onScroll, { passive: true });
  applyParallax(image);
  bannerState.teardownParallax = teardown;
}

function mountAlbumBanner(
  bannerState: BannerState,
  vnode: m.Vnode<AlbumBannerAttrs>,
): void {
  const section = (vnode as m.VnodeDOM<AlbumBannerAttrs>).dom as HTMLElement;
  const hasCssParallax = enableCssParallax(section);
  if (hasCssParallax) {
    return;
  }
  enableJsParallax(bannerState, section);
}

function unmountAlbumBanner(bannerState: BannerState): void {
  if (isSome(bannerState.teardownParallax)) {
    bannerState.teardownParallax();
  }
  bannerState.teardownParallax = NONE;
}

function drawBannerImage(attrs: AlbumBannerAttrs): m.Children {
  const thumbnailDataUrl = attrs.thumbnailDataUrl ?? NONE;
  const imageAttrs: BannerImagePairAttrs = {
    thumbnailUrl: attrs.src,
    thumbnailDataUrl,
    alt: attrs.alt,
  };
  return m(BannerImagePair, imageAttrs);
}

function viewAlbumBanner(vnode: m.Vnode<AlbumBannerAttrs>): m.Children {
  const image = drawBannerImage(vnode.attrs);
  const inner = m("div.album-banner-inner", image);
  const sectionAttrs = { "aria-label": vnode.attrs.alt };
  return m("section.album-banner", sectionAttrs, inner);
}

function createBannerState(): BannerState {
  return { rafId: NONE, teardownParallax: NONE };
}

export function AlbumBanner(): m.Component<AlbumBannerAttrs> {
  const bannerState = createBannerState();
  const oncreate = mountAlbumBanner.bind(null, bannerState);
  const onremove = unmountAlbumBanner.bind(null, bannerState);

  return {
    oncreate,
    onremove,
    view: viewAlbumBanner,
  };
}
