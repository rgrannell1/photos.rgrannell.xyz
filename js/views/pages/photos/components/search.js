import { html } from "../../../../library/lit.js";
import { LitElem } from "../../../../models/lit-element.js";

export class SearchBar extends LitElem {
  render() {
    return html`
    <div class="search-box">
      <input type="text" placeholder="Search...">
    </div>
    `;
  }
}

customElements.define("search-bar", SearchBar);
