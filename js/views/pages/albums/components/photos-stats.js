import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class PhotosStats extends LitElem {
  static get properties() {
    return {
      albums: { type: Array },
    };
  }

  imageCount() {
    return this.albums.reduce((acc, album) => {
      return acc + album.count;
    }, 0);
  }

  countryCount() {
    const flags = new Set();
    this.albums.forEach((album) => {
      for (const flag of album.flags) {
        flags.add(flag);
      }
    });

    return flags.size;
  }

  dateRanges() {
    const [minDate, maxDate] = this.albums.reduce(([currMin, currMax], album) => {
      console.log(album.flags)
      return [
        Math.min(currMin, album.minDate),
        Math.max(currMax, album.maxDate)
      ]
    }, [+Infinity, -Infinity])

    const minYear = new Date(minDate).getFullYear();
    const maxYear = new Date(maxDate).getFullYear();

    const elapsed = maxYear - minYear;

    return html`
      ${elapsed} years
    `;
  }

  render() {
    return html`
      <p class="photo-count">${this.imageCount()} photos ·
        ${this.albums.length} albums · ${this.dateRanges()} ·
        ${this.countryCount()} <span title="well, flags">countries</span>
        </p>
      </p>
    `
  }
}

customElements.define("photos-stats", PhotosStats);
