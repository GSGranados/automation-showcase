import { BeforeStep } from "@wdio/cucumber-framework";

BeforeStep(function () {
  //@ts-ignore
  this.testid = browser.config.testid;
});
