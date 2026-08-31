/* Support passes operations. */

/* Support passes operations. */
import type { DerivationPass, PassOrderState } from "./passes.ts";

/** Collects the unique names declared by derivation passes. */
export function collectPassNames(passes: DerivationPass[]): Set<string> {
  const names = passes.map(readPassName);
  return new Set(names);
}

/** Rejects a pass that names an unknown dependency. */
export function validatePassDependencies(
  pass: DerivationPass,
  passNames: Set<string>,
): void {
  const passName = pass.name;
  for (const dependency of pass.after) {
    const isKnown = passNames.has(dependency);
    if (!isKnown) {
      throw new Error(
        `pass "${passName}" depends on unknown pass "${dependency}"`,
      );
    }
  }
}

/** Validates every dependency name before pass ordering starts. */
export function validatePasses(passes: DerivationPass[]): void {
  const passNames = collectPassNames(passes);
  for (const pass of passes) {
    validatePassDependencies(pass, passNames);
  }
}

/** Reports whether all dependencies for a pass have completed. */
export function isPassReady(
  pass: DerivationPass,
  completed: Set<string>,
): boolean {
  const dependenciesComplete = pass.after.every(completed.has.bind(completed));
  return dependenciesComplete;
}

/** Finds the first pass whose dependencies have completed. */
export function findReadyPassIndex(state: PassOrderState): number {
  for (let idx = 0; idx < state.remaining.length; idx++) {
    const pass = state.remaining[idx];
    if (isPassReady(pass, state.completed)) {
      return idx;
    }
  }
  return -1;
}

/** Reads a derivation pass name for collection operations. */
export function readPassName(pass: DerivationPass): string {
  return pass.name;
}

/** Reports the passes trapped in a dependency cycle. */
export function throwCyclicPassError(remaining: DerivationPass[]): never {
  const names = remaining.map(readPassName);
  const stuck = names.join(", ");
  throw new Error(`cyclic pass dependencies among: ${stuck}`);
}

/** Removes and returns the ready pass, or rejects a dependency cycle. */
export function takeReadyPass(
  state: PassOrderState,
  readyIdx: number,
): DerivationPass {
  const hasNoReadyPass = readyIdx === -1;
  if (hasNoReadyPass) {
    throwCyclicPassError(state.remaining);
  }
  const [ready] = state.remaining.splice(readyIdx, 1);
  return ready;
}

/** Creates mutable state for dependency-based pass ordering. */
export function createPassOrderState(passes: DerivationPass[]): PassOrderState {
  const ordered: DerivationPass[] = [];
  const completed = new Set<string>();
  const remaining = [...passes];
  return {
    ordered,
    completed,
    remaining,
  };
}

/** Moves the next ready pass into the completed order. */
export function orderNextPass(state: PassOrderState): void {
  const readyIdx = findReadyPassIndex(state);
  const ready = takeReadyPass(state, readyIdx);
  state.ordered.push(ready);
  state.completed.add(ready.name);
}
