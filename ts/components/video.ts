
import m from 'mithril';

type VideoAttrs = {
  preload: string;
  posterUrl: string;
  urlUnscaled: string;
  url1080p: string;
  url720p: string;
  url480p: string;
}

export function Video() {
  return {
    view(vnode: m.Vnode<VideoAttrs>) {
      const { preload, posterUrl, urlUnscaled, url1080p, url720p, url480p } = vnode.attrs

      const $source = m('source', {
        src: url480p,
        type: 'video/mp4'
      });

      const $resolutionLinks = m('ul', [
        m('a', { href: urlUnscaled }, '[L]'),
        m('a', { href: url1080p }, '[M]'),
        m('a', { href: url720p }, '[S]'),
        m('a', { href: url480p }, '[XS]')
      ]);

      return m('div', [
        m('video.thumbnail-video', {
          controls: true,
          preload,
          poster: posterUrl
         }, $source)
      ]),
      $resolutionLinks
    }
  }
}
