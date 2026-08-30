/* Support year scroll operations. */

/* Year-scroll tracking: reflect viewport year to URL and scroll on deep link. */
import m from "mithril";
import {
  YEAR_SCROLL_MAX_PASSES,
  YEAR_SCROLL_OFFSET,
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

export function isHeadingBelowOffset(heading: HTMLElement): boolean {
  const headingTop = heading.getBoundingClientRect().top;
  return headingTop > YEAR_SCROLL_OFFSET;
}

export function readHeadingYear(heading: HTMLElement): Maybe<string> {
  const headingText = heading.textContent?.trim();
  return fromNullable(headingText);
}

export function readYearHeadings(): HTMLElement[] {
  const nodes = document.querySelectorAll<HTMLElement>(
    ALBUM_YEAR_HEADINGS_SELECTOR,
  );
  const headings = Array.from(nodes);
  return headings;
}

/* Newest year first. Last heading above offset wins. Null if banner in view. */
export function currentYearInView(): Maybe<string> {
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

export function replaceYearRoute(yearRoute: string): void {
  const currentState = history.state;
  history.replaceState(currentState, "", yearRoute);
}

/* Use replaceState to keep scroll position while making URL shareable. */
export function reflectYearInUrl(year: string): void {
  const route = m.route.get();
  const base = route.split("?")[0];
  const yearRoute = `#!${base}?year=${year}`;
  replaceYearRoute(yearRoute);
}

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

export function reflectCurrentYear(scrollState: YearScrollState): void {
  scrollState.scrollFrame = NONE;
  const year = currentYearInView();
  reflectVisibleYear(scrollState, year);
}

export function trackScroll(scrollState: YearScrollState): void {
  if (isSome(scrollState.scrollFrame)) {
    return;
  }
  const reflectYear = reflectCurrentYear.bind(null, scrollState);
  const frame = requestAnimationFrame(reflectYear);
  scrollState.scrollFrame = frame;
}

export function retryYearScroll(year: string, spy: YearScrollSpy): void {
  if (spy.passes >= YEAR_SCROLL_MAX_PASSES) {
    return;
  }

  const settleScroll = settleYearScroll.bind(null, year, spy);
  const retryDelay = 120;
  setTimeout(settleScroll, retryDelay);
}
