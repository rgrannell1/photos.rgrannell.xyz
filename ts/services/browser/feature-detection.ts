/** CSS scroll-driven animations (animation-timeline: scroll()) are preferred for parallax. */
export function supportsCSSScrollDrivenAnimations(): boolean {
  return typeof CSS !== "undefined" &&
    CSS.supports("animation-timeline: scroll()");
}
