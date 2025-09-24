import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { property } from "lit/decorators.js";

export class ShareButton extends LitElem {
  @property()
  url: string;

  @property()
  format: string;

  @property({ state: true })
  sharing: boolean;

  /*
   * Share an image using the Web Share API, if available.
   *
   * @param {string} url the url of the image to share
   */
  async shareImage(url: string) {
    if (!navigator.share) {
      console.error("navigator.share not available");
    } else {
      this.sharing = true;

      try {
        const response = await fetch(url);
        const resourceName = (new URL(url)).pathname;

        await navigator.share({
          title: resourceName,
          files: [
            new File([await response.blob()], resourceName, {
              type: this.format,
            }),
          ],
        });
      } catch (error) {
        console.error("Error sharing:", error);
        alert(error);
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
        this.shareImage.bind(this, this.url)
      }>[share]</button>
      `;
    }
  }
}

customElements.define("share-metadata-button", ShareButton);
