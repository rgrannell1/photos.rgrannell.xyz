/* Pure album calculations. */

/* Pure album calculations. */
import type { Album } from "../../types/domain.ts";

/** Returns the calendar year of an album's earliest media date. */
export function albumYear(album: Album): number {
  return new Date(album.minDate).getFullYear();
}
