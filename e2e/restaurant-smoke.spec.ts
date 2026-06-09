import { expect, test } from "@playwright/test";

test("restaurant marketing and demo app load", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /restaurant apps that help you sell more/i })).toBeVisible();

  await page.goto("/app/dashboard");
  await expect(page.getByRole("heading", { name: /good evening/i })).toBeVisible();
  await expect(page.getByText("Active orders")).toBeVisible();
});
