import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { ProductClient } from '../../clients/ProductClient';
import { assertStatusCode } from '../../support/assertions';

When('I search for a product with keyword {string}', async function (this: CustomWorld, keyword: string) {
  const client = new ProductClient(this.request);
  const response = await client.searchProduct(keyword);
  this.scenarioData['lastResponse'] = response;
  this.scenarioData['searchKeyword'] = keyword;
});

When('I search for a product without providing a keyword', async function (this: CustomWorld) {
  const client = new ProductClient(this.request);
  const response = await client.searchProductWithoutKeyword();
  this.scenarioData['lastResponse'] = response;
});

Then('the search results should contain products matching {string}', async function (this: CustomWorld, keyword: string) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  const body = await response.json() as { products?: Array<{ name: string }> };
  const { expect } = await import('@playwright/test');
  expect(body.products).toBeDefined();
  expect(Array.isArray(body.products)).toBe(true);
  const products = body.products as Array<{ name: string }>;
  expect(products.length).toBeGreaterThan(0);
  const allMatch = products.some(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
  expect(allMatch).toBe(true);
});

Then('the response should indicate a bad request', async function (this: CustomWorld) {
  const response = this.scenarioData['lastResponse'] as import('playwright').APIResponse;
  await assertStatusCode(response, 400);
});
