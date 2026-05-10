// Browser integration test runner — runs all page checks
"use strict";

const tap = require("tap");
const { withPage } = require("./helpers");

/** @type {import('./types').BrowserCheck[]} */
const checks = [
  require("./checks/root"),
  require("./checks/navbar"),
  require("./checks/albums-content"),
  require("./checks/album-page"),
  require("./checks/listings"),
  require("./checks/photo-page"),
];

for (const check of checks) {
  tap.test(check.name, async (tst) => {
    await withPage(async (page) => {
      await check.run(page, tst);
    });
  });
}
