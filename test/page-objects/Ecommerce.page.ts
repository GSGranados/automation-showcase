import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";

class EcommercePage extends Page {
  constructor() {
    super();
  }

  /**
   *  await $("#user-name").setValue(process.env.TEST_STD_USERNAME);
      await $("#password").setValue(process.env.TEST_STD_PASSWORD);
      await browser.pause(1000);
      await $("#login-button").click();
   */

  /**Page Objects */
  get usernameInputBox() {
    return $("#user-name");
  }
  get passwordInputBox() {
    return $("#password");
  }
  get loginBtn() {
    return $("#login-button");
  }
  get AddToCartButtons() {
    return $$(".inventory_list .inventory_item_description .pricebar button");
  }
  get cartButton() {
    return $(".shopping_cart_link");
  }
  get checkoutButton() {
    return $("#checkout");
  }

  get firstNameInput() {
    return $("#first-name");
  }
  get lastNameInput() {
    return $("#last-name");
  }
  get zipInput() {
    return $("#postal-code");
  }
  get continueButton() {
    return $("#continue");
  }
  get unitPrices() {
    return $$(".inventory_item_price");
  }
  get subTotalLabel() {
    return $(".summary_subtotal_label");
  }
  get finishButton() {
    return $("#finish");
  }
  get backHomeButton() {
    return $("#back-to-products");
  }

  /**Page Actions */
  /**
   *
   * @param testId If we will user the reporter helper tool for crashing purposes, having the
   * testID it is a great practice to trace bugs
   */
  async enterUsername(testId: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(
        testId,
        "info",
        `Username: ${username} entered successfully`
      );
    } catch (err) {
      err.message = `Error entering username: ${username}, ${err.message}`;
      throw err;
    }
  }
  async enterPassword(testId: string, password: string) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testId, "info", `Password entered successfully`);
    } catch (err) {
      err.message = `Error entering password, ${err.message}`;
      throw err;
    }
  }

  async clickLoginButton(testId: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testId, "info", "Login Button clicked successfully");
    } catch (error) {
      error.message = `Error clicking the login Button, ${error.message}`;
    }
  }

  async loginToSauseApp(testId: string, username: string, password: string) {
    try {
      await this.enterUsername(testId, username);
      await this.enterPassword(testId, password);
      await this.clickLoginButton(testId);
    } catch (err) {
      throw err;
    }
  }

  async addProductsToCart(testId: string, numberOfProducts: number) {
    try {
      const buttonsArray = await this.AddToCartButtons;
      for (let i = 0; i < numberOfProducts; i++) {
        await buttonsArray[i].click();
      }
      reporter.addStep(
        testId,
        "info",
        `Adding ${numberOfProducts} products to the shopping cart`
      );
    } catch (error) {
      error.message = `Error adding products to the shopping cart, ${error.message}`;
      throw error;
    }
  }

  async proceedToCheckout(testId: string) {
    try {
      await this.click(await this.cartButton);
      reporter.addStep(testId, "info", "Proceeding to the cart summary");
      await this.click(await this.checkoutButton);
      reporter.addStep(testId, "info", "Proceeding to the checkout form");
    } catch (error) {
      error.message = `There was an error reaching the checkout information form, ${error.message}`;
      throw error;
    }
  }
  async filloutCheckoutForm(
    testId: string,
    firstName: string,
    lastName: string,
    zip: string
  ) {
    try {
      await this.typeInto(await this.firstNameInput, firstName);
      await this.typeInto(await this.lastNameInput, lastName);
      await this.typeInto(await this.zipInput, zip);
      await this.click(await this.continueButton);
      reporter.addStep(testId, "info", "Filling out the Checkout information");
    } catch (error) {
      error.message = `Error attempting to fill out the checkout information form, ${error.message}`;
    }
  }
  async verifyingSummary(testId: string) {
    try {
      const unitPrices = await this.unitPrices;
      let subTotal = 0;
      for (let i = 0; i < unitPrices.length; i++) {
        const unitPrice = (await unitPrices[i].getText()).trim().split("$")[1];
        subTotal += Number(unitPrice);
      }
      //asserting the prices
      const actualSubTotal = (await this.subTotalLabel.getText()).split("$")[1];
      chai.expect(subTotal).to.equal(Number(actualSubTotal));
      reporter.addStep(
        testId,
        "info",
        `Verifying the subTotal summary: expected - ${actualSubTotal} ; actual - ${subTotal} `
      );
      await this.click(await this.finishButton);
      await this.click(await this.backHomeButton);
    } catch (error) {
      error.message = `There was en error asserting the product prices, ${error.message}`;
      throw error;
    }
  }
}
export default new EcommercePage();
