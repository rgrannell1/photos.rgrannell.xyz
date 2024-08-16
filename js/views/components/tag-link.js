import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class TagLink extends LitElem {
  static get properties() {
    return {
      tagName: { type: String },
      count: { type: Number },
    };
  }

  render() {
    const { tagName, count } = this;
    const encodedTagName = encodeURIComponent(tagName);

    if (typeof count === "undefined") {
      return html`<a
        href="#/tag/${encodedTagName}"
        @click=${this.broadcast("click-tag", { tagName })}>${tagName}</a>`;
    }

    return html`<a
      href="#/tag/${encodedTagName}"
      rel="tag"
      @click=${
      this.broadcast("click-tag", { tagName })
    }>${tagName}</a> (${count})`;
  }
}

customElements.define("tag-link", TagLink);
