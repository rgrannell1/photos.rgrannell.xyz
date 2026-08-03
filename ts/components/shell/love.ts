import m from "mithril";
import { mountHeartRain } from "../../services/heart-rain.ts";

type HeartRainState = {
  // teardown for the heart spawner, set on mount
  teardown: (() => void) | null;
};

function mountHeartRainOverlay(
  heartState: HeartRainState,
  vnode: m.VnodeDOM<Record<never, never>>,
): void {
  heartState.teardown = mountHeartRain(vnode.dom as HTMLElement);
}

function unmountHeartRainOverlay(heartState: HeartRainState): void {
  heartState.teardown?.();
  heartState.teardown = null;
}

function viewHeartRain(): m.Children {
  return m("div.heart-rain-overlay");
}

export function HeartRain() {
  const heartState: HeartRainState = { teardown: null };

  return {
    oncreate: mountHeartRainOverlay.bind(null, heartState),
    onremove: unmountHeartRainOverlay.bind(null, heartState),
    view: viewHeartRain,
  };
}
