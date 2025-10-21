/*
 * Window lookup
 */
export class Windows {
  /*
  *
  */
  static isSmallerThan(width: number = 500): boolean {
    return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
  }

  /*
  *
  */
  static setTitle(title: string) {
    document.title = title;
  }
}
