/* Expectations for keyed state transitions. */

export function calculateRunCount<Key extends PropertyKey | undefined>(
  values: Key[],
): number {
  let runCount = 0;
  let previous: Key | undefined;
  let hasPrevious = false;

  for (const value of values) {
    if (!hasPrevious || value !== previous) runCount++;
    previous = value;
    hasPrevious = true;
  }
  return runCount;
}

export function expectOneReadPerRun(
  actualReads: number,
  keys: string[],
  context: string,
): void {
  const expectedReads = calculateRunCount(keys);
  if (actualReads !== expectedReads) {
    throw new Error(
      `${context}: expected ${expectedReads} reads, received ${actualReads}`,
    );
  }
}
