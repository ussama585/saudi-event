import { chromium } from "@playwright/test";
const url = process.argv[2] || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "no-preference",
    });
    page.on("pageerror", (error) =>
      console.log("Browser error:", error.message),
    );
    page.on("requestfailed", (request) =>
      console.log(
        "Failed request:",
        request.url(),
        request.failure()?.errorText,
      ),
    );
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page
      .waitForFunction(
        () => {
          const video = document.querySelector("video.hero-background");
          return (
            video &&
            !video.paused &&
            video.currentTime > 0.5 &&
            video.videoWidth > 0
          );
        },
        null,
        { timeout: 45000 },
      )
      .catch(async (error) => {
        console.log(
          await page.evaluate(() => {
            const video = document.querySelector("video.hero-background");
            return {
              text: document.body.innerText.slice(0, 200),
              video: video && {
                src: video.currentSrc,
                paused: video.paused,
                time: video.currentTime,
                readyState: video.readyState,
                error: video.error?.message,
              },
            };
          }),
        );
        throw error;
      });
    const result = await page.evaluate(() => ({
      video: {
        src: document.querySelector("video.hero-background").currentSrc,
        paused: document.querySelector("video.hero-background").paused,
        width: document.querySelector("video.hero-background").videoWidth,
      },
      colors: [
        ...document.querySelectorAll(".countdown-unit--seconds > span"),
      ].map((el) => getComputedStyle(el).color),
    }));
    if (
      result.colors.length !== 2 ||
      result.colors.some((color) => color !== "rgb(223, 197, 154)")
    )
      throw Error(JSON.stringify(result));
    await page.getByRole("button", { name: "Pause background video" }).click();
    if (!(await page.locator("video").evaluate((video) => video.paused)))
      throw Error("Pause failed");
    await page.getByRole("button", { name: "Play background video" }).click();
    await page.waitForFunction(() => !document.querySelector("video").paused);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => document.querySelector("video").paused);
    console.log(
      `PASS ${width}px: H.264 video playback, seconds accent color, pause/play, reduced motion`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
