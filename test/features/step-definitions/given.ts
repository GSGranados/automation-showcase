import { Given } from "@wdio/cucumber-framework";
import constants from "../../../data/constants.json";
import EcommercePage from "../../page-objects/Ecommerce.page";
import reporter from "../../helper/reporter";
import apiHelper from "../../helper/apiHelper";
import fs from "fs";
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

Given(
  /^Fetch a set of placeholder users, with (.*) endpoint, store those in the data folder$/,
  async function (endpointReference) {
    if (!endpointReference)
      throw Error(
        `Endpoint reference provided is not valid. Endpoint Ref: ${endpointReference}`
      );
    try {
      reporter.addStep(
        this.testid,
        "info",
        "Getting the Users payload from JSON placeholder API"
      );
      let endpoint: string = "";
      if (endpointReference.trim().toUpperCase() === "USERS") {
        endpoint = constants.API_PLACEHOLDERS.GET_USERS;
      }
      if (!endpoint)
        throw Error(
          `Error getting the endpoint: ${endpoint} from the constants.json`
        );
      let res;
      await browser.call(async () => {
        res = await apiHelper.GET(
          this.testid,
          //@ts-ignore
          browser.config.jsonPlaceholderBaseURL,
          endpoint,
          "",
          {}
        );
      });
      if (res.status !== 200)
        chai.expect.fail(
          //@ts-ignore
          `Failed getting users from: ${browser.config.jsonPlaceholderBaseURL}${endpoint}`
        );
      reporter.addStep(
        this.testid,
        "debug",
        `API response received, data: ${res.body}`
      );
      let data = JSON.stringify(res.body, undefined, 4);
      let fileName = `${process.cwd()}/data/api-res/APIUsers.json`;
      fs.writeFileSync(fileName, data);
      reporter.addStep(
        this.testid,
        "info",
        `API response from ${endpoint} stored in JSON file`
      );
    } catch (err) {
      err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`;
      throw err;
    }
  }
);
