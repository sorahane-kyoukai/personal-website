import { expect, test } from "@playwright/test";

test("visits the app root url", async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}`);
  });

  await page.goto("/");

  await expect(page.locator("h1")).toHaveText("『空羽ノ境』");
  await expect(
    page.getByRole("navigation", { name: "主要導航" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "星塵書庫" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
