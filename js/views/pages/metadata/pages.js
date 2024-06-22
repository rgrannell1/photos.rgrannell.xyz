import { html } from "../../../library/lit.js";
import { LitElem } from "../../../models/lit-element.js";
import { JSONFeed } from "../../../services/json-feed.js";

import "../../components/tag-link.js";

export class MetadataPage extends LitElem {
  static get properties() {
    return {
      id: { type: Number },
      vault: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    JSONFeed.setIndex();
  }

  photo() {
    if (!this.id) {
      throw new Error("metadata: requires id");
    }
    for (const album of Object.values(this.vault.albums())) {
      for (const image of album.images) {
        if (parseInt(image.id) === this.id) {
          return image;
        }
      }
    }
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
    <button class="photo-share-button" @click=${this.shareImage.bind(this, url)}>[share]</button>
    `;
  }

  render() {
    const photo = this.photo();

    const tags = (photo.tags.sort() ?? [])
      .filter((tagName) => {
        return tagName !== "Published";
      })
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
        <td>${photo.exif.blur}</td>
      </tr>
      <tr>
        <th class="exif-heading">Date-Time</th>
        <td>${photo.exif.date_time}</td>
      </tr>
      <tr>
        <th class="exif-heading">Camera Model</th>
        <td>${photo.exif.model}</td>
      </tr>
      <tr>
        <th class="exif-heading">Aperture</th>
        <td>${photo.exif.f_number}</td>
      </tr>
      <tr>
        <th class="exif-heading">Focal Length</th>
        <td>${photo.exif.focal_length}mm equiv.</td>
      </tr>
      <tr>
        <th class="exif-heading">Dimensions</th>
        <td>${photo.exif.width} x ${photo.exif.height}</td>
      </tr>
      <tr>
        <th class="exif-heading">ISO</th>
        <td>${photo.exif.iso}</td>
      </tr>
    </table>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
