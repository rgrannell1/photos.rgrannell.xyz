import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { BRAND_TEXT } from "../../constants.js";
import { property } from "lit/decorators.js";

export class PhotoHeader extends LitElem {
  @property()
  darkMode: boolean = false;

  feedUrl() {
    return `/manifest/atom/atom-index.xml`;
  }

  renderRss() {
    return html`
    <li class="rss-tag" style="float: right">
      <a id="rss" title="rss" href="${this.feedUrl()}">
        <svg alt="rss" width="25px" height="25px" viewBox="0 0 32 32" style="position: relative; top: 5px;">
        <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
        </svg>
      </a>
    </li>
    `;
  }

  render() {
    const text = this.darkMode ? "☀️" : "🌙";
    const brandText = BRAND_TEXT;

    return html`
    <nav class="header" role="navigation">
      <ul>
      <li @click=${this.broadcast("click-burger-menu")}>
      <a><span class="burger">Ξ</span></a>
      </li>
      <li><a href="/"><span class="brand">${brandText}</span></a></li>
      ${this.renderRss()}
      <li style="float: right">
      <a>
      <span @click=${
      this.broadcast("switch-theme")
    } class="brand switch">${text}</span>
      </a>
      </li>

      </ul>
    </nav>
    `;
  }
}

customElements.define("photo-header", PhotoHeader);
