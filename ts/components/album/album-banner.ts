import m from "mithril";
import { BannerImagePair } from "../media/photo.ts";
import { mountParallax } from "../../services/parallax.ts";

export type AlbumBannerAttrs = {
  src: string;
  alt: string;
  thumbnailDataUrl?: string | null;
};

type BannerState = {
  // teardown for the parallax effect, set on mount
  teardownParallax: (() => void) | null;
};

function mountAlbumBanner(
  bannerState: BannerState,
  vnode: m.Vnode<AlbumBannerAttrs>,
): void {
  const section = (vnode as m.VnodeDOM<AlbumBannerAttrs>).dom as HTMLElement;
  bannerState.teardownParallax = mountParallax(section);
}

function unmountAlbumBanner(bannerState: BannerState): void {
  bannerState.teardownParallax?.();
  bannerState.teardownParallax = null;
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
    teardownParallax: null,
  };

  return {
    oncreate: mountAlbumBanner.bind(null, bannerState),
    onremove: unmountAlbumBanner.bind(null, bannerState),
    view: viewAlbumBanner,
  };
}
