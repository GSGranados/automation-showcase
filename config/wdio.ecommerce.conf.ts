//http://automationpractice.com
import { config as baseConfig } from "../wdio.conf";

export const config = Object.assign(baseConfig, {
  //ALL TEST ENV SPECIFICATIONS
  environment: "TEST-ecommerce-POM",
  ecommerceBaseURL: "https://www.saucedemo.com",
});
