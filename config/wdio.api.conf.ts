//http://automationpractice.com
import { config as baseConfig } from "../wdio.conf";

export const config = Object.assign(baseConfig, {
  //ALL TEST ENV SPECIFICATIONS
  environment: "TEST-API-Headless",
  jsonPlaceholderBaseURL: "https://jsonplaceholder.typicode.com",
  capabilities: [
    {
      maxInstances: 5,
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--disable-web-security",
          "--headless",
          "--disable-dev-shm-usage",
          "--no-sandbox",
        ],
      },
      acceptInsecureCerts: true,
      timeouts: { implicit: 15000, pageLoad: 20000, script: 30000 },
    },
  ],
});
