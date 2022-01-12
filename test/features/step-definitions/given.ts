import { Given } from "@wdio/cucumber-framework";
import constants from "../../../data/constants.json";
import EcommercePage from "../../page-objects/Ecommerce.page";
import logger from "../../helper/logger";
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

Given(
  /^An ecommerce website, access to the (.*)$/,
  async function (clothesSection) {
    //@ts-ignore
    await EcommercePage.navigateTo(browser.config.ecommerceBaseURL);
    await browser.pause(constants.TIMERS.short);
    await browser.pause(constants.TIMERS.medium);
  }
);
