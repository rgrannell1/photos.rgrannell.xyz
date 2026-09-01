// Browser actions for controlled offline journeys.

"use strict";

async function waitForServiceWorkerControlInPage() {
  await navigator.serviceWorker.ready;
  if (navigator.serviceWorker.controller) return;

  await new Promise((resolve) => {
    navigator.serviceWorker.addEventListener("controllerchange", resolve, {
      once: true,
    });
  });
}

async function hasCachedApplicationShell() {
  return Boolean(await caches.match("/"));
}

async function warmOfflineApplication(page) {
  await page.goto("/?bust=offline-warm#!/albums");
  await page.getByTestId("album-row").first().waitFor();
  await page.evaluate(waitForServiceWorkerControlInPage);

  await page.reload();
  await page.getByTestId("album-row").first().waitFor();
  await page.locator('[data-testid="album-row"] img').first().waitFor();
  await page.waitForFunction(hasCachedApplicationShell);
}

function isNavigationResponse(response) {
  return response.request().isNavigationRequest();
}

function collectServiceWorkerResponse(urls, response) {
  if (response.fromServiceWorker()) urls.push(response.url());
}

module.exports = {
  collectServiceWorkerResponse,
  isNavigationResponse,
  warmOfflineApplication,
};
