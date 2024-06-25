import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: String },
      image: { type: Object }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  /*
   * Share an image using the Web Share API, if available.
   *
   * @param {string} url the url of the image to share
   */
  async shareImage(url) {
    if (!navigator.share) {
      console.error("navigator.share not available");
    } else {
      // note; cors might not work locally
      const response = await fetch(url);
      const resourceName = (new URL(url)).pathname;

      await navigator.share({
        title: resourceName,
        files: [
          new File([await response.blob()], resourceName, {
            type: "image/webp",
          }),
        ],
      });
    }
  }

  /*
   * Render a share button if the Web Share API is available.
   */
  renderShare(url) {
    if (!navigator.share) {
      return html``;
    }

    return html`
    <button class="photo-share-button" @click=${
      this.shareImage.bind(this, url)
    }>[share]</button>
    `;
  }

  render() {
    const photo = this.image;

    const tags = (photo.tags.sort() ?? [])
      .map((tagName) => {
        return html`<li><tag-link tagName="${tagName}"></tag-link></li>`;
      });

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
        ${this.renderShare(photo.image_url)}
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
        <td>${photo.date_time}</td>
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
        <td>ƒ/${photo.focal_length}mm equiv.</td>
      </tr>
      <tr>
        <th class="exif-heading">Shutter Speed</th>
        <td>1 / ${photo.shutter_speed ? Math.round(1 / photo.shutter_speed) : 'Unknown' }</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        <td>${photo.f_number}</td>
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
