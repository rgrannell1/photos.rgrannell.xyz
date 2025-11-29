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

async function getSocialCard(db: D1Database, path: string): Promise<SocialCard | null> {
  const result = await db.prepare(
    'SELECT path, description, title, image_url FROM social_cards WHERE path = ?'
  ).bind(path).first<SocialCard>();

  return result || null;
}

function extractPathFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // For share.photos.rgrannell.xyz, the path is the direct pathname
    // e.g., share.photos.rgrannell.xyz/albums/zaragoza-25 -> /albums/zaragoza-25
    return pathname || '/';
  } catch {
    return '/';
  }
}

function getPageTitle(card: SocialCard | null): string {
  return card?.title || 'photos.rgrannell.xyz';
}

function getPageDescription(card: SocialCard | null): string | undefined {
  return card?.description ?? undefined;
}

function getPageUrl(request: Request): string {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Redirect from share.photos.rgrannell.xyz to photos.rgrannell.xyz
  // e.g., share.photos.rgrannell.xyz/albums/zaragoza-25 -> photos.rgrannell.xyz/albums/zaragoza-25
  return `https://photos.rgrannell.xyz${pathname}`;
}

function getImageUrl(card: SocialCard | null): string | undefined  {
  return card?.image_url;
}

export default {
  async fetch(request: Request, env: Env, _: ExecutionContext): Promise<Response> {
    const path = extractPathFromUrl(request.url);
    const card = await getSocialCard(env.PHOTO_CARDS, path);

    const title = getPageTitle(card);
    const description = getPageDescription(card);
    const pageUrl = getPageUrl(request);
    const imageUrl = getImageUrl(card);

    const view = {
      title,
      description,
      pageUrl,
      imageUrl,
    }

    // yes this is insecure, but Copilot was annoying me
    const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta name="robots" content="noindex">
  <meta name="googlebot" content="noindex">
  <meta charset="utf-8">
  <meta name="application-name" content="photos.rgrannell.xyz">
  <title>${title}</title>

  <!-- Social Cards -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:type" content="website">

  <!-- No card for X, because fuck that guy. -->
  <meta http-equiv="refresh" content="0; url=${pageUrl}">
</head>
<body></body>
</html>`;

    return new Response(htmlTemplate, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=1200',
      },
    });
  },
};