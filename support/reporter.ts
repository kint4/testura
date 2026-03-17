import { AllureRuntime } from 'allure-js-commons';
import { CucumberJSAllureFormatter } from 'allure-cucumberjs';

export default class AllureReporter extends CucumberJSAllureFormatter {
  constructor(options: object) {
    super(options, new AllureRuntime({ resultsDir: './allure-results' }), {});
  }
}
