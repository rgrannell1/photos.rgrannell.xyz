/* Year-scroll tracking: reflect viewport year to URL and scroll on deep link. */

import type { Maybe } from "../../../commons/collections/maybe.ts";
import {
  createYearScrollState,
  listenForYearScroll,
  scheduleInitialYearScroll,
  unmountYearScroll,
} from "./settling.ts";

export type YearScrollState = {
  // pending requestAnimationFrame id for scroll tracking, or null when idle
  scrollFrame: Maybe<number>;
  // year most recently written to the URL, to avoid redundant replaceState calls
  reflectedYear: Maybe<string>;
};

export type YearScrollSpy = {
  passes: number;
  previousY: number;
};

/* Scrolls to initialYear on ?year= deep link. Returns teardown. */
/** Starts year-scroll tracking and returns its teardown function. */
export function mountYearScroll(
  initialYear: Maybe<string>,
): () => void {
  scheduleInitialYearScroll(initialYear);
  const scrollState = createYearScrollState();
  const onScroll = listenForYearScroll(scrollState);
  return unmountYearScroll.bind(null, scrollState, onScroll);
}
