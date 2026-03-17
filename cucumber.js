module.exports = {
  default: {
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'step-definitions/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter',
    ],
    paths: ['features/**/*.feature'],
    timeout: 30000,
    retry: 1,
  },
};
