/// <reference types="@cloudflare/workers-types" />

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

async function getSocialCard(
  db: D1Database,
  path: string,
): Promise<SocialCard | null> {
  try {
    console.log(`[DB] Querying social_cards for path: ${path}`);
    const result = await db.prepare(
      "SELECT path, description, title, image_url FROM social_cards WHERE path = ?",
    ).bind(path).first<SocialCard>();

    console.log(
      `[DB] Query result:`,
      result ? `Found card for ${result.path}` : "No card found",
    );
    return result || null;
  } catch (error) {
    console.error(`[DB] Error querying social_cards:`, error);
    return null;
  }
}

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

function getPageTitle(card: SocialCard | null, request: Request): string {
  const host = new URL(request.url).hostname.replace(/^sharephoto\./, "photos.");
  return card?.title || host;
}

function getPageUrl(request: Request): string {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const host = url.hostname.replace(/^sharephoto\./, "photos.");

  // Redirect from sharephoto.* to photos.* preserving the path
  return `https://${host}/#!/${pathname}`;
}

function getImageUrl(card: SocialCard | null): string | undefined {
  return card?.image_url;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _: ExecutionContext,
  ): Promise<Response> {
    console.log(`[Worker] Incoming request: ${request.method} ${request.url}`);

    const path = extractPathFromUrl(request.url);
    console.log(`[Worker] Extracted path: ${path}`);

    const card = await getSocialCard(env.PHOTO_CARDS, path);
    console.log(
      `[Worker] Database lookup result:`,
      card ? "Card found" : "No card found",
    );

    const title = getPageTitle(card, request);
    const pageUrl = getPageUrl(request);
    const imageUrl = getImageUrl(card);

    const view = {
      title,
      pageUrl,
      imageUrl,
    };

    console.log(`[Worker] Response view:`, view);

    // yes this is insecure, but Copilot was annoying me
    // will patch soon
    const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta name="robots" content="noindex">
  <meta name="googlebot" content="noindex">
  <meta charset="utf-8">
  <meta name="application-name" content="${new URL(pageUrl).hostname}">
  <title>${title}</title>

  <!-- Social Cards -->
  <meta property="og:title" content="${title}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:type" content="website">

  <!-- No card for X, because fuck that guy. -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}">
</head>
<body></body>
</html>`;

    const response = new Response(htmlTemplate, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "public, max-age=1200",
      },
    });

    console.log(`[Worker] Returning response with status: ${response.status}`);
    return response;
  },
};
