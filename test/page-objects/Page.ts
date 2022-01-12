class Page {
  constructor() {}
  async navigateTo(path: string): Promise<void> {
    await browser.url(path);
    await browser.maximizeWindow();
  }
  async click(element: WebdriverIO.Element) {
    await element.waitForClickable({ timeout: 5000 });
    if (!element.elementId) throw Error(element.error.message);
    await element.click();
  }
  async typeInto(element: WebdriverIO.Element, text: string) {
    await element.waitForDisplayed({ timeout: 5000 });
    if (!element.elementId) throw Error(element.error.message);
    await element.setValue(text);
  }
}

export default Page;
