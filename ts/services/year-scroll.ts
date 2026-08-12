/*
 * Year-scroll tracking for the albums page: reflect the year at the top of
 * the viewport into the URL, and scroll to a year heading on a deep link.
 * All DOM measurement and mutation for this behaviour lives here.
 */

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

/*
 * The year whose heading currently sits at the top of the viewport, or null
 * (e.g. while the banner is still in view). Headings are in document order
 * (newest year first), so the last one above the offset wins.
 */
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

/*
 * Reflect the year in the URL as a `year` param without triggering a re-render.
 * replaceState (rather than m.route.set) keeps the router's route and the scroll
 * position intact while making the URL shareable/bookmarkable to a year.
 */
function reflectYearInUrl(year: string): void {
  const base = m.route.get().split("?")[0];
  history.replaceState(history.state, "", `#!${base}?year=${year}`);
}

/* Reflect the year at the top of the viewport into the URL, once per frame. */
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

/*
 * Keep the year heading at the top while album images above it load and grow
 * the layout — re-scroll until the required scroll position stops changing, or
 * we hit the pass cap. A missing heading retries within the same cap, since
 * batched rendering may not have reached that year yet.
 */
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

/* Scroll a year's heading to the top, for an initial ?year= deep link. */
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

/*
 * Start tracking scroll position against year headings. Scrolls to
 * initialYear first when given (a ?year= deep link). Returns a teardown.
 */
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
