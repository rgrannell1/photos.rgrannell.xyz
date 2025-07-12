export class SocialCard {
  static setOpenGraph(cardOpts) {
    const $cardUrl = document.querySelector('meta[property="og:url"]');
    $cardUrl.setAttribute("content", cardOpts.url);

    const $cardTitle = document.querySelector('meta[property="og:title"]');
    $cardTitle.setAttribute("content", cardOpts.title);

    const $cardDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    $cardDescription.setAttribute("content", cardOpts.description);

    const $cardImage = document.querySelector('meta[property="og:image"]');
    $cardImage.setAttribute("content", cardOpts.image);
  }

  static set(cardOpts) {
    SocialCard.setOpenGraph(cardOpts);
  }
}
