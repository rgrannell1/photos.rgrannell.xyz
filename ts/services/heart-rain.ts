/* Heart-rain effect for the olm page. Spawns falling hearts on an interval. */

// ms between heart spawns
const SPAWN_INTERVAL_MS = 150;

// ms a heart element stays in the DOM before removal
const HEART_LIFETIME_MS = 5000;

const HEARTS = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "💜"];

function randomItem<Item>(items: Item[]): Item {
  return items[Math.floor(Math.random() * items.length)];
}

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

function stopHeartRain(intervalId: number): void {
  clearInterval(intervalId);
}

/* Returns a teardown function. */
export function mountHeartRain(container: HTMLElement): () => void {
  const intervalId = setInterval(
    spawnHeart.bind(null, container),
    SPAWN_INTERVAL_MS,
  );
  return stopHeartRain.bind(null, intervalId);
}
