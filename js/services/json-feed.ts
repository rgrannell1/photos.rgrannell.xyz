export class JSONFeed {
  static getElement(): HTMLAnchorElement | null {
    return document.getElementById("rss") as HTMLAnchorElement;
  }

  static setIndex() {
    const $rss = this.getElement();
    if (!$rss) {
      return;
    }

    const feedUrl = `/manifest/atom/atom-index.xml`;
    $rss.href = feedUrl;
  }
}
