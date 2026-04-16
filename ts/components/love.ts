import m from "mithril";

const SPAWN_INTERVAL_MS = 150;
const HEART_LIFETIME_MS = 5000;
const HEARTS = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "💜"];

function randomItem<T>(items: T[]): T {
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
  setTimeout(() => heart.remove(), HEART_LIFETIME_MS);
}

export function HeartRain() {
  let intervalId: number | null = null;

  return {
    oncreate(vnode: m.VnodeDOM<Record<never, never>>) {
      const container = vnode.dom as HTMLElement;
      intervalId = setInterval(
        () => spawnHeart(container),
        SPAWN_INTERVAL_MS,
      ) as unknown as number;
    },
    onremove() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    view() {
      return m("div.heart-rain-overlay");
    },
  };
}
