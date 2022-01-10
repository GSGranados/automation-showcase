import { Given } from "@wdio/cucumber-framework";
import constants from "../../../data/constants.json";
Given(
  /^Using a (.*) to find an Automation practice website$/,
  async function (searchItem) {
    await browser.url("/");
    await browser.pause(constants.TIMERS.medium);
    const searchInput = await $('input[name="q"]');
    await searchInput.setValue(searchItem);
    await browser.pause(constants.TIMERS.short);
    await browser.keys("Enter");
  }
);
