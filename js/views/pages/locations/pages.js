import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";
import {
  LOCATION_LATITUDE,
  LOCATION_LONGITUDE,
  LOCATION_ZOOM,
} from "../../../constants.js";

/*
import {
  geoJSON,
  map as createMap,
  tileLayer,
} from "../../../library/leaflet.js";
// note: this is a large import
*/

export class LocationsPage extends LitElem {
  static get properties() {
    return {
      albums: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  firstUpdated() {
    super.firstUpdated();
    const $map = this.querySelector("#map");

    let map = createMap($map).setView(
      [LOCATION_LATITUDE, LOCATION_LONGITUDE],
      LOCATION_ZOOM,
    );

    let urlTemplate = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
    map.addLayer(tileLayer(urlTemplate, { minZoom: 4 }));

    const albums = this.albums.albums();
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
              <div class="photo" onclick="">
                <a href="#/album/${album.id}">
                  <img width="170" height="170" src="${album.cover_thumbnail}"></img>
                </a>
              </div>
            </section>
            `;

            layer.bindPopup(popup);
          },
        }).addTo(map);
      }
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
