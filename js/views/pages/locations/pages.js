import { html, LitElement } from "../../../library/lit.js";

import {
  map as createMap,
  geoJSON,
  marker,
  tileLayer,
} from "../../../library/leaflet.js";

export class LocationsPage extends LitElement {
  static get properties() {
    return {
      vault: { type: Object },
    };
  }
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    super.firstUpdated();
    const $map = this.querySelector("#map");

    let map = createMap($map).setView([51.505, -0.09], 13);

    let urlTemplate = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    map.addLayer(tileLayer(urlTemplate, { minZoom: 4 }));

    const albums = this.vault.albums();
    for (const album of Object.values(albums)) {
      const geolocation = album.geolocation;

      geoJSON(geolocation).addTo(map);

      album.images.forEach((image) => {
        if (!image.location || !image.location.address) {
          return;
        }

        const mark = marker([image.location.latitude, image.location.longitude])
          .addTo(map);
        const popup = `
        <img src="${image.thumbnail_url}" width="150px" />
        `;
        mark.bindPopup(popup);
      });
    }
  }

  render() {
    return html`
    <section>
      <h1>Locations</h1>

      <link rel="stylesheet" href="/css/library/leaflet.css">
      <div id="map"></div>
    </section>
    `;
  }
}

customElements.define("locations-page", LocationsPage);
