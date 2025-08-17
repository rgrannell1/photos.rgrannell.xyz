/*
 * Utility classes for dealing with videos
 */

export class Videos {
  /*
   * Determine whether a photo should be eagerly or lazily loaded
   * depending on page position
   */
  static loadingMode(idx: number) {
    // mmhh, I just want length and the first frame
    //something more sophisticated is needed to reduce parallel requests
    return idx === 0 ? "auto" : "none";
  }
}
