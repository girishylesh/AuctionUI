import { AppPage } from './app.po';
import { by, element } from 'protractor';

describe('e-auction-project tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have title E-Auction', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('E-Auction');
  });

  it('check for login failure', () => {
    page.navigateToLogin();
    element(by.id('userId')).sendKeys('test');
    element(by.id('userPassword')).sendKeys('test123');
    element(by.css("button[type = 'submit']")).click();
    expect(page.getSnackBarText()).toContain('Could not connect to backend server');
  });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
