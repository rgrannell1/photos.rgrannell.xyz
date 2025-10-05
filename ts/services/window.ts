export class Windows {
  static isSmallerThan(width: number = 500): boolean {
    return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
  }
}
