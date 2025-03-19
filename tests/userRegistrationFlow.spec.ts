import { test, expect } from "@playwright/test";
import { HomePage } from "../pom/index/homepage";
import { LoginPage } from "../pom/index/login/login";
import { SignupPage } from "../pom/index/signup/signup";
import { AccountCreatedPage } from "../pom/index/account_created/accountCreated";
import { User } from "../common/users";
import { PageLoad } from "../common/loadTimes";

let homePage: HomePage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;
let user: User;
let pageLoad: PageLoad;

test.describe("New User Initiate Registration", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    user = new User();
    pageLoad = new PageLoad();

    await homePage.goto();
    await page.waitForLoadState();
    await homePage.giveConsentIfVisible();
  });

  test("homepage has title", async ({ page }) => {
    await homePage.verifyTitle();
    // The following shows how visual testing can be achieved
    // the first run will fail but will create a reference screenshot.
    // Subsequent executions will perform a visual comparison between the
    // reference screenshot and a screenshot from the current execution.
    // This test site has lots of dynamic content so further work would be
    // required to hide the varying content or allow for some variance in the
    // visual comparison to prevent failures.
    await expect(page).toHaveScreenshot("homepageScreenshot.png");
  });

  test("signup login link navigates to login page", async ({ page }) => {
    await homePage.clickSignUpLogin();
    await pageLoad.assertPageLoadTimes(page, '/login');
    await page.waitForLoadState();

    await loginPage.verifyTitle();
    await loginPage.assertLoginNewUserHeadings();
    expect(page.url()).toBe(loginPage.url);
  });

  test("unable to sign up if name and email are not given", async ({
    page,
  }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();
    await loginPage.clickSignUp();
    await pageLoad.assertPageLoadTimes(page, '/login');
    await page.waitForLoadState();

    expect(page.url()).toEqual(loginPage.url);
  });

  test("unable to sign up if only name is given", async ({ page }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();
    await loginPage.enterName(await user.getFullName());
    await loginPage.clickSignUp();
    await page.waitForLoadState();
    expect(page.url()).toEqual(loginPage.url);
  });

  test("unable to sign up if only email is given", async ({ page }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();
    await loginPage.enterEmail(await user.getEmail());
    await loginPage.clickSignUp();
    await page.waitForLoadState();
    expect(page.url()).toEqual(loginPage.url);
  });

  test("able to reach sign up if valid name and email are given", async ({
    page,
  }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();
    await loginPage.enterName(await user.getFullName());
    await loginPage.enterEmail(await user.getEmail());
    await loginPage.clickSignUp();
    await page.waitForLoadState();
    expect(page.url()).toEqual(signupPage.url);
  });
});

test.describe("New User Complete Registration", () => {
  let email: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    signupPage = new SignupPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    user = new User();
    pageLoad = new PageLoad();

    await homePage.goto();
    await page.waitForLoadState();
    await homePage.giveConsentIfVisible();
  });

  test("able to complete registration form and submit form with mandatory fields", async ({
    page,
  }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();

    const firstName = await user.getFirstName();
    const lastName = await user.getLastName();
    const fullName = `${firstName} ${lastName}`;
    await loginPage.enterName(fullName);
    email = await user.getEmail();
    await loginPage.enterEmail(email);
    await loginPage.clickSignUp();
    await page.waitForLoadState();

    password = await user.getPassword();
    await signupPage.enterPassword(password);
    const dob = await user.getDob();
    await signupPage.selectDobDay(dob.day.toString());
    await signupPage.selectDobMonth(dob.month.toString());
    await signupPage.selectDobYear(dob.year.toString());
    await signupPage.fillFirstName(firstName);
    await signupPage.fillLastName(lastName);
    await signupPage.fillAddress(
      await user.getAddressFirstLine(),
      await user.getCountry(),
      await user.getState(),
      await user.getCity(),
      await user.getZipcode(),
    );
    await signupPage.fillMobileNumber(await user.getMobileNumber());
    await signupPage.clickCreateAccount();
    await pageLoad.assertPageLoadTimes(page, 'account_created');
    await page.waitForLoadState();
    expect(page.url()).toEqual(accountCreatedPage.url);
  });

  test("able to complete registration form and submit complete form", async ({
    page,
  }) => {
    await homePage.clickSignUpLogin();
    await page.waitForLoadState();

    const firstName = await user.getFirstName();
    const lastName = await user.getLastName();
    const fullName = `${firstName} ${lastName}`;
    await loginPage.enterName(fullName);
    email = await user.getEmail();
    await loginPage.enterEmail(email);
    await loginPage.clickSignUp();
    await page.waitForLoadState();

    const sex = await user.getSex();
    await signupPage.checkTitleRadio(sex);
    password = await user.getPassword();
    await signupPage.enterPassword(password);
    const dob = await user.getDob();
    await signupPage.selectDobDay(dob.day.toString());
    await signupPage.selectDobMonth(dob.month.toString());
    await signupPage.selectDobYear(dob.year.toString());
    await signupPage.fillFirstName(firstName);
    await signupPage.fillLastName(lastName);
    await signupPage.fillCompany(await user.getCompany());
    await signupPage.fillAddress(
      await user.getAddressFirstLine(),
      await user.getCountry(),
      await user.getState(),
      await user.getCity(),
      await user.getZipcode(),
      await user.getAddressSecondLine(),
    );
    await signupPage.fillMobileNumber(await user.getMobileNumber());
    await signupPage.clickCreateAccount();
    await pageLoad.assertPageLoadTimes(page, '/account_created');
    await page.waitForLoadState();
    expect(page.url()).toEqual(accountCreatedPage.url);
  });

  test.afterEach("delete created account", async ({ request }) => {
    await request.delete("https://automationexercise.com/api/deleteAccount", {
      data: {
        email: email,
        password: password,
      },
    });
  });
});
