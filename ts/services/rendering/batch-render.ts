/* Render lists in timed batches so the browser can paint between updates. */

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

/** Grow the visible item count by one batch and request a redraw. */
function growBatch(batchState: BatchState, total: number): void {
  const batchSize = batchState.batchSize;
  const rendered = Math.min(batchState.rendered + batchSize, total);
  batchState.rendered = rendered;
  batchState.batchScheduled = false;
  m.redraw();
}

/** Report whether more items remain and no batch is pending. */
function canScheduleBatch(batchState: BatchState, total: number): boolean {
  const hasRenderedAll = batchState.rendered >= total;
  return !hasRenderedAll && !batchState.batchScheduled;
}

/** Schedule one asynchronous batch when more items remain. */
function scheduleBatch(batchState: BatchState, total: number): void {
  const isReady = canScheduleBatch(batchState, total);
  if (!isReady) {
    return;
  }

  batchState.batchScheduled = true;
  const grow = growBatch.bind(null, batchState, total);
  setTimeout(grow, 1);
}

/** Restore the initial visible batch and clear pending state. */
function resetBatch(batchState: BatchState): void {
  batchState.rendered = batchState.batchSize;
  batchState.batchScheduled = false;
}

/** Read the current visible item count. */
function countBatch(batchState: BatchState): number {
  return batchState.rendered;
}

/** Bind the public renderer operations to one batch state. */
function bindBatchRenderer(batchState: BatchState): BatchRenderer {
  const count = countBatch.bind(null, batchState);
  const schedule = scheduleBatch.bind(null, batchState);
  const reset = resetBatch.bind(null, batchState);
  return { count, schedule, reset };
}

/** Initialise batch state with the first batch already visible. */
function createBatchState(batchSize: number): BatchState {
  const state: BatchState = {
    rendered: batchSize,
    batchScheduled: false,
    batchSize,
  };
  return state;
}

/* Call `schedule` from oncreate/onupdate with the list total, slice to `count()` in the view. */
/** Create a stateful renderer that reveals list items in timed batches. */
export function createBatchRenderer(batchSize: number): BatchRenderer {
  const batchState = createBatchState(batchSize);
  return bindBatchRenderer(batchState);
}
