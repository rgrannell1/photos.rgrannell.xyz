/* Create Mithril component factories from component definitions. */

import m from "mithril";

/** Wrap a component definition in a factory that returns a fresh definition copy. */
export function Component<Attrs>(
  definition: m.Component<Attrs>,
): m.FactoryComponent<Attrs> {
  return () => ({ ...definition });
}
