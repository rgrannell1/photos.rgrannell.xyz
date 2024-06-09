
export class JSONFeed {
  static getElement() {
    return document.getElementById("rss");
  }

  static setTag(tag) {
    const $rss = this.getElement();
    if (!$rss || !tag) {
      return;
    }

    const feedUrl = `/feeds/tags/${tag}.json`;
    $rss.href = feedUrl;
  }

  static setIndex() {
    const $rss = this.getElement();
    if (!$rss) {
      return;
    }

    const feedUrl = `/feeds/index.json`;
    $rss.href = feedUrl;
  }
}