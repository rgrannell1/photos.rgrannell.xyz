/* Photo component redraw boundary tests. */

import { hasPhotoChanged, type PhotoAttrs } from "../ts/components/media/photo.ts";
import type { Photo } from "../ts/types.ts";

const photo = {} as Photo;
const base: PhotoAttrs = { photo, loading: "lazy", interactive: true };

const CASES = [
  { name: "skips stable attrs", attrs: base, expected: false },
  {
    name: "updates a new photo",
    attrs: { ...base, photo: {} as Photo },
    expected: true,
  },
  {
    name: "updates loading mode",
    attrs: { ...base, loading: "eager" as const },
    expected: true,
  },
];

for (const testCase of CASES) {
  Deno.test(`hasPhotoChanged: ${testCase.name}`, () => {
    const actual = hasPhotoChanged(testCase.attrs, base);
    if (actual !== testCase.expected) {
      throw new Error(`expected ${testCase.expected}, got ${actual}`);
    }
  });
}
