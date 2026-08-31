/* Normalise entity URNs used by semantic derivations. */

/** Remove an optional query suffix from a string URN. */
export function baseUrn(value: unknown): string {
  return typeof value === "string" ? value.split("?")[0] : "";
}
