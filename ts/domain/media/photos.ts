/* Pure photo grouping and date calculations. */

/* Pure photo grouping and date calculations. */
import type { Photo } from "../../types/domain.ts";

export function photoYear(photo: Photo): number {
  return new Date(parseInt(photo.createdAt)).getFullYear();
}

export type PhotoYearGroup = {
  year: number;
  showHeading: boolean;
  photos: Photo[];
};

/* Undated photos join the run above. They do not start one. */
export function groupPhotosByYear(
  photos: Photo[],
  currentYear: number,
): PhotoYearGroup[] {
  const groups: PhotoYearGroup[] = [];

  for (const photo of photos) {
    const year = photoYear(photo);
    const lastGroup = groups[groups.length - 1];
    const isUndated = !Number.isFinite(year);
    const matchesLastYear = lastGroup?.year === year;
    const continuesYearGroup = lastGroup !== undefined &&
      (matchesLastYear || isUndated);

    if (continuesYearGroup) {
      lastGroup.photos.push(photo);
      continue;
    }

    const showHeading = Number.isFinite(year) && year !== currentYear;
    groups.push({ year, showHeading, photos: [photo] });
  }

  return groups;
}
