import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";

/*
 * Render statistics about the albums
 */
export class PhotosStats extends LitElem {
  render() {
    const $statsData = document.getElementById("stats-data");
    if (!$statsData) {
      console.error("No stats data found");
      return html``;
    }

    const stats = JSON.parse($statsData.innerText);

    return html`
      <p class="photo-stats">${stats.photos} <a href="#/photos">photos</a> ·
        ${stats.albums} albums · ${stats.years} years ·
        ${stats.countries} <a href="#/listing/country">countries</a> ·
        ${stats.bird_species} <a href="#/listing/bird">bird species</a> ·
        ${stats.mammal_species} <a href="#/listing/mammal">mammal species</a> ·
        ${stats.unesco_sites} <a href="#/thing/unesco:*">UNESCO sites</a>
      </p>
    `;
  }
}

customElements.define("photos-stats", PhotosStats);
