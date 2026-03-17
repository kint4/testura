import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { AuthClient } from '../../clients/AuthClient';
import { assertStatusCode } from '../../support/assertions';
import users from '../../fixtures/users.json';

When('I verify login with the provided credentials', async function (this: CustomWorld) {
  const client = new AuthClient(this.request);
  const creds = this.scenarioData['credentials'] as { email: string; password: string };
  const response = await client.verifyLogin(creds);
  this.scenarioData['lastResponse'] = response;
});

When('I verify login without providing an email', async function (this: CustomWorld) {
  const client = new AuthClient(this.request);
  const response = await client.verifyLoginMissingEmail(users.validUser.password);
  this.scenarioData['lastResponse'] = response;
});

When('I verify login without providing a password', async function (this: CustomWorld) {
  const client = new AuthClient(this.request);
  const response = await client.verifyLoginMissingPassword(users.validUser.email);
  this.scenarioData['lastResponse'] = response;
});

Given('I have valid user credentials', async function (this: CustomWorld) {
  this.scenarioData['credentials'] = {
    email: users.validUser.email,
    password: users.validUser.password,
  };
});

Given('I have invalid user credentials', async function (this: CustomWorld) {
  this.scenarioData['credentials'] = {
    email: users.invalidUser.email,
    password: users.invalidUser.password,
  };
});

Then('the response message should be {string}', async function (this: CustomWorld, expectedMessage: string) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const body = await response.json() as { message?: string };
  const { expect } = await import('@playwright/test');
  expect(body.message).toBe(expectedMessage);
});
