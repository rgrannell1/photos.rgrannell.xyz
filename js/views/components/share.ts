import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { property } from "lit/decorators.js";

export class AlbumShareButton extends LitElem {
  @property()
  override title: string;

  @property()
  url: string;

  @property({ state: true })
  sharing: boolean;

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
