/* Create Mithril component factories from component definitions. */

import m from "mithril";

export function Component<Attrs>(
  definition: m.Component<Attrs>,
): m.FactoryComponent<Attrs> {
  return () => ({ ...definition });
}
