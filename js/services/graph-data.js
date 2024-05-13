/*
 * Set page-wide graph data
 */

export class GraphData {
  static set(metadata) {
    const $og = {
      title: document.querySelector('meta[property="og:title"]'),
      description: document.querySelector('meta[property="og:description"]'),
      image: document.querySelector('meta[property="og:image"]'),
      url: document.querySelector('meta[property="og:url"]')
    }

    // X — The Everything App — Formally Known As Twitter
    const $twitter = {
      title: document.querySelector('meta[name="twitter:title"]'),
      description: document.querySelector('meta[name="twitter:description"]'),
      image: document.querySelector('meta[name="twitter:image"]'),
      url: document.querySelector('meta[name="twitter:url"]')
    }

    $og.title?.setAttribute('content', metadata.title)
    $og.description?.setAttribute('content', metadata.description)
    $og.image?.setAttribute('content', metadata.image)
    $og.url?.setAttribute('content', metadata.url)

    $twitter.title?.setAttribute('content', metadata.title)
    $twitter.description?.setAttribute('content', metadata.description)
    $twitter.image?.setAttribute('content', metadata.image)
    $twitter.url?.setAttribute('content', metadata.url)
  }
}
