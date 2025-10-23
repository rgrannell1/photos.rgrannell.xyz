/*
 * Window lookup
 */
export class Windows {
  /*
  * Check if the window is smaller than a given width
  * used to detect a mobile device
  */
  static isSmallerThan(width: number = 500): boolean {
    return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
  }

  /*
  * Set the page's title
  */
  static setTitle(title: string) {
    document.title = title;
  }
}
