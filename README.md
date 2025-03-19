# Playwright_Automation_Exercise

## Overview

Some example Playwright Automated Tests in Typescript

## Project setup

- Install node.js for your OS, from [https://nodejs.org/en/download]https://nodejs.org/en/download
- Create a local project directory
- Open a terminal and navigate to your local project directory (ls command shows sub directories of you current directory, cd directory-name will take you into that directory, cd .. will take you up a level)
- From the terminal, in your project directory use command git clone **https://github.com/damiensnee75/Playwright_Automation_Exercise** to clone the repo to your local directory
- Open the project in your preferred code editor
- From the terminal, in your project directory, give the following to install dependencies: **npm install**

## Test Execution

- Open a terminal at the root of the project
- To run all tests in headless mode, use command: **npx playwright test**
- To run a specific test file: **npx playwright test *relative_path_to_test_file*** e.g **npx playwright test /tests/userRegistrationFlow.spec.ts**
- To run all tests in headed mode (see execution in a browser): **npx playwright test --headed**
- To run all tests in a Playwright ui: **npx playwright test /tests/userRegistrationFlow.spec.ts**

## Reporting

- The allure library has been implemented to give an alternative to the default Playwright execution report. After execution of the tests, the allure report can be generated and displayed using command: **npx allure serve allure-results**

## Project structure

The project follows the page object model. Page object files are located in /pom. Each page object file contains a class with properties defining types, a constructor to initialise the instance and methods which can be called and executed from outside the class. Page elements and interactions with those elements are captured inside the page object class. Typically, each web page would have its own class.
Other classes, not specific to a web page, are located in /common. An example here is the User class, where the faker-js library is being used to generate random but representative user data.
The page object classes do not reference the User class directly. This has been done so both page interactions and any data used in those interactions can be seen by looking at the test file. The test file could look neater by abstracting some of the detail away, having the page object files reference the User class but this was a deliberate choice. 
Where available data-qa attributes added to HTML elements have been used for locators so the use of flaky css locators are not necessary. The playwright.config has been amended to make their use possible.
An example of visual testing is given in the first userRegistrationFlow test.

## Hooks

The test.describe hook has been used to make two groups of tests in the userRegistrationFlow.spec.ts test file. This separates the first and second parts of the registration process. The 2 groups have a common beforeEach hook but the second group also has an afterEach hook to delete the accounts that would be created by the tests in the second group.

## Further Improvements

At the moment the registration is considered successful if the /account_created page is reached. An additional check posting the email and password to the /verifyLogin endpoint would be added.
With more time, additional tests would be created for Product Search and Filtering and Shopping Cart functionality. As access to some of this functionality requires the user to be logged in it would be necessary to authenticate the user before visiting and interacting with the relevant pages. In addition to test for logging in through the UI, a function would be created to login by API, removing the need for repetitive logging in via the UI. A function to capture browser logged in state, which could be reinstated when required would also be introduced.



