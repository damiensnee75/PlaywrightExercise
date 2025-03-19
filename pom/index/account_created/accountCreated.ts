import { type Locator, type Page } from "@playwright/test";

export class AccountCreatedPage {
  readonly page: Page;
  readonly url: string;
  readonly title: string;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://automationexercise.com/account_created";
    this.title = "Automation Exercise - Account Created";
    this.continueButton = page.getByTestId("continue-button");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}
