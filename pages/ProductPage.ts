import { Page } from 'playwright';

export class ProductPage {
  private readonly searchInput = '#search_product';
  private readonly searchButton = '#submit_search';
  private readonly productNames = '.productinfo p';
  private readonly productCards = '.features_items .col-sm-4';
  private readonly addToCartLink = 'a.add-to-cart';

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/products');
  }

  async searchProduct(keyword: string): Promise<void> {
    await this.page.fill(this.searchInput, keyword);
    await this.page.click(this.searchButton);
  }

  async getSearchResults(): Promise<string[]> {
    const elements = await this.page.locator(this.productNames).allInnerTexts();
    return elements;
  }

  async addToCartByIndex(index: number): Promise<void> {
    const card = this.page.locator(this.productCards).nth(index);
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await this.page.waitForTimeout(500);
    await card.locator(this.addToCartLink).first().click({ force: true });
    const modalButton = this.page.locator('button:has-text("Continue Shopping")');
    await modalButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await modalButton.isVisible().catch(() => false)) {
      await modalButton.click();
    }
  }

}
