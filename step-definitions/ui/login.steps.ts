import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../fixtures/users.json';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  this.scenarioData['loginPage'] = loginPage;
});

When('I enter valid login credentials', async function (this: CustomWorld) {
  const loginPage = this.scenarioData['loginPage'] as LoginPage;
  await loginPage.login(users.validUser.email, users.validUser.password);
});

When('I enter invalid login credentials', async function (this: CustomWorld) {
  const loginPage = this.scenarioData['loginPage'] as LoginPage;
  await loginPage.login(users.invalidUser.email, users.invalidUser.password);
});

Then('I should be logged in successfully', async function (this: CustomWorld) {
  const loginPage = this.scenarioData['loginPage'] as LoginPage;
  const { expect } = await import('@playwright/test');
  const loggedIn = await loginPage.isLoggedIn();
  expect(loggedIn).toBe(true);
});

Then('I should see a login error message', async function (this: CustomWorld) {
  const loginPage = this.scenarioData['loginPage'] as LoginPage;
  const errorMsg = await loginPage.getErrorMessage();
  const { expect } = await import('@playwright/test');
  expect(errorMsg).toContain('incorrect');
});
