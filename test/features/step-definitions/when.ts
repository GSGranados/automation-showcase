import { When } from "@wdio/cucumber-framework";
import constants from "../../../data/constants.json";
import EcommercePage from "../../page-objects/Ecommerce.page";

When(/^You clicked on the option that appears first$/, async function () {
  await browser.pause(constants.TIMERS.short);
  const firstResult = await $$("<h3>")[0];
  await firstResult.click();
  await browser.pause(constants.TIMERS.short);
});

When(/^You provide the (.*) user credentials$/, async function (userType) {
  EcommercePage.loginToSauseApp(
    this.testid,
    process.env.TEST_STD_USERNAME,
    process.env.TEST_STD_PASSWORD
  );
  await browser.pause(constants.TIMERS.medium);
});
