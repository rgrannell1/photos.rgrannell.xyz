import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import {
  map as createMap,
  geoJSON,
  marker,
  tileLayer,
} from "../../../library/leaflet.js";

export class LocationsPage extends LitElem {
  static get properties() {
    return {
      vault: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  firstUpdated() {
    super.firstUpdated();
    const $map = this.querySelector("#map");

    let map = createMap($map).setView([53.33306, -6.24889], 6);

    let urlTemplate = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    map.addLayer(tileLayer(urlTemplate, { minZoom: 4 }));

    const albums = this.vault.albums();
    for (const album of Object.values(albums)) {
      const geolocation = album.geolocation;

      if (geolocation) {
        geoJSON(geolocation, {
          style: function () {
            return { color: "red" };
          },
          onEachFeature: (feature, layer) => {
            const popup = `
            <section>
              <h3>${album.name}</h3>
              <div class="photo"
                onclick="  "></img>
              </div>
            </section>
            `;

            layer.bindPopup(popup);
          }
        }).addTo(map);
      }

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
