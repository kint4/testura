import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, request as playwrightRequest } from 'playwright';
import { CustomWorld } from './world';
import { config } from '../config';
import users from '../fixtures/users.json';

let sharedBrowser: import('playwright').Browser;

BeforeAll(async function () {
  sharedBrowser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false' && config.headless,
  });

  // Ensure the shared valid test user exists — delete first (idempotent), then create fresh
  const apiCtx = await playwrightRequest.newContext({ baseURL: config.baseUrl });
  const { name, email, password } = users.validUser;
  await apiCtx.delete('/api/deleteAccount', { form: { email, password } }).catch(() => {});
  const createResponse = await apiCtx.post('/api/createAccount', {
    form: {
      name,
      email,
      password,
      title: 'Mr',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      address1: '123 Test St',
      country: 'United States',
      zipcode: '10001',
      state: 'New York',
      city: 'New York',
      mobile_number: '5551234567',
    },
  });
  const body = await createResponse.json() as { responseCode?: number; message?: string };
  if (body.responseCode !== 201) {
    throw new Error(`BeforeAll: failed to create test user — ${JSON.stringify(body)}`);
  }
  await apiCtx.dispose();
});

AfterAll(async function () {
  // Clean up the shared test user
  const apiCtx = await playwrightRequest.newContext({ baseURL: config.baseUrl });
  await apiCtx.delete('/api/deleteAccount', {
    form: { email: users.validUser.email, password: users.validUser.password },
  });
  await apiCtx.dispose();

  if (sharedBrowser) {
    await sharedBrowser.close();
  }
});

Before({ tags: '@ui' }, async function (this: CustomWorld) {
  this.browser = sharedBrowser;
  this.context = await sharedBrowser.newContext({
    baseURL: config.baseUrl,
    viewport: { width: 1280, height: 720 },
  });
  this.page = await this.context.newPage();
});

After({ tags: '@ui' }, async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  if (this.context) {
    await this.context.close();
  }
});

Before({ tags: '@api' }, async function (this: CustomWorld) {
  this.request = await playwrightRequest.newContext({
    baseURL: config.baseUrl,
  });
});

After({ tags: '@api' }, async function (this: CustomWorld) {
  if (this.request) {
    await this.request.dispose();
  }
});
