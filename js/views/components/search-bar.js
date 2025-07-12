import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class SearchBar extends LitElem {
  static get properties() {
    return {
      entity: { type: String },
      content: { type: Array },
    };
  }

  broadcastQuery(event) {
    const searchQuery = document.querySelector("#search");

    const dispatched = new CustomEvent("search-query", {
      detail: { query: searchQuery.value },
      bubbles: true,
      composed: true,
    });

    this.dispatchEvent(dispatched);
  }

  render() {
    // TODO; search
    // TODO; highlight queries and suggest syntax
    // TODO; actually perform the search, ideally in another thread
    // TODO; render the content in place on the albums and photos page
    // TODO: wire into top level of application
    // TODO: dialog box

    return html`
    <input
      @keyup=${this.broadcastQuery}
      class="search-bar"
      type="search"
      name="query"
      id="search"
      placeholder="Search..." />
    `;
  }
}

customElements.define("content-searchbar", SearchBar);
