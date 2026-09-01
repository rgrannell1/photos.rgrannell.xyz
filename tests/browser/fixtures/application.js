// Browser fixture that rejects silent application failures.

"use strict";

const { expect, test: base } = require("@playwright/test");
const {
  FIXED_BANNER,
  PHOTO_CDN_PATTERN,
} = require("../data/visual-media");
const { expectVisibleImagesLoaded } = require("../expectations/media");

async function fulfilPhotoMedia(route) {
  await route.fulfill({ body: FIXED_BANNER, contentType: "image/svg+xml" });
}

class ApplicationErrors {
  constructor() {
    this.messages = [];
    this.isOffline = false;
  }

  startOffline() {
    this.isOffline = true;
  }

  recordWebError(webError) {
    this.messages.push(`page: ${webError.error().message}`);
  }

  recordConsoleMessage(message) {
    const isExpectedOfflineFailure =
      this.isOffline && message.text() === "Failed to load resource: net::ERR_FAILED";
    if (isExpectedOfflineFailure) return;
    if (message.type() === "error") {
      this.messages.push(`console: ${message.text()}`);
    }
  }

  recordFailedRequest(request) {
    if (this.isOffline) return;
    this.messages.push(`request: ${request.method()} ${request.url()}`);
  }

  recordResponse(response) {
    if (response.status() >= 400) {
      this.messages.push(`response: ${response.status()} ${response.url()}`);
    }
  }
}

exports.test = base.extend({
  applicationErrors: [async ({ context }, use) => {
    const errors = new ApplicationErrors();

    await context.route(PHOTO_CDN_PATTERN, fulfilPhotoMedia);
    context.on("weberror", errors.recordWebError.bind(errors));
    context.on("console", errors.recordConsoleMessage.bind(errors));
    context.on("requestfailed", errors.recordFailedRequest.bind(errors));
    context.on("response", errors.recordResponse.bind(errors));

    await use(errors);
    if (!errors.isOffline) await expectVisibleImagesLoaded(context);
    expect(errors.messages, "application errors").toEqual([]);
  }, { auto: true }],
});

exports.expect = expect;
