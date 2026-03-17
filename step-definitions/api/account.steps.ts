import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { AccountClient } from '../../clients/AccountClient';
import { UserFactory, UserData } from '../../utils/faker.factory';
import { assertStatusCode } from '../../support/assertions';

Given('I have new user account details', async function (this: CustomWorld) {
  this.scenarioData['newUser'] = UserFactory.create();
});

When('I create a new account via API', async function (this: CustomWorld) {
  const client = new AccountClient(this.request);
  const user = this.scenarioData['newUser'] as UserData;
  const response = await client.createAccount(user);
  this.scenarioData['lastResponse'] = response;
});

When('I update the account via API', async function (this: CustomWorld) {
  const client = new AccountClient(this.request);
  const user = this.scenarioData['newUser'] as UserData;
  const updatedUser = { ...user, firstname: 'Updated', lastname: 'User' };
  const response = await client.updateAccount(updatedUser);
  this.scenarioData['lastResponse'] = response;
});

When('I delete the account via API', async function (this: CustomWorld) {
  const client = new AccountClient(this.request);
  const user = this.scenarioData['newUser'] as UserData;
  const response = await client.deleteAccount({ email: user.email, password: user.password });
  this.scenarioData['lastResponse'] = response;
});

When('I request user details by email', async function (this: CustomWorld) {
  const client = new AccountClient(this.request);
  const user = this.scenarioData['newUser'] as UserData;
  const response = await client.getUserByEmail(user.email);
  this.scenarioData['lastResponse'] = response;
});

Then('the account response message should be {string}', async function (this: CustomWorld, expectedMessage: string) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const body = await response.json() as { message?: string };
  const { expect } = await import('@playwright/test');
  expect(body.message).toBe(expectedMessage);
});

Then('the user detail response should contain the email', async function (this: CustomWorld) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const user = this.scenarioData['newUser'] as UserData;
  const body = await response.json() as { user?: { email?: string } };
  const { expect } = await import('@playwright/test');
  expect(body.user).toBeDefined();
  expect(body.user?.email).toBe(user.email);
});
