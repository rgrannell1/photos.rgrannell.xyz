import { LitElement } from "../library/lit.js";

export class LitElem extends LitElement {
  createRenderRoot() {
    return this;
  }

  broadcast(label, detail) {
    return () => {
      const dispatched = new CustomEvent(label, {
        detail,
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(dispatched);
    };
  }
}
http://127.0.0.1:5500/index.html#/album/4690730946347882343