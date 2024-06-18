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
      throw new Error('metadata: requires id')
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
   *
   */
  async shareImage(url) {
    if (!navigator.share) {
      alert('navigator.share not available');
    } else {
      // note; cors might not work locally
      const response = await fetch(url);
      const resourceName = (new URL(url)).pathname;

      await navigator.share({
        title: resourceName,
        files: [new File([await response.blob()], resourceName, {
          type: 'image/webp'
        })]
      });
    }
  }

  renderShare(url) {
    if (!navigator.share) {
      return html``;
    }

    return html`
    <button @click=${ this.shareImage.bind(this, url) }>Share</button>
    `;
  }

  render() {
    const photo = this.photo();

    const tags = (photo.tags.sort() ?? [])
      .filter(tagName => {
        return tagName !== "Published";
      })
      .map((tagName) => {
        return html`<li><tag-link tagName="${ tagName }"></tag-link></li>`;
      });

    return html`
    <section>
    <h1>Metadata</h1>

    <img class="thumbnail-image" src="${photo.thumbnail_url}"/>

      <p>
        <a href="${photo.image_url}">[full image]</a>
      </p>


      ${this.renderShare(photo.image_url)}

      ${
        photo.description ? html`<br/><p>${photo.description}</p>` : html``
      }

      <h3>Tags</h3>
      <ul class="metadata-list">${tags}</ul>

      <h3>Exif</h3>

      <ul class="metadata-list">
        <li>
          <p title="The variance of the image's laplacian; one measure of blur. Bigger is sharper.">Blur: ${photo.exif.blur}</p>
        </li>
        <li>
          <p>Date-Time: ${photo.exif.date_time}</p>
        </li>
        <li>
          <p>Camera Model: ${photo.exif.model}</p>
        </li>
        <li>
          <p>Aparture: ${photo.exif.f_number}</p>
        </li>
        <li>
          <p>Focal Length: ${photo.exif.focal_length}mm equiv.</p>
        </li>
        <li>
          <p>Dimensions: ${photo.exif.width} x  ${photo.exif.height}</p>
        </li>
        <li>
          <p>ISO: ${photo.exif.iso}</p>
        </li>
      </ul>

    </section>
    `;
  }
}

customElements.define("metadata-page", MetadataPage);
