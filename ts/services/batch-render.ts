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

/* Call `schedule` from oncreate/onupdate with the list total, slice to `count()` in the view. */
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
