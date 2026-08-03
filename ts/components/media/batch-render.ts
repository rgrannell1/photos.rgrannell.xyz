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

type BatchState = {
  // items rendered so far
  rendered: number;
  // whether the next batch is already queued
  batchScheduled: boolean;
  // items added per batch
  batchSize: number;
};

function growBatch(batchState: BatchState, total: number): void {
  batchState.rendered = Math.min(
    batchState.rendered + batchState.batchSize,
    total,
  );
  batchState.batchScheduled = false;
  m.redraw();
}

function scheduleBatch(batchState: BatchState, total: number): void {
  if (batchState.rendered >= total || batchState.batchScheduled) {
    return;
  }

  batchState.batchScheduled = true;
  setTimeout(growBatch.bind(null, batchState, total), 1);
}

function resetBatch(batchState: BatchState): void {
  batchState.rendered = batchState.batchSize;
  batchState.batchScheduled = false;
}

function countBatch(batchState: BatchState): number {
  return batchState.rendered;
}

/*
 * Create renderer state for one incrementally-rendered list. Call `schedule`
 * from oncreate/onupdate with the list's total length, and slice the list to
 * `count()` in the view.
 */
export function createBatchRenderer(batchSize: number): BatchRenderer {
  const batchState: BatchState = {
    rendered: batchSize,
    batchScheduled: false,
    batchSize,
  };

  return {
    count: countBatch.bind(null, batchState),
    schedule: scheduleBatch.bind(null, batchState),
    reset: resetBatch.bind(null, batchState),
  };
}
