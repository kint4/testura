import { Page } from 'playwright';

export class CartPage {
  private readonly cartRows = '#cart_info_table tbody tr';
  private readonly productNameCells = '.cart_description h4 a';
  private readonly deleteButtons = '.cart_quantity_delete';

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/view_cart');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(this.productNameCells).allInnerTexts();
  }

  async removeItemByName(name: string): Promise<void> {
    const rows = this.page.locator(this.cartRows);
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const text = await row.locator(this.productNameCells).innerText().catch(() => '');
      if (text.trim() === name) {
        await row.locator(this.deleteButtons).click();
        await this.page.waitForTimeout(500);
        return;
      }
    }
    throw new Error(`Product "${name}" not found in cart`);
  }

  async getCartItemCount(): Promise<number> {
    return this.page.locator(this.cartRows).count();
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemCount();
    return count === 0;
  }
}
