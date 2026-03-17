const env = process.env.ENV ?? 'dev';

let cfg: { baseUrl: string; apiBaseUrl: string; headless: boolean };

if (env === 'staging') {
  cfg = require('./env.staging').config;
} else {
  cfg = require('./env.dev').config;
}

export const config = cfg;
