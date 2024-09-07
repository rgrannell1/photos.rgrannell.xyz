export class Videos {
  /*
   * Determine whether a photo should be eagerly or lazily loaded
   * depending on page position
   */
  static loadingMode(idx) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const imageDimension = 400;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    const belowTheFold = idx > (maxImagesPerRow * maxRowsInFold) + 1;

    // mmhh, I just want length and the first frame
    //something more sophisticated is needed to reduce parallel requests
    return idx === 0 ? "auto" : "none";
  }
}
