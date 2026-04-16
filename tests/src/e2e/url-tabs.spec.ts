import { test, expect } from "@playwright/test";

test.describe("UrlStateTabs - Basic", () => {
  test("renders default tab on page load", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("content-0")).toBeVisible();
    await expect(page.getByTestId("content-1")).not.toBeVisible();
  });

  test("clicking a tab updates URL and shows content", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Tab Two" }).click();
    await expect(page).toHaveURL(/currentTab=1/);
    await expect(page.getByTestId("content-1")).toBeVisible();
    await expect(page.getByTestId("content-0")).not.toBeVisible();
  });

  test("loading with query param selects correct tab", async ({ page }) => {
    await page.goto("/?currentTab=2");
    await expect(page.getByTestId("content-2")).toBeVisible();
    await expect(page.getByTestId("content-0")).not.toBeVisible();
  });

  test("invalid tab param falls back to default", async ({ page }) => {
    await page.goto("/?currentTab=99");
    await expect(page.getByTestId("content-0")).toBeVisible();
  });

  test("browser back navigates between tabs", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: "Tab Two" }).click();
    await expect(page.getByTestId("content-1")).toBeVisible();
    await page.getByRole("tab", { name: "Tab Three" }).click();
    await expect(page.getByTestId("content-2")).toBeVisible();
    await page.goBack();
    await expect(page.getByTestId("content-1")).toBeVisible();
  });
});

test.describe("UrlStateTabs - Settings (custom queryParam, disabled, onTabChange)", () => {
  test("uses custom queryParamName", async ({ page }) => {
    await page.goto("/settings");
    await page.getByRole("tab", { name: "Advanced" }).click();
    await expect(page).toHaveURL(/tab=2/);
    await expect(page.getByTestId("settings-2")).toBeVisible();
  });

  test("loads with custom query param", async ({ page }) => {
    await page.goto("/settings?tab=2");
    await expect(page.getByTestId("settings-2")).toBeVisible();
  });

  test("disabled tab cannot be clicked", async ({ page }) => {
    await page.goto("/settings");
    const disabledTab = page.getByRole("tab", { name: "Disabled" });
    await expect(disabledTab).toBeDisabled();
    await expect(page.getByTestId("settings-0")).toBeVisible();
  });

  test("onTabChange callback fires", async ({ page }) => {
    await page.goto("/settings");
    await expect(page.getByTestId("last-changed")).toHaveText("none");
    await page.getByRole("tab", { name: "Advanced" }).click();
    await expect(page.getByTestId("last-changed")).toHaveText("changed:2");
  });
});
