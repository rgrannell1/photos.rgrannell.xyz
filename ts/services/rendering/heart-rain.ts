/* Heart-rain effect for the olm page. Spawns falling hearts on an interval. */

/* Heart-rain effect for the olm page. Spawns falling hearts on an interval. */
import { HEART_RAIN_HEART_CLASS } from "../../constants/selectors.ts";

// ms between heart spawns
const SPAWN_INTERVAL_MS = 150;

// ms a heart element stays in the DOM before removal
const HEART_LIFETIME_MS = 5000;

const HEARTS = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "💜"];

/** Selects an item with uniform random probability. */
function randomItem<Item>(items: Item[]): Item {
  const randomIdx = Math.floor(Math.random() * items.length);
  return items[randomIdx];
}

/** Creates a heart element with a random colour. */
function createHeart(): HTMLDivElement {
  const heart = document.createElement("div");
  const heartText = randomItem(HEARTS);
  heart.className = HEART_RAIN_HEART_CLASS;
  heart.textContent = heartText;
  return heart;
}

/** Places a heart at a random horizontal viewport position. */
function setHeartPosition(heart: HTMLDivElement): void {
  const style = heart.style;
  const left = Math.random() * 100;
  style.left = `${left}vw`;
}

/** Assigns a random font size to a heart. */
function setHeartSize(heart: HTMLDivElement): void {
  const style = heart.style;
  const fontSize = Math.random() * 20 + 10;
  style.fontSize = `${fontSize}px`;
}

/** Assigns a random fall duration to a heart. */
function setHeartDuration(heart: HTMLDivElement): void {
  const style = heart.style;
  const duration = Math.random() * 3 + 2;
  style.animationDuration = `${duration}s`;
}

/** Applies the random position, size, and duration to a heart. */
function styleHeart(heart: HTMLDivElement): void {
  setHeartPosition(heart);
  setHeartSize(heart);
  setHeartDuration(heart);
}

/** Adds one heart and removes it after its fixed lifetime. */
function spawnHeart(container: HTMLElement): void {
  const heart = createHeart();
  styleHeart(heart);
  container.appendChild(heart);
  const removeHeart = heart.remove.bind(heart);
  setTimeout(removeHeart, HEART_LIFETIME_MS);
}

/** Stops the interval that spawns hearts. */
function stopHeartRain(intervalId: number): void {
  clearInterval(intervalId);
}

/** Returns a teardown function. */
export function mountHeartRain(container: HTMLElement): () => void {
  const spawn = spawnHeart.bind(null, container);
  const intervalId = setInterval(spawn, SPAWN_INTERVAL_MS);
  return stopHeartRain.bind(null, intervalId);
}
