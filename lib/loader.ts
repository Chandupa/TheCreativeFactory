/**
 * Tiny signal between <LoadingScreen> and anything that animates on page load
 * (hero intro, scroll reveals), so entrances play as the overlay lifts instead
 * of finishing unseen underneath it.
 */

let done = false;
const listeners = new Set<() => void>();

/** Called by <LoadingScreen> when the overlay starts fading out. */
export function markLoaderDone(): void {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

/**
 * Runs `callback` once the loading overlay is lifting — immediately if it has
 * already gone (or never showed, e.g. after a client-side navigation).
 * Returns an unsubscribe function.
 */
export function whenLoaderDone(callback: () => void): () => void {
  if (done || !document.querySelector(".loading-screen")) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => listeners.delete(callback);
}
