
/*
 * Ensure a numberish value is an integer.
 */
export function asInt(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  return parseInt(value, 10);
}
