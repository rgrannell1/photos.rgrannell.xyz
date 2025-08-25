import { html } from "lit-element";
import { LitElem } from "../../models/lit-element.ts";
import { property } from "lit/decorators.js";

export class Sidebar extends LitElem {
  @property({ type: Boolean, state: true })
  visible: boolean;

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
