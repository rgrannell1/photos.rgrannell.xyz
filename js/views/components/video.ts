import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { property } from "lit/decorators.js";

export class AppVideo extends LitElem {
  @property()
  override id: string;

  @property()
  url: string;

  @property()
  preload: string;

  @property()
  url_poster: string;

  @property()
  url_unscaled!: string;
  @property()
  url_1080p!: string;
  @property()
  url_720p!: string;
  @property()
  url_480p!: string;

  render() {
    return html`
    <div>
      <video controls class="thumbnail-video" preload="${this.preload}" poster=${this.url_poster}>
        <source src="${this.url_480p}" type="video/mp4">
      </video>
      <ul>
        <a href="${this.url_unscaled}">[L]</a>
        <a href="${this.url_1080p}">[M]</a>
        <a href="${this.url_720p}">[S]</a>
        <a href="${this.url_480p}">[XS]</a>
      </ul>

    </div>
    `;
  }
}

customElements.define("app-video", AppVideo);
