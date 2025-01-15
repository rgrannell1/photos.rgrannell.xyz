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
        page: "tags",
      })
    }
            id="tags-sidebar-link" class="sidebar-item">TAGS</li>

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
