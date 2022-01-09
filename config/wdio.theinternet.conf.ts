import { config as baseConfig } from "../wdio.conf";

export const config = Object.assign(baseConfig, {
  //ALL TEST ENV SPECIFICATIONS
  environment: "TEST-TheInternetHerokuApp",
  theInternetBaseURL: "https://the-internet.herokuapp.com",
});
