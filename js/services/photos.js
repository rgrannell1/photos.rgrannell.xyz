export class Photos {
  static loadingMode(idx) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const imageDimension = 400;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold) ? "lazy" : "eager";
  }
}
