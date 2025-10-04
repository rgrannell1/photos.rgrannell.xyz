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

  handleError(message: string) {
    if (message.includes("Shared canceled")) {
      return;
    }
    alert(message);
  }

  /*
   * Share an image using the Web Share API, if available.
   *
   * @param {string} url the url of the image to share
   */
  async shareImage(url: string) {
    if (!navigator.share) {
      this.handleError("navigator.share not available");
      return;
    }

    this.sharing = true;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        this.handleError(`failed to fetch image! status: ${response.status}`);
        return;
      }

      const blob = await response.blob();
      const file = new File([blob], "image.webp", { type: this.format });
      const shareData: ShareData = {
        files: [file],
        title: "Sharing Image",
      };

      if (!navigator.canShare?.(shareData)) {
        await navigator.share({
          title: "Sharing Image",
          url: this.url,
        });

        return;
      }

      await navigator.share(shareData);
    } catch (error) {
      this.handleError("Error sharing image" + error);
    } finally {
      this.sharing = false;
    }
  }

  render() {
    return html`
    <button class="photo-share-button" ?disabled=${!navigator.share} @click=${
      this.shareImage.bind(this, this.url)
    }>[${this.sharing ? "sharing..." : "share"}]</button>
    `;
  }
}

customElements.define("share-metadata-button", ShareButton);
