import { expect, Page, APIResponse } from '@playwright/test';

export async function assertStatusCode(response: APIResponse, expected: number): Promise<void> {
  let body: { responseCode?: number } = {};
  try {
    body = await response.json() as { responseCode?: number };
  } catch {
    // not JSON, fall back to HTTP status
  }
  const actual = body.responseCode ?? response.status();
  expect(actual, `Expected status ${expected} but got ${actual}`).toBe(expected);
}

export async function assertResponseBody(
  body: Record<string, unknown>,
  key: string,
  value: unknown
): Promise<void> {
  expect(body[key], `Expected body.${key} to be "${value}" but got "${body[key]}"`).toBe(value);
}

export async function assertPageTitle(page: Page, expected: string): Promise<void> {
  const title = await page.title();
  expect(title).toContain(expected);
}

export async function assertElementVisible(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

export async function assertTextContains(
  page: Page,
  selector: string,
  text: string
): Promise<void> {
  await expect(page.locator(selector)).toContainText(text);
}
