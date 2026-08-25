/* Characterise the place popup markup used by Leaflet markers. */

import type { GeocodedPlaceWithCover } from "../ts/services/places.ts";
import { placePopupHtml } from "../ts/services/map-markers.ts";

function assertEquals(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`expected ${expected}, got ${actual}`);
  }
}

type PopupTestCase = {
  name: string;
  place: GeocodedPlaceWithCover;
  expected: string;
};

const TEST_CASES: PopupTestCase[] = [
  {
    name: "shows a named place without a thumbnail",
    place: {
      id: "urn:ró:place:1",
      type: "place",
      name: "Dublin",
      latitude: 53.35,
      longitude: -6.26,
      coverThumbnailUrl: undefined,
    },
    expected: `<a href="#/thing/place:1">Dublin</a>`,
  },
  {
    name: "shows the fallback label and thumbnail",
    place: {
      id: "urn:ró:place:2",
      type: "place",
      name: "",
      latitude: 0,
      longitude: 0,
      coverThumbnailUrl: "https://example.test/thumb.webp",
    },
    expected: `<img src="https://example.test/thumb.webp" alt="" ` +
      `class="leaflet-popup-thumbnail" loading="lazy" /><br />` +
      `<a href="#/thing/place:2">Unknown Place</a>`,
  },
];

for (const testCase of TEST_CASES) {
  Deno.test(`placePopupHtml: ${testCase.name}`, () => {
    const actual = placePopupHtml(testCase.place);
    assertEquals(actual, testCase.expected);
  });
}
