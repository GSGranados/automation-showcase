import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import * as constants from "../../../data/constants.json";
import EcommercePage from "../../page-objects/Ecommerce.page";
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
    await browser.pause(constants.TIMERS.short);
    //obtaining the amount of elements created
    const elementsCreated = await $$("#elements button").length;
    if (elementsCreated > 0) {
      for (let i = 0; i < elementsCreated; i++) {
        //deleting the first coincidence from the DOM
        await $("#elements button").click();
      }
    }
    await browser.pause(constants.TIMERS.short);
    const finalElements = await $$("#elements button").length;
    chai.expect(finalElements).to.equal(0);

    await browser.back();

    //Cheboxes
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/checkboxes`);
    //obtaining the container
    const checkboxes = await $$("#checkboxes input");
    for (let i = 0; i < checkboxes.length; i++) {
      if (!(await checkboxes[i].isSelected())) {
        await checkboxes[i].click();
      }
    }
    await browser.pause(constants.TIMERS.short);
    await browser.back();
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/dropdown`);
    //validate if it has a default selected option as a placeholder
    const defaultOption = await $(
      '//select[@id="dropdown"]/option[@selected="selected"]'
    );
    chai
      .expect(await defaultOption.getText())
      .to.equal(constants.WEB_INTERACTIONS.dropdownText);
    await browser.pause(constants.TIMERS.short);
    const dropdownMenu = await $("#dropdown");
    await dropdownMenu.selectByVisibleText(
      constants.WEB_INTERACTIONS.dropdownOption
    );
    await browser.back();
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/login`);
    const loginForm = await $("#login");
    const userNameInput = await loginForm.$(
      '.row:nth-child(1) div input[name="username"]'
    );
    const passwordInput = await loginForm.$(
      '.row:nth-child(2) div input[name="password"]'
    );
    const loginButton = await loginForm.$("button");
    //providing login credentials
    await userNameInput.setValue(constants.WEB_INTERACTIONS.login_username);
    await passwordInput.setValue(constants.WEB_INTERACTIONS.login_password);
    await loginButton.click();
    const successMessageFlash = await $(".flash.success").getText();
    const successMessage = successMessageFlash.trim().split("\n")[0];
    //making assertions to make sure we logged in properly
    chai
      .expect(successMessage)
      .to.equal(constants.WEB_INTERACTIONS.login_success);
    await browser.pause(constants.TIMERS.short);
    await browser.back();
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/iframe`);
    const iframe = await $("#mce_0_ifr");
    await browser.switchToFrame(iframe);
    await $("#tinymce").click();
    await browser.keys(["Control", "A"]);
    await browser.pause(constants.TIMERS.medium);
    await browser.keys("Delete");
    await $("#tinymce").setValue(constants.WEB_INTERACTIONS.iFrame_text);
    await browser.switchToParentFrame();
    await browser.pause(constants.TIMERS.short);
    await browser.back();
  }
);

Then(
  /^Applying all automation knowledge, use an effective selector strategy to obtain and assert certain data$/,
  async function () {
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/tables`);
    //Automation pratice: obtain only the rows that contain exactly $50 due

    const rowCount = await $$('//table[@id="table1"]/tbody/tr').length;
    chai.expect(rowCount).to.equal(4);
    let arr = [];
    for (let i = 0; i < rowCount; i++) {
      let price = await $(
        `//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`
      ).getText();
      let firstName = await $(
        `//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`
      ).getText();
      if (Number(price.replace("$", "")) === 50) {
        arr.push(firstName);
      }
    }
    console.log(arr);

    //Uploading files
    await browser.back();
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/upload`);
    await browser.pause(constants.TIMERS.short);
    await $("#file-upload").addValue(
      `${process.cwd()}/${constants.WEB_INTERACTIONS.upload_path}`
    );
    await $("#file-submit").click();
    await browser.pause(constants.TIMERS.short);
    //JS Alerts

    await browser.back();
    //@ts-ignore
    await browser.url(`${browser.config.theInternetBaseURL}/javascript_alerts`);
    await $("button=Click for JS Prompt").click();
    if (await browser.isAlertOpen()) {
      const sendText = "Hello JS prompt";
      await browser.sendAlertText(sendText);
      let alertText = await browser.getAlertText();
      await browser.acceptAlert();
      chai.expect(alertText).to.equal(constants.WEB_INTERACTIONS.alert_text);
      chai
        .expect(await $("#result").getText())
        .to.equal(`${constants.WEB_INTERACTIONS.result_text} ${sendText}`);
      await browser.pause(constants.TIMERS.medium);
    }
  }
);

Then(
  /^Start adding (.*) products to the cart$/,
  async function (numberOfProducts) {
    EcommercePage.addProductsToCart(this.testid, numberOfProducts);
    await browser.pause(constants.TIMERS.short);
    EcommercePage.proceedToCheckout(this.testid);
    await browser.pause(constants.TIMERS.short);
    EcommercePage.filloutCheckoutForm(
      this.testid,
      process.env.FIRSTNAME,
      process.env.LASTNAME,
      process.env.ZIP
    );
    await browser.pause(constants.TIMERS.large);
    EcommercePage.verifyingSummary(this.testid);
    await browser.pause(constants.TIMERS.large);
  }
);
