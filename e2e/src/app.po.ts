import { browser, by, element, promise, until } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToLogin() {
    return browser.get(`${browser.baseUrl}login`) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.app-label')).getText() as Promise<string>;
  }

 async getSnackBarText(): promise.Promise<string> {
    const snackbar = browser.driver.wait(until.elementLocated(by.css('.mat-simple-snackbar')), 30000);
    return await snackbar.getText();
  }
}
