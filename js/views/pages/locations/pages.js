import { html, LitElement } from "../../../library/lit.js";

import { map as createMap, tileLayer, marker } from "../../../library/leaflet.js";

const albums = await (await fetch("/manifest.json")).json();

export class LocationsPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    super.firstUpdated();
    const $map = this.querySelector('#map');

    let map = createMap($map).setView([51.505, -0.09], 13);

    let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    map.addLayer(tileLayer(urlTemplate, {minZoom: 4}));

    for (const album of Object.values(albums)) {
      album.images.forEach(image => {
        if (!image.location || !image.location.address) {
          return;
        };

        console.log(image.location.latitude, image.location.longitude)

          console.log(image.thumbnail_url)

        const mark = marker([image.location.latitude, image.location.longitude]).addTo(map);
        const popup = `
        <img src="${image.thumbnail_url}" width="150px" />
        `
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
