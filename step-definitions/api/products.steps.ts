import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { ProductClient } from '../../clients/ProductClient';
import { assertStatusCode } from '../../support/assertions';

let productClient: ProductClient;
let lastResponse: import('playwright').APIResponse;

Given('I have an API request context', async function (this: CustomWorld) {
  productClient = new ProductClient(this.request);
});

When('I send a GET request to the products list', async function (this: CustomWorld) {
  productClient = new ProductClient(this.request);
  lastResponse = await productClient.getAllProducts();
  this.scenarioData['lastResponse'] = lastResponse;
});

When('I send a POST request to the products list', async function (this: CustomWorld) {
  productClient = new ProductClient(this.request);
  lastResponse = await productClient.postProductsList();
  this.scenarioData['lastResponse'] = lastResponse;
});

When('I send a GET request to the brands list', async function (this: CustomWorld) {
  productClient = new ProductClient(this.request);
  lastResponse = await productClient.getAllBrands();
  this.scenarioData['lastResponse'] = lastResponse;
});

When('I send a PUT request to the brands list', async function (this: CustomWorld) {
  productClient = new ProductClient(this.request);
  lastResponse = await productClient.putBrandsList();
  this.scenarioData['lastResponse'] = lastResponse;
});

Then('the response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  await assertStatusCode(response, statusCode);
});

Then('the products list should not be empty', async function (this: CustomWorld) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const body = await response.json() as { products?: unknown[] };
  const { expect } = await import('@playwright/test');
  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  expect((body.products as unknown[]).length).toBeGreaterThan(0);
});

Then('the brands list should not be empty', async function (this: CustomWorld) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const body = await response.json() as { brands?: unknown[] };
  const { expect } = await import('@playwright/test');
  expect(body.brands).toBeDefined();
  expect(Array.isArray(body.brands)).toBe(true);
  expect((body.brands as unknown[]).length).toBeGreaterThan(0);
});
