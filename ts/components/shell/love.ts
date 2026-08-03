import m from "mithril";

const SPAWN_INTERVAL_MS = 150;
const HEART_LIFETIME_MS = 5000;
const HEARTS = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "💜"];

type HeartRainState = {
  // interval id for the heart spawner, or null when not running
  intervalId: number | null;
};

function randomItem<Item>(items: Item[]): Item {
  return items[Math.floor(Math.random() * items.length)];
}

// good enough lol
function spawnHeart(container: HTMLElement): void {
  const heart = document.createElement("div");
  heart.className = "heart-rain-heart";
  heart.textContent = randomItem(HEARTS);
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;
  heart.style.animationDuration = `${Math.random() * 3 + 2}s`;

  container.appendChild(heart);
  setTimeout(heart.remove.bind(heart), HEART_LIFETIME_MS);
}

function mountHeartRain(
  heartState: HeartRainState,
  vnode: m.VnodeDOM<Record<never, never>>,
): void {
  const container = vnode.dom as HTMLElement;
  heartState.intervalId = setInterval(
    spawnHeart.bind(null, container),
    SPAWN_INTERVAL_MS,
  );
}

function unmountHeartRain(heartState: HeartRainState): void {
  if (heartState.intervalId !== null) {
    clearInterval(heartState.intervalId);
    heartState.intervalId = null;
  }
}

function viewHeartRain(): m.Children {
  return m("div.heart-rain-overlay");
}

export function HeartRain() {
  const heartState: HeartRainState = { intervalId: null };

  return {
    oncreate: mountHeartRain.bind(null, heartState),
    onremove: unmountHeartRain.bind(null, heartState),
    view: viewHeartRain,
  };
}
