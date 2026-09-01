/* Semantic expectations for Mithril component output. */

import type m from "mithril";

export function buildComponentVnode<Attrs>(attrs: Attrs): m.Vnode<Attrs> {
  return { attrs } as m.Vnode<Attrs>;
}

export function readVnodeText(children: m.Children): string {
  if (children === null || children === undefined || children === false) return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(readVnodeText).join("");
  }
  return readVnodeText((children as m.Vnode).children);
}

export function expectOptionalSection(
  section: m.Children,
  title: string,
  hasItems: boolean,
): m.Vnode | null {
  if (!hasItems) {
    if (section !== null) throw new Error(`${title} section must be absent`);
    return null;
  }
  if (section === null || typeof section !== "object" || Array.isArray(section)) {
    throw new Error(`${title} section must be a vnode`);
  }

  const vnode = section as m.Vnode;
  const children = vnode.children as m.Vnode[];
  const heading = children[0];
  if (heading.tag !== "h3" || readVnodeText(heading) !== title) {
    throw new Error(`${title} section has an invalid heading`);
  }
  return vnode;
}

export function expectVnodeChildCount(vnode: m.Vnode, expected: number): void {
  const children = vnode.children ?? [];
  const actual = Array.isArray(children) ? children.length : 1;
  if (actual !== expected) {
    throw new Error(`expected ${expected} children, received ${actual}`);
  }
}

export function expectVnodeAttribute(
  vnode: m.Vnode,
  name: string,
  expected: unknown,
): void {
  const attrs = vnode.attrs as Record<string, unknown>;
  const actual = attrs[name];
  if (actual !== expected) {
    throw new Error(`${name}: expected ${expected}, received ${actual}`);
  }
}
