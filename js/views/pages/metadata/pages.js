import { html, unsafeHTML } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";
import { Dates } from "../../../services/dates.js"

import "./components/share-button.js";
import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      image: { type: Object },
      sharing: { state: true, type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  render() {
    const photo = this.image;

    const tags = (photo.tags.sort() ?? [])
      .filter((tag) => tag !== "Published" && !tag.includes('⭐'))
      .sort()
      .map((tagName) => {
        return html`<li><tag-link tagName="${tagName}"></tag-link></li>`;
      });

    const dateHref = photo.date_time.split(" ")[0].replace(/\:/g, "-");

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
        <share-metadata-button format="image/webp" url=${photo.image_url}></share-metadata-button>
      </p>

      ${photo.description ? html`<br/><p>${unsafeHTML(photo.description)}</p>` : html``}

      <h3>Rating</h3>
      <p>${ photo.rating ?? 'unrated' }</p>

      <h3>Photo Subject</h3>
      <p>${ photo.subject ?? '' }</p>

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
        <td><time><a href="#/date/${dateHref}">
        ${Dates.formatExifDate(photo.date_time)}
        </a></time></td>
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
        ${
          photo.focal_length === 'Unknown'
            ? html`${photo.focal_length}`
            : html`<td>${photo.focal_length}mm equiv.</td>`
        }
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1 / ${
      photo.shutter_speed ? Math.round(1 / photo.shutter_speed) : "Unknown"
    }</td>
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
