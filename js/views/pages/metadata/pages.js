import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "./components/share-button.js";
import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      image: { type: Object },
      sharing: { state: true, type: Boolean }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    const photo = this.image;
    const tags = (photo.tags.sort() ?? [])
      .filter(tag => tag !== 'Published')
      .sort()
      .map((tagName) => {
        return html`<li><tag-link tagName="${tagName}"></tag-link></li>`;
      });

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
        <share-metadata-button format="image/webp" url=${photo.image_url}></share-metadata-button>
      </p>

      ${photo.description ? html`<br/><p>${photo.description}</p>` : html``}

      <h3>Tags</h3>
      <ul class="photo-tag-list">${tags}</ul>

      <h3>Exif</h3>

    <table class="metadata-table">
      <tr>
        <th class="exif-heading" title="The variance of the image's laplacian; one measure of blur. Bigger is sharper.">Blur</th>
        <td>${photo.blur}</td>
      </tr>
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td><time>${photo.date_time}</time></td>
      </tr>
      <tr>
        <th class="exif-heading">Camera Model</th>
        <td>${photo.model}</td>
        </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${photo.width} x ${photo.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        <td>${photo.focal_length}mm equiv.</td>
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1 / ${photo.shutter_speed ? Math.round(1 / photo.shutter_speed) : 'Unknown' }</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        <td>ƒ/${photo.f_number}</td>
      </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${photo.iso}</td>
      </tr>
    </table>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
