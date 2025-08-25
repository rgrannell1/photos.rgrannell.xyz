import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.ts";

export class Sidebar extends LitElem {
  visible!: boolean;

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
        page: "photos",
      })
    }
            class="sidebar-item">PHOTOS</li>

          <li
            @click=${
      this.broadcast("navigate-page", {
        page: "videos",
      })
    }
            class="sidebar-item">VIDEOS</li>

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
        page: "about",
      })
    }
            class="sidebar-item">ABOUT</li>

      </nav>
    </aside>
    `;
  }
}

customElements.define("photo-sidebar", Sidebar);
