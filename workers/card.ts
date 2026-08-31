/// <reference types="@cloudflare/workers-types" />

/// <reference types="@cloudflare/workers-types" />
import {
  fromNullable,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../ts/commons/collections/maybe.ts";
import type { Result } from "../ts/commons/collections/result.ts";

/*
 * Social-card redirect worker
 */

export interface Env {
  PHOTO_CARDS: D1Database;
}

interface SocialCard {
  path: string;
  description: string | null;
  title: string | null;
  image_url: string;
}

interface SocialCardView {
  title: string;
  pageUrl: string;
  imageUrl: string;
}

/** Reads the social card for a path and returns database failures as errors. */
async function getSocialCard(
  db: D1Database,
  path: string,
): Promise<Result<Maybe<SocialCard>, unknown>> {
  try {
    console.log(`[DB] Querying social_cards for path: ${path}`);
    const result = await db.prepare(
      "SELECT path, description, title, image_url FROM social_cards WHERE path = ?",
    ).bind(path).first<SocialCard>();

    console.log(
      `[DB] Query result:`,
      result ? `Found card for ${result.path}` : "No card found",
    );
    return { ok: true, value: fromNullable(result) };
  } catch (err) {
    console.error(`[DB] Error querying social_cards:`, err);
    return { ok: false, error: err };
  }
}

/** Extracts a URL pathname and falls back to the root path for invalid URLs. */
function extractPathFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // For sharephoto.*, the path is the direct pathname
    // e.g., sharephoto.rho.ie/albums/zaragoza-25 -> /albums/zaragoza-25
    return pathname || "/";
  } catch {
    return "/";
  }
}

/** Selects the card title or falls back to the public photos host. */
function getPageTitle(card: Maybe<SocialCard>, request: Request): string {
  const host = new URL(request.url).hostname.replace(
    /^sharephoto\./,
    "photos.",
  );
  return isSome(card) && card.title ? card.title : host;
}

/** Converts a share host request into its hash-routed photos page URL. */
function getPageUrl(request: Request): string {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const host = url.hostname.replace(/^sharephoto\./, "photos.");

  // Redirect from sharephoto.* to photos.* preserving the path
  return `https://${host}/#!${pathname}`;
}

/** Returns the card image URL when a card and image value exist. */
function getImageUrl(card: Maybe<SocialCard>): Maybe<string> {
  return isSome(card) ? fromNullable(card.image_url) : NONE;
}

/** Builds the social card view from optional card data and the request. */
function readSocialCardView(
  card: Maybe<SocialCard>,
  request: Request,
): SocialCardView {
  return {
    title: getPageTitle(card, request),
    pageUrl: getPageUrl(request),
    imageUrl: withDefault(getImageUrl(card), ""),
  };
}

/** Renders Open Graph metadata for a social card. */
function renderSocialMetadata(
  view: SocialCardView,
  description: string,
): string {
  return `  <!-- Social Cards -->
  <meta property="og:title" content="${view.title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${view.pageUrl}">
  <meta property="og:image" content="${view.imageUrl}">
  <meta property="og:type" content="website">`;
}

/** Renders redirect HTML with social metadata when card data exists. */
function renderSocialCardHtml(
  view: SocialCardView,
  card: Maybe<SocialCard>,
): string {
  const description = isSome(card) ? card.description ?? "" : "";
  const socialMetadata = renderSocialMetadata(view, description);
  // yes this is insecure, but Copilot was annoying me
  // will patch soon
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="robots" content="noindex">
  <meta name="googlebot" content="noindex">
  <meta charset="utf-8">
  <meta name="application-name" content="${new URL(view.pageUrl).hostname}">
  <title>${view.title}</title>

${socialMetadata}

  <!-- No card for X, because fuck that guy. -->
  <meta http-equiv="refresh" content="0; url=${view.pageUrl}">
</head>
<body></body>
</html>`;
}

/** Creates the cacheable HTML response for a social card request. */
function createSocialCardResponse(
  view: SocialCardView,
  card: Maybe<SocialCard>,
): Response {
  return new Response(renderSocialCardHtml(view, card), {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=1200",
    },
  });
}

/** Creates a non-cacheable response for a database failure. */
function createUnavailableResponse(): Response {
  return new Response(null, {
    status: 503,
    headers: { "Cache-Control": "no-store" },
  });
}

export default {
  /** Resolves card data and returns redirect HTML or a service error. */
  async fetch(
    request: Request,
    env: Env,
    _: ExecutionContext,
  ): Promise<Response> {
    console.log(`[Worker] Incoming request: ${request.method} ${request.url}`);

    const path = extractPathFromUrl(request.url);
    console.log(`[Worker] Extracted path: ${path}`);

    const cardResult = await getSocialCard(env.PHOTO_CARDS, path);
    if (!cardResult.ok) {
      return createUnavailableResponse();
    }
    const card = cardResult.value;
    console.log(
      `[Worker] Database lookup result:`,
      isSome(card) ? "Card found" : "No card found",
    );

    const view = readSocialCardView(card, request);
    console.log(`[Worker] Response view:`, view);
    const response = createSocialCardResponse(view, card);
    console.log(`[Worker] Returning response with status: ${response.status}`);
    return response;
  },
};
