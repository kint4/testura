import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { RegisterPage } from '../../pages/RegisterPage';
import { UserFactory } from '../../utils/faker.factory';
import { AccountClient } from '../../clients/AccountClient';

Given('I am on the registration page', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.navigate();
  this.scenarioData['registerPage'] = registerPage;
});

When('I enter my name and email for signup', async function (this: CustomWorld) {
  const registerPage = this.scenarioData['registerPage'] as RegisterPage;
  const user = UserFactory.create();
  this.scenarioData['newUser'] = user;
  await registerPage.enterSignupDetails(user.name, user.email);
});

When('I fill in the account details', async function (this: CustomWorld) {
  const registerPage = this.scenarioData['registerPage'] as RegisterPage;
  const user = this.scenarioData['newUser'] as ReturnType<typeof UserFactory.create>;
  await registerPage.fillAccountDetails(user);
});

When('I submit the registration form', async function (this: CustomWorld) {
  const registerPage = this.scenarioData['registerPage'] as RegisterPage;
  await registerPage.submitRegistration();
});

Then('I should see the account created confirmation', async function (this: CustomWorld) {
  const registerPage = this.scenarioData['registerPage'] as RegisterPage;
  const { expect } = await import('@playwright/test');
  const success = await registerPage.isRegistrationSuccessful();
  expect(success).toBe(true);
});
