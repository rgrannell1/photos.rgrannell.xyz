/*
 * Tests for the vendored ThumbHash decoder against vectors produced by the
 * backend (mirror) encoder, proving the two ends stay format-compatible.
 */

import {
  thumbHashFromBase64,
  thumbHashToApproximateAspectRatio,
  thumbHashToRGBA,
} from "../ts/vendor/thumbhash.ts";

// Encoded by mirror's PhotoEncoder.encode_thumbhash. `average` is the
// average RGBA reported by the Python thumbhash library, each channel 0-1.
const VECTORS = [
  {
    name: "gradient-landscape",
    hash: "FfYCnZqHh4h4iIePeGeIdn+I94h3",
    average: [0.5, 0.0079, 0.4921, 1.0],
    isLandscape: true,
  },
  {
    name: "solid-portrait",
    hash: "l+kABABnh4h4iHd393ePiwiflw",
    average: [0.1561, 0.7116, 0.2275, 1.0],
    isLandscape: false,
  },
];

function averageChannels(rgba: Uint8Array): number[] {
  const sums = [0, 0, 0, 0];
  const pixelCount = rgba.length / 4;

  for (let idx = 0; idx < rgba.length; idx += 4) {
    sums[0] += rgba[idx];
    sums[1] += rgba[idx + 1];
    sums[2] += rgba[idx + 2];
    sums[3] += rgba[idx + 3];
  }

  return sums.map((sum) => sum / pixelCount / 255);
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

Deno.test("decoded thumbhash matches the backend encoder's average colour", () => {
  for (const vector of VECTORS) {
    const bytes = thumbHashFromBase64(vector.hash);
    const { width, height, rgba } = thumbHashToRGBA(bytes);

    assert(width > 0 && height > 0, `${vector.name}: empty decode`);
    assert(rgba.length === width * height * 4, `${vector.name}: rgba size mismatch`);

    const decodedAverage = averageChannels(rgba);
    for (let channel = 0; channel < 4; channel++) {
      const drift = Math.abs(decodedAverage[channel] - vector.average[channel]);
      assert(
        drift < 0.15,
        `${vector.name}: channel ${channel} drift ${drift.toFixed(3)}`,
      );
    }
  }
});

Deno.test("decoded thumbhash keeps the source orientation", () => {
  for (const vector of VECTORS) {
    const bytes = thumbHashFromBase64(vector.hash);
    const ratio = thumbHashToApproximateAspectRatio(bytes);
    const { width, height } = thumbHashToRGBA(bytes);

    assert((ratio > 1) === vector.isLandscape, `${vector.name}: wrong aspect ratio`);
    assert((width > height) === vector.isLandscape, `${vector.name}: wrong decode shape`);
  }
});

Deno.test("gradient thumbhash keeps its left-to-right colour direction", () => {
  const bytes = thumbHashFromBase64(VECTORS[0].hash);
  const { width, height, rgba } = thumbHashToRGBA(bytes);

  let leftRed = 0;
  let rightRed = 0;
  let leftBlue = 0;
  let rightBlue = 0;

  for (let row = 0; row < height; row++) {
    const leftIdx = row * width * 4;
    const rightIdx = (row * width + width - 1) * 4;
    leftRed += rgba[leftIdx];
    rightRed += rgba[rightIdx];
    leftBlue += rgba[leftIdx + 2];
    rightBlue += rgba[rightIdx + 2];
  }

  assert(leftRed > rightRed, "red should fade left to right");
  assert(rightBlue > leftBlue, "blue should grow left to right");
});
