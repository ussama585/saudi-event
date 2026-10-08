import { chromium } from "@playwright/test";
import fs from "node:fs";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
const captureOnly = process.argv.includes("--capture");
fs.mkdirSync("artifacts/responsive", { recursive: true });
try {
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    if (captureOnly) {
      await page.screenshot({ path: `artifacts/responsive/hero-${width}.png` });
      await page.screenshot({
        path: `artifacts/responsive/home-${width}.png`,
        fullPage: true,
      });
      await page.close();
      console.log(`Captured ${width}px`);
      continue;
    }
    const layout = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return (
            (rect.right > innerWidth + 1 || rect.left < -1) &&
            getComputedStyle(el).position !== "absolute" &&
            !el.closest(".swiper")
          );
        })
        .map((el) => ({ tag: el.tagName, class: el.className })),
      smallText: [...document.querySelectorAll("main *, header *, footer *")]
        .filter(
          (el) =>
            el.textContent.trim() &&
            getComputedStyle(el).display !== "none" &&
            parseFloat(getComputedStyle(el).fontSize) < 12,
        )
        .map((el) => el.className),
      brokenImages: [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src),
    }));
    if (layout.document > layout.viewport)
      throw Error(`Horizontal overflow at ${width}: ${JSON.stringify(layout)}`);
    if (layout.smallText.length || layout.brokenImages.length)
      throw Error(`Layout issue at ${width}: ${JSON.stringify(layout)}`);
    await page.getByRole("tab").nth(1).click();
    await page
      .getByRole("tabpanel")
      .getByText("Ideas that create lasting impact")
      .waitFor();
    await page.getByRole("button", { name: "Who is the summit for?" }).click();
    if (
      (await page
        .getByRole("button", { name: "Who is the summit for?" })
        .getAttribute("aria-expanded")) !== "true"
    )
      throw Error("FAQ failed");
    if (width < 992) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "About" })
        .click();
      if (await page.locator("#mobile-menu").count())
        throw Error("Mobile menu did not close");
    }
    await page.screenshot({
      path: `artifacts/responsive/home-${width}.png`,
      fullPage: true,
    });
    await page.goto(
      "http://127.0.0.1:5173/#registration",
    );
    await page.locator("#interest").selectOption("Partnership");
    if ((await page.locator("#interest").inputValue()) !== "Partnership")
      throw Error("Partnership selection failed");
    await page.locator("#name").fill("Test Delegate");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#company").fill("Test Company");
    await page.getByRole("button", { name: "Prepare enquiry" }).click();
    await page
      .getByRole("heading", { name: "Your enquiry is ready." })
      .waitFor();
    console.log(
      `PASS ${width}px: layout, font minimum, images, programme, FAQ, navigation, form`,
    );
    await page.close();
  }
  if (!captureOnly) {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    for (const id of [
      "countdown",
      "about",
      "pillars",
      "speakers",
      "agenda",
      "partners",
      "faq",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(1100);
      const visible = await page
        .locator(`#${id} [data-reveal]`)
        .first()
        .evaluate((el) => Number(getComputedStyle(el).opacity));
      if (visible < 0.95) throw Error(`Reveal failed: ${id}`);
    }
    await page.getByRole("button", { name: "Pause slider" }).click();
    await page.getByRole("button", { name: "Play slider" }).waitFor();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(300);
    if (await page.getByRole("button", { name: "Pause slider" }).count())
      throw Error("Reduced motion control remains");
    if (errors.length) throw Error(`Browser errors: ${errors.join("; ")}`);
    console.log(
      "PASS animations, slider pause, dynamic reduced-motion, no browser errors",
    );
  }
} finally {
  await browser.close();
}
