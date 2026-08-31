/* Support year scroll operations. */

/* Support year scroll operations. */
import { ALBUM_YEAR_HEADING_ID_PREFIX } from "../../../constants/selectors.ts";
import { isNone, isSome, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import type { YearScrollSpy, YearScrollState } from "./year-scroll.ts";
import { retryYearScroll, trackScroll } from "./tracking.ts";

/** Count a missing heading pass and schedule another scroll attempt. */
export function retryMissingHeading(year: string, spy: YearScrollSpy): void {
  spy.passes += 1;
  retryYearScroll(year, spy);
}

/** Retry after a scroll attempt only while the scroll position still changes. */
export function retryChangedScroll(year: string, spy: YearScrollSpy): void {
  const currentY = window.scrollY;
  const hasScrollChanged = currentY !== spy.previousY;
  if (!hasScrollChanged) {
    return;
  }

  spy.previousY = currentY;
  retryYearScroll(year, spy);
}

/** Find the heading element for one album year. */
export function readYearHeading(year: string): HTMLElement | null {
  const headingId = `${ALBUM_YEAR_HEADING_ID_PREFIX}${year}`;
  return document.getElementById(headingId);
}

/** Scroll to a found heading and check whether another settling pass is needed. */
export function finishYearScroll(
  year: string,
  spy: YearScrollSpy,
  heading: HTMLElement,
): void {
  const nextPass = spy.passes + 1;
  heading.scrollIntoView();
  spy.passes = nextPass;
  retryChangedScroll(year, spy);
}

/** Retry while scroll position changes or pass cap not reached. */
export function settleYearScroll(
  year: string,
  spy: YearScrollSpy,
): void {
  const heading = readYearHeading(year);
  const hasHeading = heading !== null;
  if (!hasHeading) {
    retryMissingHeading(year, spy);
    return;
  }

  finishYearScroll(year, spy, heading);
}

/** Start a new settling sequence for one year. */
export function scrollToYear(year: string): void {
  settleYearScroll(year, { passes: 0, previousY: -1 });
}

/** Remove the scroll listener and cancel any queued tracking frame. */
export function unmountYearScroll(
  scrollState: YearScrollState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  const frame = scrollState.scrollFrame;
  const hasFrame = isSome(frame);
  if (hasFrame) {
    cancelAnimationFrame(frame);
  }
}

/** Schedule the initial year jump when the route supplies a year. */
export function scheduleInitialYearScroll(initialYear: Maybe<string>): void {
  if (isNone(initialYear)) {
    return;
  }

  const scrollToInitialYear = scrollToYear.bind(null, initialYear);
  requestAnimationFrame(scrollToInitialYear);
}

/** Create year-scroll state with no queued frame or reflected year. */
export function createYearScrollState(): YearScrollState {
  return { scrollFrame: NONE, reflectedYear: NONE };
}

/** Attach passive year tracking and return the listener for later removal. */
export function listenForYearScroll(scrollState: YearScrollState): () => void {
  const onScroll = trackScroll.bind(null, scrollState);
  const options = { passive: true };
  window.addEventListener("scroll", onScroll, options);
  return onScroll;
}
