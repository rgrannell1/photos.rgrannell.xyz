import m from "mithril";
import { SCROLL_HIDE_THRESHOLD } from "../constants";

type DateEntry = {
  position: DOMRect;
  minDate: number;
};

let datesCache: DateEntry[] = [];

function getDates(): DateEntry[] {
  if (datesCache.length > 0) {
    return datesCache;
  }

  const $dates = document.querySelectorAll(".photo-album-date");
  const details = Array.from($dates).flatMap((date: Element) => {
    const minDate = date.getAttribute("data-min-date");
    if (!minDate) {
      return [];
    }

    return [{
      position: date.getBoundingClientRect(),
      minDate: parseInt(minDate, 10),
    }];
  });

  datesCache = details;
  return datesCache;
}

/*
 *
 */
export function YearCursor() {
  return {
    oncreate(vnode: m.VnodeDOM) {
      const onScroll = () => {
        const yearCursor = document.getElementById("year-cursor");
        if (!yearCursor) {
          return;
        }

        // hide if near top of page
        if (globalThis.scrollY < SCROLL_HIDE_THRESHOLD) {
          yearCursor.style.display = "none";
          return;
        }

        yearCursor.style.display = "block";

        const dates = getDates();

        let firstBelowPositionHeight: number | undefined = undefined;
        const row: DateEntry[] = [];

        for (let idx = 0; idx < dates.length; idx++) {
          if (dates[idx].position.top > globalThis.scrollY) {
            if (!firstBelowPositionHeight) {
              firstBelowPositionHeight = dates[idx].position.top;
              row.push(dates[idx]);
            } else if (dates[idx].position.top === firstBelowPositionHeight) {
              row.push(dates[idx]);
            } else {
              break;
            }
          }
        }

        if (row.length === 0) {
          return;
        }

        const minimumDate = Math.min(...row.map((item) => item.minDate));
        const dateSummary = new Date(minimumDate);
        const monthYearString = dateSummary.toLocaleString("default", {
          month: "short",
          year: "numeric",
        } as Intl.DateTimeFormatOptions);

        if (monthYearString !== "Invalid Date") {
          yearCursor.textContent = monthYearString;
        }
      };

      const clearCacheOnResize = () => {
        datesCache = [];
      };

      (vnode.state as any)._onScroll = onScroll;
      (vnode.state as any)._onResize = clearCacheOnResize;

      globalThis.addEventListener("scroll", onScroll, { passive: true });
      globalThis.addEventListener("resize", clearCacheOnResize, {
        passive: true,
      });
    },

    onremove(vnode: m.VnodeDOM) {
      const state = vnode.state as any;
      if (state && state._onScroll) {
        globalThis.removeEventListener("scroll", state._onScroll);
      }

      if (state && state._onResize) {
        globalThis.removeEventListener("resize", state._onResize);
      }
    },

    view() {
      return m("div#year-cursor");
    },
  };
}
