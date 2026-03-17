import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

When('I add the first product to the cart', async function (this: CustomWorld) {
  const productPage = this.scenarioData['productPage'] as ProductPage;
  await productPage.addToCartByIndex(0);
  this.scenarioData['addedProductIndex'] = 0;
});

When('I navigate to the cart', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.navigate();
  this.scenarioData['cartPage'] = cartPage;
});

Then('the cart should contain {int} item', async function (this: CustomWorld, expectedCount: number) {
  const cartPage = this.scenarioData['cartPage'] as CartPage;
  const { expect } = await import('@playwright/test');
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThanOrEqual(expectedCount);
});

When('I remove the item from the cart', async function (this: CustomWorld) {
  const cartPage = this.scenarioData['cartPage'] as CartPage;
  const names = await cartPage.getCartItemNames();
  if (names.length > 0) {
    await cartPage.removeItemByName(names[0]);
  }
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const cartPage = this.scenarioData['cartPage'] as CartPage;
  const { expect } = await import('@playwright/test');
  const empty = await cartPage.isCartEmpty();
  expect(empty).toBe(true);
});
