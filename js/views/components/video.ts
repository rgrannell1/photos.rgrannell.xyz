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
  urlPoster: string;

  @property()
  urlUnscaled!: string;
  @property()
  url1080p!: string;
  @property()
  url720p!: string;
  @property()
  url480p!: string;

  render() {
    return html`
    <div>
      <video controls class="thumbnail-video" preload="${this.preload}" poster=${this.urlPoster}>
        <source src="${this.url480p}" type="video/mp4">
      </video>
      <ul>
        <a href="${this.urlUnscaled}">[L]</a>
        <a href="${this.url1080p}">[M]</a>
        <a href="${this.url720p}">[S]</a>
        <a href="${this.url480p}">[XS]</a>
      </ul>

    </div>
    `;
  }
}

customElements.define("app-video", AppVideo);
