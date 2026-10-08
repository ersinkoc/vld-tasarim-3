/**
 * Visual smoke check: boots a Chromium pass over the running site and
 * writes screenshots to ./shots. Console errors are reported.
 *
 *   npm run build && npm start
 *   node scripts/screenshot.mjs
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "shots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function open(theme) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`[${theme}] ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`[${theme}] PAGEERROR ${e.message}`));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
  return { ctx, page };
}

async function scrollTo(page, id) {
  await page.evaluate((el) => {
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "instant" });
  }, await page.locator(`#${id}`).elementHandle());
  await page.waitForTimeout(1600);
}

async function shoot(theme, name, id) {
  const { ctx, page } = await open(theme);
  if (id) await scrollTo(page, id);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  await ctx.close();
}

await shoot("dark", "01-hero-dark", "playground");
await shoot("light", "02-hero-light", "playground");
await shoot("dark", "03-benchmarks", "benchmarks");
await shoot("dark", "04-features", "features");
await shoot("dark", "05-internals", "internals");
await shoot("dark", "06-dropin", "dropin");
await shoot("light", "07-quickstart", "quickstart");
await shoot("dark", "08-api", "api");

{
  const { ctx, page } = await open("dark");
  await scrollTo(page, "i18n");
  await page.getByRole("button", { name: "tr Türkçe" }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/09-i18n-tr.png` });
  await ctx.close();
}

{
  const { ctx, page } = await open("dark");
  await scrollTo(page, "playground");
  await page.getByRole("button", { name: "Bad formats" }).click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/10-playground-invalid.png` });
  await ctx.close();
}

await browser.close();

if (errors.length) console.log("ERRORS:\n" + [...new Set(errors)].join("\n"));
else console.log("No console errors.");