import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly title: string;
  readonly signUpLoginLink: Locator;
  readonly loginHeader: Locator;
  readonly newUserHeader: Locator;
  readonly nameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://automationexercise.com/login";
    this.title = "Automation Exercise - Signup / Login";
    this.signUpLoginLink = page.locator("a", { hasText: " Signup / Login" });
    this.loginHeader = page.locator("h2", { hasText: "Login to your account" });
    this.newUserHeader = page.locator("h2", { hasText: "New User Signup!" });

    // data-qa attributes have been set in html and testIdAttribute set in
    // playwright.config.ts to allow their use with getByTestId
    this.nameTextbox = page.getByTestId("signup-name");
    this.emailTextbox = page.getByTestId("signup-email");
    this.signUpButton = page.getByTestId("signup-button");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(this.title);
  }

  async assertLoginNewUserHeadings() {
    await expect(this.loginHeader).toBeVisible();
    await expect(this.newUserHeader).toBeVisible();
  }

  async enterName(name: string) {
    await this.nameTextbox.fill(name);
  }

  async enterEmail(email: string) {
    await this.emailTextbox.fill(email);
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }
}
