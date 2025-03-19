import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly url: string;
  readonly title: string;
  readonly consent: Locator;
  readonly signUpLoginLink: Locator;

  readonly pomLink: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://automationexercise.com/";
    this.title = "Automation Exercise";
    this.consent = page.getByRole("button", { name: "Consent" });
    this.signUpLoginLink = page.getByRole("link", { name: "login" });
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyTitle() {
    await expect(this.page).toHaveTitle(this.title);
  }

  async giveConsentIfVisible() {
    if (await this.consent.isVisible()) {
      await this.consent.click();
    }
  }

  async clickSignUpLogin() {
    await this.signUpLoginLink.click();
  }
}
