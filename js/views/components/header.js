import { html } from "../../library/lit.js";
import { LitElem } from "../../models/lit-element.js";

export class Header extends LitElem {
  render() {
    return html`
    <nav class="header">
      <ul>
        <li @click=${
      this.broadcast("click-burger-menu")
    }><a><span class="burger">Ξ</span></a></li>
        <li><a href="/"><span class="brand">photos.rgrannell.xyz</span></a></li>
        <li class="rss-tag" style="float: right">
          <a title="rss" href="/feed.xml">
            <svg alt="rss" width="32px" height="32px">
              <path fill="#ff9132" d="M 4.259,23.467c-2.35,0-4.259,1.917-4.259,4.252c0,2.349, 1.909,4.244, 4.259,4.244 c 2.358,0, 4.265-1.895, 4.265-4.244C 8.525,25.383, 6.618,23.467, 4.259,23.467zM 0.005,10.873l0,6.133 c 3.993,0, 7.749,1.562, 10.577,4.391c 2.825,2.822, 4.384,6.595, 4.384,10.603l 6.16,0 C 21.125,20.349, 11.648,10.873, 0.005,10.873zM 0.012,0l0,6.136 c 14.243,0, 25.836,11.604, 25.836,25.864L 32,32 C 32,14.36, 17.648,0, 0.012,0z"></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    `;
  }
}

customElements.define("photo-header", Header);
