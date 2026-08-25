import m from "mithril";
import { HEART_RAIN_OVERLAY_SELECTOR } from "../../constants/selectors.ts";
import { mountHeartRain } from "../../services/heart-rain.ts";
import { isSome, type Maybe, NONE } from "../../commons/maybe.ts";

type HeartRainState = {
  // teardown for the heart spawner, set on mount
  teardown: Maybe<() => void>;
};

function mountHeartRainOverlay(
  heartState: HeartRainState,
  vnode: m.VnodeDOM<Record<never, never>>,
): void {
  heartState.teardown = mountHeartRain(vnode.dom as HTMLElement);
}

function unmountHeartRainOverlay(heartState: HeartRainState): void {
  if (isSome(heartState.teardown)) {
    heartState.teardown();
  }
  heartState.teardown = NONE;
}

function viewHeartRain(): m.Children {
  return m(`div${HEART_RAIN_OVERLAY_SELECTOR}`);
}

export function HeartRain() {
  const heartState: HeartRainState = { teardown: NONE };

  return {
    oncreate: mountHeartRainOverlay.bind(null, heartState),
    onremove: unmountHeartRainOverlay.bind(null, heartState),
    view: viewHeartRain,
  };
}
