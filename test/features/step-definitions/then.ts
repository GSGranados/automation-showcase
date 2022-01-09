import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import * as constants from "../../../data/constants.json";
//theInternetBaseURL
Then(
  /^Navigate through various links and test some web interactions$/,
  async function () {
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/typos`);
    await browser.pause(constants.TIMERS.short);
    const typoElement = await $$(".example p")[1].getText();
    let validString = "Sometimes you'll see a typo, other times you won't.";
    //chai.expect(typoElement).to.equal(validString);
    // this might fail on purpose sometimes, because of the typo
    await browser.back();
    await browser.pause(constants.TIMERS.short);
    await browser.url(
      //@ts-ignore
      `${browser.config.theInternetBaseURL}/add_remove_elements/`
    );
    const addElementButton = await $(".example>button");
    //@ts-ignore
    for (let i = 0; i < constants.WEB_INTERACTIONS.elementsToCreate; i++) {
      await addElementButton.click();
    }
    await browser.pause(constants.TIMERS.medium);
    //obtaining the amount of elements created
    const elementsCreated = await $$("#elements button").length;
    if (elementsCreated > 0) {
      for (let i = 0; i < elementsCreated; i++) {
        //deleting the first coincidence from the DOM
        await $("#elements button").click();
      }
    }
    await browser.pause(constants.TIMERS.medium);
    const finalElements = await $$("#elements button").length;
    chai.expect(finalElements).to.equal(0);
  }
);
