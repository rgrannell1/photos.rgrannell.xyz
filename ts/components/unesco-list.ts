
import m from "mithril";
import type { Services } from "../types.ts";
import { UnescoLink } from "./unesco-link.ts";
import { one } from "../commons/arrays.ts";

type UnescoListAttrs = {
  urns: Set<string>;
  services: Services;
}

export function UnescoList() {
  return {
    view(vnode: m.Vnode<UnescoListAttrs>) {
      const { urns, services } = vnode.attrs;

      const unescos = services.readUnescos(urns);
      const $unescos = unescos.map(unesco => {
        const urn = one(unesco.id)!;

        return m('li', m(UnescoLink, {urn, thing: unesco}))
      });

      return m('ul', $unescos)
    }
  }
}
