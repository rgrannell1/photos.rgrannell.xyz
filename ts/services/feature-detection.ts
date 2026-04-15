/**
 * Returns true if the browser supports CSS scroll-driven animations
 * (animation-timeline: scroll()), the preferred method for parallax.
 */
export function supportsCSSScrollDrivenAnimations(): boolean {
  return typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline: scroll()");
}
