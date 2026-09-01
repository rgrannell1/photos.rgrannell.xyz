// Browser data and actions for listing journeys.

"use strict";

function readListingContracts(links) {
  return links.map((link) => {
    const card = link.closest(".photo-album");
    const label = card.querySelector('[data-testid="listing-card-label"]');
    return {
      href: link.getAttribute("href"),
      title: label.textContent.trim(),
      type: label.getAttribute("data-listing-type"),
    };
  });
}

async function collectListingContracts(page) {
  await page.goto("/?bust=listing-contracts#!/listings");
  const links = page.locator('[data-testid="listings-grid"] a[href*="/listing/"]');
  await links.first().waitFor();
  return await links.evaluateAll(readListingContracts);
}

async function openListingContract(page, contract) {
  await page.goto(`/?bust=listing-${contract.type}${contract.href}`);
  await page.getByTestId("listing-title").waitFor();
}

module.exports = { collectListingContracts, openListingContract };
