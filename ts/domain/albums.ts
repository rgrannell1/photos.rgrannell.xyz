/* Pure album calculations. */

import type { Album } from "../types/domain.ts";

export function albumYear(album: Album): number {
  return new Date(album.minDate).getFullYear();
}
