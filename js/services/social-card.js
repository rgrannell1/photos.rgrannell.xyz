export class SocialCard {
  /*
   * I'm not sure why I'm even setting this, it's like setting
   * a social tag for a chan site. But some other website might
   * use this metadata.
   */
  static setXTheEverythingAppFormallyKnownAsTwitter(cardOpts) {
    const $cardUrl = document.querySelector('meta[property="twitter:url"]');
    $cardUrl.setAttribute("content", cardOpts.url);

    const $cardTitle = document.querySelector('meta[name="twitter:title"]');
    $cardTitle.setAttribute("content", cardOpts.title);

    const $cardDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );
    $cardDescription.setAttribute("content", cardOpts.description);

    const $cardImage = document.querySelector('meta[name="twitter:image"]');
    $cardImage.setAttribute("content", cardOpts.image);

    console.log($cardUrl);
  }

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
    SocialCard.setXTheEverythingAppFormallyKnownAsTwitter(cardOpts);
    SocialCard.setOpenGraph(cardOpts);
  }
}
