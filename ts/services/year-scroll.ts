/* Year-scroll tracking: reflect viewport year to URL and scroll on deep link. */

import m from "mithril";
import {
  YEAR_SCROLL_MAX_PASSES,
  YEAR_SCROLL_OFFSET,
} from "../constants/layout.ts";
import {
  ALBUM_YEAR_HEADING_ID_PREFIX,
  ALBUM_YEAR_HEADINGS_SELECTOR,
} from "../constants/selectors.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
  NONE,
} from "../commons/maybe.ts";

type YearScrollState = {
  // pending requestAnimationFrame id for scroll tracking, or null when idle
  scrollFrame: Maybe<number>;
  // year most recently written to the URL, to avoid redundant replaceState calls
  reflectedYear: Maybe<string>;
};

/* Newest year first. Last heading above offset wins. Null if banner in view. */
function currentYearInView(): Maybe<string> {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(ALBUM_YEAR_HEADINGS_SELECTOR),
  );

  let current: Maybe<string> = NONE;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > YEAR_SCROLL_OFFSET) {
      break;
    }
    current = fromNullable(heading.textContent?.trim());
  }
  return current;
}

/* Use replaceState to keep scroll position while making URL shareable. */
function reflectYearInUrl(year: string): void {
  const base = m.route.get().split("?")[0];
  history.replaceState(history.state, "", `#!${base}?year=${year}`);
}

function reflectCurrentYear(scrollState: YearScrollState): void {
  scrollState.scrollFrame = NONE;
  const year = currentYearInView();
  const hasNewVisibleYear = isSome(year) && year !== scrollState.reflectedYear;
  if (hasNewVisibleYear) {
    scrollState.reflectedYear = year;
    reflectYearInUrl(year);
  }
}

function trackScroll(scrollState: YearScrollState): void {
  if (isSome(scrollState.scrollFrame)) {
    return;
  }
  scrollState.scrollFrame = requestAnimationFrame(
    reflectCurrentYear.bind(null, scrollState),
  );
}

/* Retry while scroll position changes or pass cap not reached. */
function settleYearScroll(
  year: string,
  spy: { passes: number; previousY: number },
): void {
  const heading = document.getElementById(
    `${ALBUM_YEAR_HEADING_ID_PREFIX}${year}`,
  );
  if (!heading) {
    spy.passes += 1;
    if (spy.passes < YEAR_SCROLL_MAX_PASSES) {
      setTimeout(settleYearScroll.bind(null, year, spy), 120);
    }
    return;
  }

  heading.scrollIntoView();
  spy.passes += 1;

  const hasScrollChanged = window.scrollY !== spy.previousY;
  const hasPassesRemaining = spy.passes < YEAR_SCROLL_MAX_PASSES;
  const shouldRetryScroll = hasScrollChanged && hasPassesRemaining;
  if (shouldRetryScroll) {
    spy.previousY = window.scrollY;
    setTimeout(settleYearScroll.bind(null, year, spy), 120);
  }
}

function scrollToYear(year: string): void {
  settleYearScroll(year, { passes: 0, previousY: -1 });
}

function unmountYearScroll(
  scrollState: YearScrollState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  if (isSome(scrollState.scrollFrame)) {
    cancelAnimationFrame(scrollState.scrollFrame);
  }
}

/* Scrolls to initialYear on ?year= deep link. Returns teardown. */
export function mountYearScroll(
  initialYear: Maybe<string>,
): () => void {
  if (isSome(initialYear)) {
    requestAnimationFrame(scrollToYear.bind(null, initialYear));
  }

  const scrollState: YearScrollState = {
    scrollFrame: NONE,
    reflectedYear: NONE,
  };
  const onScroll = trackScroll.bind(null, scrollState);
  window.addEventListener("scroll", onScroll, { passive: true });

  return unmountYearScroll.bind(null, scrollState, onScroll);
}
