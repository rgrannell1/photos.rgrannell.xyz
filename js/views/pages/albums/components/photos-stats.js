import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";
import { Things } from "../../../../services/things.js";
import { KnownThings, KnownRelations } from "../../../../constants.js";

export class PhotosStats extends LitElem {
  static get properties() {
    return {
      albums: { type: Array },
      semantic: { type: Array },
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

  birdsCount(semantic) {
    const birds = semantic
      .filter(([_, relation, value]) => {
        if (!Things.isUrn(value)) {
          return false;
        }

        return relation === KnownRelations.SUBJECT && Things.parseUrn(value).type === KnownThings.BIRD;
      })
      .map(([key, relation, value]) => {
        return Things.parseUrn(value).id;
      });

    const uniqueBirds = new Set(birds);
    return uniqueBirds.size;
  }

  unescoCount(semantic) {
    const unesco = semantic
      .filter(([_, relation, value]) => {
        if (!Things.isUrn(value)) {
          return false;
        }

        return relation === KnownRelations.LOCATION && Things.parseUrn(value).type === KnownThings.UNESCO;
      })
      .map(([key, relation, value]) => {
        return Things.parseUrn(value).id;
      });

    const uniqueLocation = new Set(unesco);
    return uniqueLocation.size;
  }

  mammalCount(semantic) {
    const mammals = semantic
      .filter(([_, relation, value]) => {
        if (!Things.isUrn(value)) {
          return false;
        }

        return relation === KnownRelations.SUBJECT && Things.parseUrn(value).type === KnownThings.MAMMAL;
      })
      .map(([key, relation, value]) => {
        return Things.parseUrn(value).id;
      });

    const uniqueMammals = new Set(mammals);
    return uniqueMammals.size;
  }

  render() {
    return html`
      <p class="photo-stats">${this.imageCount()} photos ·
        ${this.albums.length} albums · ${this.dateRanges()} ·
        ${this.countryCount()} <span title="well, flags">countries</span> ·
        ${this.birdsCount(this.semantic)} bird species ·
        ${this.mammalCount(this.semantic)} mammal species ·
        ${this.unescoCount(this.semantic)} UNESCO sites
      </p>
    `
  }
}

customElements.define("photos-stats", PhotosStats);
