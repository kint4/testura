import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { ProductPage } from '../../pages/ProductPage';

Given('I am on the products page', async function (this: CustomWorld) {
  const productPage = new ProductPage(this.page);
  await productPage.navigate();
  this.scenarioData['productPage'] = productPage;
});

When('I search for {string}', async function (this: CustomWorld, keyword: string) {
  const productPage = this.scenarioData['productPage'] as ProductPage;
  await productPage.searchProduct(keyword);
  this.scenarioData['searchKeyword'] = keyword;
});

Then('I should see search results', async function (this: CustomWorld) {
  const productPage = this.scenarioData['productPage'] as ProductPage;
  const results = await productPage.getSearchResults();
  const { expect } = await import('@playwright/test');
  expect(results.length).toBeGreaterThan(0);
});

Then('all results should be related to {string}', async function (this: CustomWorld, keyword: string) {
  const productPage = this.scenarioData['productPage'] as ProductPage;
  const results = await productPage.getSearchResults();
  const { expect } = await import('@playwright/test');
  expect(results.length).toBeGreaterThan(0);
  const allMatch = results.every(name => name.toLowerCase().includes(keyword.toLowerCase()));
  expect(allMatch, `Expected all results to contain "${keyword}" but got: ${results.join(', ')}`).toBe(true);
});
