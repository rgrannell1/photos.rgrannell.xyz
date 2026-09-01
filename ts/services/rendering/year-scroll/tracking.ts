/* Support year scroll operations. */

/* Year-scroll tracking: reflect viewport year to URL and scroll on deep link. */
import m from "mithril";
import {
  YEAR_SCROLL_MAX_PASSES,
  YEAR_SCROLL_OFFSET,
  YEAR_SCROLL_RETRY_DELAY_MS,
} from "../../../constants/layout.ts";
import { ALBUM_YEAR_HEADINGS_SELECTOR } from "../../../constants/selectors.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
  NONE,
} from "../../../commons/collections/maybe.ts";
import type { YearScrollSpy, YearScrollState } from "./year-scroll.ts";
import { settleYearScroll } from "./settling.ts";

/** Test whether a year heading starts below the scroll tracking offset. */
export function isHeadingBelowOffset(heading: HTMLElement): boolean {
  const headingTop = heading.getBoundingClientRect().top;
  return headingTop > YEAR_SCROLL_OFFSET;
}

/** Read and trim a heading's year text, or return none when absent. */
export function readHeadingYear(heading: HTMLElement): Maybe<string> {
  const headingText = heading.textContent?.trim();
  return fromNullable(headingText);
}

/** Read all year headings from the current document in document order. */
export function readYearHeadings(): HTMLElement[] {
  const nodes = document.querySelectorAll<HTMLElement>(
    ALBUM_YEAR_HEADINGS_SELECTOR,
  );
  const headings = Array.from(nodes);
  return headings;
}

/** Return null while the banner remains visible. */
export function readCurrentYearInView(): Maybe<string> {
  const headings = readYearHeadings();

  let current: Maybe<string> = NONE;
  for (const heading of headings) {
    if (isHeadingBelowOffset(heading)) {
      break;
    }
    current = readHeadingYear(heading);
  }
  return current;
}

/** Replace the current history URL without adding a navigation entry. */
export function replaceYearRoute(yearRoute: string): void {
  const currentState = history.state;
  history.replaceState(currentState, "", yearRoute);
}

/** Use replaceState to keep scroll position while making URL shareable. */
export function reflectYearInUrl(year: string): void {
  const route = m.route.get();
  const base = route.split("?")[0];
  const yearRoute = `#!${base}?year=${year}`;
  replaceYearRoute(yearRoute);
}

/** Reflect a changed visible year in state and the URL. */
export function reflectVisibleYear(
  scrollState: YearScrollState,
  year: Maybe<string>,
): void {
  const reflectedYear = scrollState.reflectedYear;
  const hasNewVisibleYear = isSome(year) && year !== reflectedYear;
  if (hasNewVisibleYear) {
    scrollState.reflectedYear = year;
    reflectYearInUrl(year);
  }
}

/** Finish a queued frame and reflect the currently visible year. */
export function reflectCurrentYear(scrollState: YearScrollState): void {
  scrollState.scrollFrame = NONE;
  const year = readCurrentYearInView();
  reflectVisibleYear(scrollState, year);
}

/** Queue at most one animation frame to reflect the visible year. */
export function trackScroll(scrollState: YearScrollState): void {
  if (isSome(scrollState.scrollFrame)) {
    return;
  }
  const reflectYear = reflectCurrentYear.bind(null, scrollState);
  const frame = requestAnimationFrame(reflectYear);
  scrollState.scrollFrame = frame;
}

/** Retry year-scroll settling until the configured pass limit is reached. */
export function retryYearScroll(year: string, spy: YearScrollSpy): void {
  if (spy.passes >= YEAR_SCROLL_MAX_PASSES) {
    return;
  }

  const settleScroll = settleYearScroll.bind(null, year, spy);
  setTimeout(settleScroll, YEAR_SCROLL_RETRY_DELAY_MS);
}
