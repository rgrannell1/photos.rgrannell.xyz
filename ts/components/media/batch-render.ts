/*
 * Incremental list rendering. The first batch renders synchronously;
 * subsequent batches are scheduled via setTimeout so the browser can paint
 * between each one.
 */

import m from "mithril";

export type BatchRenderer = {
  // number of items currently rendered
  count: () => number;
  // schedule the next batch, if more items remain
  schedule: (total: number) => void;
  // restart from the first batch (e.g when the underlying list changes)
  reset: () => void;
};

/*
 * Create renderer state for one incrementally-rendered list. Call `schedule`
 * from oncreate/onupdate with the list's total length, and slice the list to
 * `count()` in the view.
 */
export function createBatchRenderer(batchSize: number): BatchRenderer {
  let rendered = batchSize;
  let batchScheduled = false;

  function schedule(total: number) {
    if (rendered >= total || batchScheduled) {
      return;
    }

    batchScheduled = true;
    setTimeout(() => {
      rendered = Math.min(rendered + batchSize, total);
      batchScheduled = false;
      m.redraw();
    }, 1);
  }

  function reset() {
    rendered = batchSize;
    batchScheduled = false;
  }

  function count() {
    return rendered;
  }

  return { count, schedule, reset };
}
