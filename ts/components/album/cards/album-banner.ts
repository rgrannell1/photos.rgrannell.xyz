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

/** Applies the bounded vertical offset for the current scroll position. */
function applyParallax(image: HTMLImageElement): void {
  const offsetY = Math.min(
    window.scrollY * PARALLAX_RATE,
    PARALLAX_MAX_PX,
  );
  const transform = `translateY(${offsetY}px)`;
  image.style.transform = transform;
}

/** Applies one animation frame and releases the pending-frame guard. */
function stepParallax(
  bannerState: BannerState,
  image: HTMLImageElement,
): void {
  applyParallax(image);
  bannerState.rafId = NONE;
}

/** Schedules one parallax update unless a frame is already pending. */
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

/** Removes scroll tracking and cancels any pending animation frame. */
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

/** Enables native scroll-driven parallax when the browser supports it. */
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

/** Enables the JavaScript parallax fallback when the banner image exists. */
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

/** Selects and starts the supported parallax implementation after mount. */
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

/** Stops active parallax work when the banner leaves the document. */
function unmountAlbumBanner(bannerState: BannerState): void {
  if (isSome(bannerState.teardownParallax)) {
    bannerState.teardownParallax();
  }
  bannerState.teardownParallax = NONE;
}

/** Builds the banner image pair with an optional mosaic placeholder. */
function drawBannerImage(attrs: AlbumBannerAttrs): m.Children {
  const thumbnailDataUrl = attrs.thumbnailDataUrl ?? NONE;
  const imageAttrs: BannerImagePairAttrs = {
    thumbnailUrl: attrs.src,
    thumbnailDataUrl,
    alt: attrs.alt,
  };
  return m(BannerImagePair, imageAttrs);
}

/** Renders the accessible album banner structure. */
function viewAlbumBanner(vnode: m.Vnode<AlbumBannerAttrs>): m.Children {
  const $image = drawBannerImage(vnode.attrs);
  const $inner = m("div.album-banner-inner", $image);
  const sectionAttrs = { "aria-label": vnode.attrs.alt };
  return m("section.album-banner", sectionAttrs, $inner);
}

/** Creates empty scheduling and teardown state for one banner. */
function createBannerState(): BannerState {
  return { rafId: NONE, teardownParallax: NONE };
}

/** Creates an album banner component with isolated parallax state. */
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
