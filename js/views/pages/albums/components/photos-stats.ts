import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.ts";

export class PhotosStats extends LitElem {
  static get properties() {
    return {
      albums: { type: Array },
      stats: { type: Array },
    };
  }

  render() {
    return html`
      <p class="photo-stats">${this.stats.photos} <a href="#/photos">photos</a> ·
        ${this.stats.albums} albums · ${this.stats.years} years ·
        ${this.stats.countries} <span title="well, roughly">countries</span> ·
        ${this.stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${this.stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${this.stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `;
  }
}

customElements.define("photos-stats", PhotosStats);
