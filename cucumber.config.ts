export default {
  default: {
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'step-definitions/**/*.ts',
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      ['allure-cucumberjs/reporter', { resultsDir: 'allure-results' }],
    ],
    paths: ['features/**/*.feature'],
    publishQuiet: true,
  },
};
