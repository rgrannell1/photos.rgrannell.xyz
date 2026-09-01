/* Normalise entity URNs used by semantic derivations. */

/** Removes an optional query suffix from a string URN. */
export function stripUrnQuery(value: unknown): string {
  return typeof value === "string" ? value.split("?")[0] : "";
}
