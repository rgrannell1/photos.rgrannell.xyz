/* Year-scroll tracking: reflect viewport year to URL and scroll on deep link. */

import m from "mithril";
import {
  YEAR_SCROLL_MAX_PASSES,
  YEAR_SCROLL_OFFSET,
} from "../constants/layout.ts";

type YearScrollState = {
  // pending requestAnimationFrame id for scroll tracking, or null when idle
  scrollFrame: number | null;
  // year most recently written to the URL, to avoid redundant replaceState calls
  reflectedYear: string | null;
};

/* Newest year first. Last heading above offset wins. Null if banner in view. */
function currentYearInView(): string | null {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(".album-container .year-heading"),
  );

  let current: string | null = null;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > YEAR_SCROLL_OFFSET) {
      break;
    }
    current = heading.textContent?.trim() ?? null;
  }
  return current;
}

/* Use replaceState to keep scroll position while making URL shareable. */
function reflectYearInUrl(year: string): void {
  const base = m.route.get().split("?")[0];
  history.replaceState(history.state, "", `#!${base}?year=${year}`);
}

function reflectCurrentYear(scrollState: YearScrollState): void {
  scrollState.scrollFrame = null;
  const year = currentYearInView();
  if (year && year !== scrollState.reflectedYear) {
    scrollState.reflectedYear = year;
    reflectYearInUrl(year);
  }
}

function trackScroll(scrollState: YearScrollState): void {
  if (scrollState.scrollFrame !== null) {
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
  const heading = document.getElementById(`year-${year}`);
  if (!heading) {
    spy.passes += 1;
    if (spy.passes < YEAR_SCROLL_MAX_PASSES) {
      setTimeout(settleYearScroll.bind(null, year, spy), 120);
    }
    return;
  }

  heading.scrollIntoView();
  spy.passes += 1;

  if (window.scrollY !== spy.previousY && spy.passes < YEAR_SCROLL_MAX_PASSES) {
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
  if (scrollState.scrollFrame !== null) {
    cancelAnimationFrame(scrollState.scrollFrame);
  }
}

/* Scrolls to initialYear on ?year= deep link. Returns teardown. */
export function mountYearScroll(
  initialYear: string | undefined,
): () => void {
  if (initialYear) {
    requestAnimationFrame(scrollToYear.bind(null, initialYear));
  }

  const scrollState: YearScrollState = {
    scrollFrame: null,
    reflectedYear: null,
  };
  const onScroll = trackScroll.bind(null, scrollState);
  window.addEventListener("scroll", onScroll, { passive: true });

  return unmountYearScroll.bind(null, scrollState, onScroll);
}
