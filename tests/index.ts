import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

async function inspectWebsite(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "example.png" });
  await browser.close();
}

await inspectWebsite("https://photos.rgrannell.xyz");
