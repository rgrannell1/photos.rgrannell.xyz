import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class Sidebar extends LitElem {
  static get properties() {
    return {
      visible: { type: Boolean },
    };
  }

  render() {
    const classes = ["photo-sidebar"];
    if (this.visible) {
      classes.push("sidebar-visible");
    }

    return html`
    <aside class="${classes.join(" ")}">
      <nav>
        <ul>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "albums",
      })
    }
            id="albums-sidebar-link" class="sidebar-item">🖼️ Albums</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "tags",
      })
    }
            id="tags-sidebar-link" class="sidebar-item">🏷️ Tags</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "locations",
      })
    }
            id="locations-sidebar-link" class="sidebar-item">🌍 Locations</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "stats",
      })
    }
            id="stats-sidebar-link" class="sidebar-item">🧮 Stats</li>
      </nav>
    </aside>
    `;
  }
}

customElements.define("photo-sidebar", Sidebar);
