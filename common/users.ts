import { faker } from "@faker-js/faker";
import * as valid from "../common/validEntries.json";

export class User {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly sex: string;
  readonly dob: Date;
  readonly company: string;
  readonly addressFirstLine: string;
  readonly addressSecondLine: string;
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly zipcode: string;
  readonly mobileNumber: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.sex = faker.person.sex();
    this.dob = new Date(faker.date.birthdate());
    this.company = faker.company.name();
    this.addressFirstLine = faker.location.streetAddress();
    this.addressSecondLine = faker.location.secondaryAddress();
    this.country =
      valid.countries[Math.floor(Math.random() * valid.countries.length)];
    this.state = faker.location.state();
    this.city = faker.location.city();
    this.zipcode = faker.location.zipCode();
    this.mobileNumber = faker.phone.number();
  }

  async getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }

  async getFirstName() {
    return this.firstName;
  }

  async getLastName() {
    return this.lastName;
  }

  async getEmail() {
    return this.email;
  }

  async getPassword() {
    return this.password;
  }

  async getSex() {
    return this.sex;
  }

  async getDob() {
    const dob = this.dob;
    return {
      day: dob.getDate(),
      month: dob.getMonth() + 1,
      year: dob.getFullYear(),
    };
  }

  async getCompany() {
    return this.company;
  }

  async getAddressFirstLine() {
    return this.addressFirstLine;
  }

  async getAddressSecondLine() {
    return this.addressSecondLine;
  }

  async getCountry() {
    return this.country;
  }

  async getState() {
    return this.state;
  }

  async getCity() {
    return this.city;
  }

  async getZipcode() {
    return this.zipcode;
  }

  async getMobileNumber() {
    return this.mobileNumber;
  }
}
