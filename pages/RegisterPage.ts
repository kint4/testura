import { Page } from 'playwright';
import { UserData } from '../utils/faker.factory';

export class RegisterPage {
  private readonly nameInput = 'input[data-qa="signup-name"]';
  private readonly emailInput = 'input[data-qa="signup-email"]';
  private readonly signupButton = 'button[data-qa="signup-button"]';
  private readonly titleMrRadio = '#id_gender1';
  private readonly passwordInput = '#password';
  private readonly birthDaySelect = '#days';
  private readonly birthMonthSelect = '#months';
  private readonly birthYearSelect = '#years';
  private readonly firstnameInput = '#first_name';
  private readonly lastnameInput = '#last_name';
  private readonly companyInput = '#company';
  private readonly address1Input = '#address1';
  private readonly address2Input = '#address2';
  private readonly countrySelect = '#country';
  private readonly stateInput = '#state';
  private readonly cityInput = '#city';
  private readonly zipcodeInput = '#zipcode';
  private readonly mobileInput = '#mobile_number';
  private readonly createAccountButton = 'button[data-qa="create-account"]';
  private readonly successHeader = 'h2[data-qa="account-created"]';

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async enterSignupDetails(name: string, email: string): Promise<void> {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.signupButton);
  }

  async fillAccountDetails(user: UserData): Promise<void> {
    await this.page.click(this.titleMrRadio);
    await this.page.fill(this.passwordInput, user.password);
    await this.page.selectOption(this.birthDaySelect, user.birth_date);
    await this.page.selectOption(this.birthMonthSelect, user.birth_month);
    await this.page.selectOption(this.birthYearSelect, user.birth_year);
    await this.page.fill(this.firstnameInput, user.firstname);
    await this.page.fill(this.lastnameInput, user.lastname);
    await this.page.fill(this.companyInput, user.company);
    await this.page.fill(this.address1Input, user.address1);
    await this.page.fill(this.address2Input, user.address2);
    await this.page.selectOption(this.countrySelect, user.country);
    await this.page.fill(this.stateInput, user.state);
    await this.page.fill(this.cityInput, user.city);
    await this.page.fill(this.zipcodeInput, user.zipcode);
    await this.page.fill(this.mobileInput, user.mobile_number);
  }

  async submitRegistration(): Promise<void> {
    await this.page.click(this.createAccountButton);
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    return this.page.locator(this.successHeader).isVisible();
  }
}
