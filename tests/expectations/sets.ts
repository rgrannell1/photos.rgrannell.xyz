/* Set expectations shared by property tests. */

export function expectSetsEqual(
  actual: Set<string>,
  expected: Set<string>,
  context: string,
): void {
  const actualValues = [...actual].sort();
  const expectedValues = [...expected].sort();

  if (JSON.stringify(actualValues) !== JSON.stringify(expectedValues)) {
    throw new Error(
      `${context}: expected ${JSON.stringify(expectedValues)}, ` +
        `received ${JSON.stringify(actualValues)}`,
    );
  }
}
