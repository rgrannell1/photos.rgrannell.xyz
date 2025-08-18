import { STATS_SYMBOL } from "js/constants.js";
import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.ts";

export class PhotosStats extends LitElem {
  static get properties() {
    return {
      albums: { type: Array },
    };
  }

  render() {
    const $statsData = document.getElementById("stats-data");
    const stats = JSON.parse($statsData.innerText);

    return html`
      <p class="photo-stats">${stats.photos} <a href="#/photos">photos</a> ·
        ${stats.albums} albums · ${stats.years} years ·
        ${stats.countries} <span title="well, roughly">countries</span> ·
        ${stats.bird_species} <a href="#/thing/bird:*">bird species</a> ·
        ${stats.mammal_species} <a href="#/thing/mammal:*">mammal species</a> ·
        ${stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `;
  }
}

customElements.define("photos-stats", PhotosStats);
