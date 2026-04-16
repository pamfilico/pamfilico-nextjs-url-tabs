import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/e2e",
  timeout: 30000,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3098",
    headless: true,
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev",
        port: 3098,
        reuseExistingServer: true,
      },
});
