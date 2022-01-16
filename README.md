# Automation Showcase

## _A simple implementation of an automation framework using WDIO + TS + Chai + Cucumber + Supertest and Allure for reporting._

DThe main purpose of this repository is to showcase all the extent I can cover when it comes to automate E2E tests and follow a variety of user flows, using:

- WebDriver IO on Async mode.
- Typescript.
- Cucumber for Data Driven Testing.
- Allure for Reporting.
- Custom world objects to manage different testing environments.
- Supertest for API testing.
- POM for one of the feature files.
- Chai as an Assertion library.

### What did we cover?

- A bunch of web interactions using a normal feature and step definition files in normal capability mode.
- Automating an Ecommerce flow using the POM pattern and reporting all the step definition flow within Allure.
- Running an API step definition in headless mode.
- Each of these scenarios was covered in a separated config file and with a different test script withing the package.json.

## Installation

This implementation requires [Node.js](https://nodejs.org/) v16+ (LTS) to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
npm run test:demo
```

And that is it! You will be able to run one of the automation files. But let's talk about what differentiates each of the 3 automations tests.

## _Basic implementation - web interaction showcase (The internet Heroku app)_

First, we need to talk about the location of our files

##### Features:

[!Feature location](./assets/feature_location.png)
Those are located at:

```sh
test/features/*.feature
```

[!Feature File](./assets/feature_file.png)

##### Step Definitions:

[! Step definitions](./assets/step_definitions.png)

Those are located at:

```sh
test/features/step-definitions/*.ts
```

These steps definitions were divided based on the Gherkin language that Cucumber framework supports:

- Given
- Then
- When
- Other custom files for easy step managements (World and Hooks)

For our first implementation it is located at:

test/features/demo/demo.feature

[! Demo Feature](./assets/demo_feature.png)

Here it is described in a human readable language what is going to be automated and we provided a data table for development with the Test ID and the search term that will be used to automate this test.

To run this test, just open a terminal within VS code or a command prompt and go to the project root and type

```sh
npm run test:demo
```

> This will go and look for the initial template wdio.conf.ts file and provide the cucumber options - tag=@demo (it will run all the feature files that have a "@demo" tag).

## _POM Implementation (Sauce Demo App)_

For this implementation we applied the POM design pattern to convert all the web pages into objects and the Web UI elements we needed for automate a user flow into getters and manipulated those with methods.

Those were located at:

> `test/features/page-objects`

_There will be a Page.TS file with all the basic methods any web page need and that will be inherited to all new Page children - implementations_

[! Page Objects](./assets/page_objects.png)

To run this test, just open a terminal within VS code or a command prompt and go to the project root and type:

```sh
npm run test:pom
```

> This will go and look for the initial template wdio.conf.ts file and provide the cucumber options - tag=@ecommerce (it will run all the feature files that have a "@ecommerce" tag).

## Allure Reports

Since we implemented allure to check the results of our automation scripts, we can run a local server with allure, typing in the therminal:

```sh
allure serve
```

And this will load the overview dashboard with all the general information about our scripts.

[!Allure Reports](./assets/allure_dashboard.png)

##### Considerations

The WDIO config file provides a lot of capabilities, one of those is 'Hooks'. There is a hook executed every time we are preparing the automation session that checks for an environmental variable called RUNNER. If this variable is set to _local_ every time we execute an automation test, the _allure-results_ folder will be eliminated and created again with only the information of the test we're about to run.

[! Runner Variable](./assets/runner_variable.png)

To avoid this, go to `./.env` file and change the value of the RUNNER variable.

## _API Automation (JSON placeholder API)_

This automation test is ran in _headless mode_, Since there is no need to load a capability of Chromedriver.

To run this test, just open a terminal within VS code or a command prompt and go to the project root and type

```sh
npm run test:api
```

All the results of the API will be stored at: `./data/api-res/APIUsers.json`

##### Config files

All the different config files used for each implementation are located at `./config` each config file used the Object.assign method to copy the base config from wdio.conf.ts and overwrite some of the properties.
