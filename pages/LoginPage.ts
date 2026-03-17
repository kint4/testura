import { Page } from 'playwright';

export class LoginPage {
  private readonly emailInput = 'input[data-qa="login-email"]';
  private readonly passwordInput = 'input[data-qa="login-password"]';
  private readonly loginButton = 'button[data-qa="login-button"]';
  private readonly errorMessage = 'p:has-text("Your email or password is incorrect!")';
  private readonly loggedInIndicator = 'a:has-text("Logout")';

  constructor(private readonly page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.page.locator(this.errorMessage).innerText();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.locator(this.loggedInIndicator).isVisible();
  }
}
