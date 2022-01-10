import { When } from "@wdio/cucumber-framework";
import constants from "../../../data/constants.json";

When(/^You clicked on the option that appears first$/, async function () {
  await browser.pause(constants.TIMERS.short);
  const firstResult = await $$("<h3>")[0];
  await firstResult.click();
  await browser.pause(constants.TIMERS.short);
});
