import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.ts";

export class AlbumShareButton extends LitElem {
  override title!: string;
  url!: string;
  sharing!: boolean;

  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      sharing: { state: true, type: Boolean },
    };
  }

  /*
   * Share an image using the Web Share API, if available.
   *
   * @param {string} url the url of the image to share
   */
  async shareAlbum(url: string) {
    if (!navigator.share) {
      console.error("navigator.share not available");
    } else {
      this.sharing = true;

      try {
        await navigator.share({
          title: `${this.title} - photos.rgrannell.xyz`,
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      } finally {
        this.sharing = false;
      }
    }
  }

  render() {
    if (this.sharing) {
      return html`<button class="photo-share-button" disabled>[sharing...]</button>`;
    } else {
      return html`
      <button class="photo-share-button" ?disabled=${!navigator.share} @click=${
        this.shareAlbum.bind(this, this.url)
      }>[share]</button>
      `;
    }
  }
}

customElements.define("album-share-button", AlbumShareButton);
