/* Normalise entity URNs used by semantic derivations. */

export function baseUrn(value: unknown): string {
  return typeof value === "string" ? value.split("?")[0] : "";
}
