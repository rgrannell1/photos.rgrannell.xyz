/* Incremental list rendering. The first batch is synchronous. Later batches run
 * via setTimeout so the browser can paint between them. */

import m from "mithril";

export type BatchRenderer = {
  count: () => number;
  schedule: (total: number) => void;
  // Restart when the underlying list changes.
  reset: () => void;
};

type BatchState = {
  rendered: number;
  batchScheduled: boolean;
  batchSize: number;
};

function growBatch(batchState: BatchState, total: number): void {
  const batchSize = batchState.batchSize;
  const rendered = Math.min(batchState.rendered + batchSize, total);
  batchState.rendered = rendered;
  batchState.batchScheduled = false;
  m.redraw();
}

function canScheduleBatch(batchState: BatchState, total: number): boolean {
  const hasRenderedAll = batchState.rendered >= total;
  return !hasRenderedAll && !batchState.batchScheduled;
}

function scheduleBatch(batchState: BatchState, total: number): void {
  const isReady = canScheduleBatch(batchState, total);
  if (!isReady) {
    return;
  }

  batchState.batchScheduled = true;
  const grow = growBatch.bind(null, batchState, total);
  setTimeout(grow, 1);
}

function resetBatch(batchState: BatchState): void {
  batchState.rendered = batchState.batchSize;
  batchState.batchScheduled = false;
}

function countBatch(batchState: BatchState): number {
  return batchState.rendered;
}

function bindBatchRenderer(batchState: BatchState): BatchRenderer {
  const count = countBatch.bind(null, batchState);
  const schedule = scheduleBatch.bind(null, batchState);
  const reset = resetBatch.bind(null, batchState);
  return { count, schedule, reset };
}

function createBatchState(batchSize: number): BatchState {
  const state: BatchState = {
    rendered: batchSize,
    batchScheduled: false,
    batchSize,
  };
  return state;
}

/* Call `schedule` from oncreate/onupdate with the list total, slice to `count()` in the view. */
export function createBatchRenderer(batchSize: number): BatchRenderer {
  const batchState = createBatchState(batchSize);
  return bindBatchRenderer(batchState);
}
