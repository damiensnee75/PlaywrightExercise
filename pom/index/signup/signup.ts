import { type Locator, type Page } from "@playwright/test";

export class SignupPage {
  readonly page: Page;
  readonly url: string;
  readonly title: string;
  readonly signUpLoginLink: Locator;
  readonly enterAccountInfoHeading: Locator;
  readonly titleRadio: Locator;
  readonly nameTextbox: Locator;
  readonly emailTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly dobDayDD: Locator;
  readonly dobMonthDD: Locator;
  readonly dobYearDD: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly companyTextbox: Locator;
  readonly addressFirstLineTextbox: Locator;
  readonly addressSecondLineTextbox: Locator;
  readonly countryDD: Locator;
  readonly stateTextbox: Locator;
  readonly cityTextbox: Locator;
  readonly zipcodeTextbox: Locator;
  readonly mobileNumberTextbox: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "https://automationexercise.com/signup";
    this.title = "Automation Exercise - Signup";
    this.enterAccountInfoHeading = page.locator("a", {
      hasText: "Enter Account Information",
    });
    this.titleRadio = page.getByTestId("title");
    this.passwordTextbox = page.getByTestId("password");
    this.dobDayDD = page.getByTestId("days");
    this.dobMonthDD = page.getByTestId("months");
    this.dobYearDD = page.getByTestId("years");
    this.firstNameTextbox = page.getByTestId("first_name");
    this.lastNameTextbox = page.getByTestId("last_name");
    this.companyTextbox = page.getByTestId("company");
    this.addressFirstLineTextbox = page.getByTestId("address");
    this.addressSecondLineTextbox = page.getByTestId("address2");
    this.countryDD = page.getByTestId("country");
    this.stateTextbox = page.getByTestId("state");
    this.cityTextbox = page.getByTestId("city");
    this.zipcodeTextbox = page.getByTestId("zipcode");
    this.mobileNumberTextbox = page.getByTestId("mobile_number");
    this.createAccountButton = page.getByTestId("create-account");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async checkTitleRadio(sex: string) {
    if (sex == "male") {
      await this.titleRadio.getByLabel("Mr.").click();
    } else if (sex == "female") {
      await this.titleRadio.getByLabel("Mrs.").click();
    }
  }

  async enterPassword(password: string) {
    await this.passwordTextbox.fill(password);
  }

  async selectDobDay(day: string) {
    await this.dobDayDD.click();
    await this.dobDayDD.selectOption({ value: day });
  }

  async selectDobMonth(month: string) {
    await this.dobMonthDD.click();
    await this.dobMonthDD.selectOption({ value: month });
  }

  async selectDobYear(year: string) {
    await this.dobYearDD.click();
    await this.dobYearDD.selectOption({ value: year });
  }

  async fillFirstName(firstName: string) {
    await this.firstNameTextbox.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameTextbox.fill(lastName);
  }

  async fillCompany(company: string) {
    await this.companyTextbox.fill(company);
  }

  async fillAddress(
    addressFirstLine: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    addressSecondLine?: string,
  ) {
    await this.addressFirstLineTextbox.fill(addressFirstLine);

    if (addressSecondLine) {
      await this.addressSecondLineTextbox.fill(addressSecondLine);
    }
    await this.countryDD.selectOption({ value: country });
    await this.stateTextbox.fill(state);
    await this.cityTextbox.fill(city);
    await this.zipcodeTextbox.fill(zipcode);
  }

  async fillMobileNumber(mobileNumber: string) {
    await this.mobileNumberTextbox.fill(mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}
