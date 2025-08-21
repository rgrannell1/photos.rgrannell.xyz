import { LitElement } from "../library/lit.js";

export class LitElem extends LitElement {
  override createRenderRoot() {
    return this;
  }

  broadcast(label: string, detail?: any) {
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
