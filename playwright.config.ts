import { config } from './config';

export const playwrightConfig = {
  baseURL: config.baseUrl,
  browserName: 'chromium' as const,
  headless: process.env.HEADLESS !== 'false' && config.headless,
  viewport: { width: 1280, height: 720 },
  screenshot: 'only-on-failure' as const,
  video: 'retain-on-failure' as const,
};
