/*
 * Vendored ThumbHash decoder, ported from evanw/thumbhash (MIT licence).
 * https://github.com/evanw/thumbhash
 *
 * The backend (mirror) encodes each photo as a ThumbHash. This module decodes
 * that hash into a small RGBA placeholder image. The port renames the
 * reference implementation's variables but keeps its maths byte-identical.
 */

export type DecodedThumbHash = {
  width: number;
  height: number;
  rgba: Uint8Array;
};

/*
 * Decode an unpadded-base64 ThumbHash string into its bytes.
 */
export function thumbHashFromBase64(encoded: string): Uint8Array {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);

  for (let idx = 0; idx < binary.length; idx++) {
    bytes[idx] = binary.charCodeAt(idx);
  }

  return bytes;
}

/*
 * Extract the approximate aspect ratio (width / height) of the source image.
 */
export function thumbHashToApproximateAspectRatio(hash: Uint8Array): number {
  const hasAlpha = (hash[2] & 0x80) !== 0;
  const isLandscape = (hash[4] & 0x80) !== 0;
  const lumaLong = hasAlpha ? 5 : 7;
  const lumaShort = hash[3] & 7;
  const lumaX = isLandscape ? lumaLong : lumaShort;
  const lumaY = isLandscape ? lumaShort : lumaLong;

  return lumaX / lumaY;
}

/*
 * Decode a ThumbHash into a small RGBA image via the inverse DCT.
 */
export function thumbHashToRGBA(hash: Uint8Array): DecodedThumbHash {
  const header24 = hash[0] | (hash[1] << 8) | (hash[2] << 16);
  const header16 = hash[3] | (hash[4] << 8);

  const lumaDc = (header24 & 63) / 63;
  const chromaPDc = ((header24 >> 6) & 63) / 31.5 - 1;
  const chromaQDc = ((header24 >> 12) & 63) / 31.5 - 1;
  const lumaScale = ((header24 >> 18) & 31) / 31;
  const hasAlpha = (header24 >> 23) !== 0;

  const chromaPScale = ((header16 >> 3) & 63) / 63;
  const chromaQScale = ((header16 >> 9) & 63) / 63;
  const isLandscape = (header16 >> 15) !== 0;

  const lumaLong = hasAlpha ? 5 : 7;
  const lumaX = Math.max(3, isLandscape ? lumaLong : header16 & 7);
  const lumaY = Math.max(3, isLandscape ? header16 & 7 : lumaLong);

  const alphaDc = hasAlpha ? (hash[5] & 15) / 15 : 1;
  const alphaScale = (hash[5] >> 4) / 15;

  // read the varying factors; chroma is boosted 1.25x to offset quantisation
  const acStart = hasAlpha ? 6 : 5;
  let acIndex = 0;

  const decodeChannel = (countX: number, countY: number, scale: number) => {
    const coefficients: number[] = [];

    for (let coeffY = 0; coeffY < countY; coeffY++) {
      let coeffX = coeffY ? 0 : 1;

      while (coeffX * countY < countX * (countY - coeffY)) {
        const nibble =
          (hash[acStart + (acIndex >> 1)] >> ((acIndex & 1) << 2)) & 15;
        coefficients.push((nibble / 7.5 - 1) * scale);
        acIndex += 1;
        coeffX += 1;
      }
    }

    return coefficients;
  };

  const lumaAc = decodeChannel(lumaX, lumaY, lumaScale);
  const chromaPAc = decodeChannel(3, 3, chromaPScale * 1.25);
  const chromaQAc = decodeChannel(3, 3, chromaQScale * 1.25);
  const alphaAc = hasAlpha ? decodeChannel(5, 5, alphaScale) : [];

  // decode using the inverse DCT into RGBA
  const ratio = thumbHashToApproximateAspectRatio(hash);
  const width = Math.round(ratio > 1 ? 32 : 32 * ratio);
  const height = Math.round(ratio > 1 ? 32 / ratio : 32);

  const rgba = new Uint8Array(width * height * 4);
  const cosinesX: number[] = [];
  const cosinesY: number[] = [];
  const cosineCountX = Math.max(lumaX, hasAlpha ? 5 : 3);
  const cosineCountY = Math.max(lumaY, hasAlpha ? 5 : 3);

  let pixelIdx = 0;
  for (let pixelY = 0; pixelY < height; pixelY++) {
    for (let pixelX = 0; pixelX < width; pixelX++, pixelIdx += 4) {
      let luma = lumaDc;
      let chromaP = chromaPDc;
      let chromaQ = chromaQDc;
      let alpha = alphaDc;

      for (let coeffX = 0; coeffX < cosineCountX; coeffX++) {
        cosinesX[coeffX] = Math.cos(
          (Math.PI / width) * (pixelX + 0.5) * coeffX,
        );
      }
      for (let coeffY = 0; coeffY < cosineCountY; coeffY++) {
        cosinesY[coeffY] = Math.cos(
          (Math.PI / height) * (pixelY + 0.5) * coeffY,
        );
      }

      let lumaIdx = 0;
      for (let coeffY = 0; coeffY < lumaY; coeffY++) {
        const cosineY2 = cosinesY[coeffY] * 2;
        let coeffX = coeffY ? 0 : 1;

        while (coeffX * lumaY < lumaX * (lumaY - coeffY)) {
          luma += lumaAc[lumaIdx] * cosinesX[coeffX] * cosineY2;
          lumaIdx += 1;
          coeffX += 1;
        }
      }

      let chromaIdx = 0;
      for (let coeffY = 0; coeffY < 3; coeffY++) {
        const cosineY2 = cosinesY[coeffY] * 2;

        for (let coeffX = coeffY ? 0 : 1; coeffX < 3 - coeffY; coeffX++) {
          const factor = cosinesX[coeffX] * cosineY2;
          chromaP += chromaPAc[chromaIdx] * factor;
          chromaQ += chromaQAc[chromaIdx] * factor;
          chromaIdx += 1;
        }
      }

      if (hasAlpha) {
        let alphaIdx = 0;
        for (let coeffY = 0; coeffY < 5; coeffY++) {
          const cosineY2 = cosinesY[coeffY] * 2;

          for (let coeffX = coeffY ? 0 : 1; coeffX < 5 - coeffY; coeffX++) {
            alpha += alphaAc[alphaIdx] * cosinesX[coeffX] * cosineY2;
            alphaIdx += 1;
          }
        }
      }

      const blue = luma - (2 / 3) * chromaP;
      const red = (3 * luma - blue + chromaQ) / 2;
      const green = red - chromaQ;

      rgba[pixelIdx] = Math.max(0, 255 * Math.min(1, red));
      rgba[pixelIdx + 1] = Math.max(0, 255 * Math.min(1, green));
      rgba[pixelIdx + 2] = Math.max(0, 255 * Math.min(1, blue));
      rgba[pixelIdx + 3] = Math.max(0, 255 * Math.min(1, alpha));
    }
  }

  return { width, height, rgba };
}
