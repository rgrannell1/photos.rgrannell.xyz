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
            id="albums-sidebar-link" class="sidebar-item">ALBUMS</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "tags",
      })
    }
            id="tags-sidebar-link" class="sidebar-item">TAGS</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "locations",
      })
    }
            id="locations-sidebar-link" class="sidebar-item">LOCATIONS</li>
          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "stats",
      })
    }
            id="stats-sidebar-link" class="sidebar-item">STATS</li>
      </nav>
    </aside>
    `;
  }
}

customElements.define("photo-sidebar", Sidebar);
