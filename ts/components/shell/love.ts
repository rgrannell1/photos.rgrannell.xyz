import m from "mithril";
import { HEART_RAIN_OVERLAY_SELECTOR } from "../../constants/selectors.ts";
import { mountHeartRain } from "../../services/rendering/heart-rain.ts";
import { isSome, type Maybe, NONE } from "../../commons/collections/maybe.ts";

type HeartRainState = {
  // teardown for the heart spawner, set on mount
  teardown: Maybe<() => void>;
};

/** Mount heart rain and retain its teardown callback. */
function mountHeartRainOverlay(
  heartState: HeartRainState,
  vnode: m.VnodeDOM<Record<never, never>>,
): void {
  heartState.teardown = mountHeartRain(vnode.dom as HTMLElement);
}

/** Stop heart rain when mounted and clear its teardown callback. */
function unmountHeartRainOverlay(heartState: HeartRainState): void {
  if (isSome(heartState.teardown)) {
    heartState.teardown();
  }
  heartState.teardown = NONE;
}

/** Draw the overlay that contains animated hearts. */
function viewHeartRain(): m.Children {
  return m(`div${HEART_RAIN_OVERLAY_SELECTOR}`);
}

/** Create the heart-rain overlay with managed mount lifecycle. */
export function HeartRain(): m.Component {
  const heartState: HeartRainState = { teardown: NONE };
  const component = {
    oncreate: mountHeartRainOverlay.bind(null, heartState),
    onremove: unmountHeartRainOverlay.bind(null, heartState),
    view: viewHeartRain,
  };
  return component;
}
