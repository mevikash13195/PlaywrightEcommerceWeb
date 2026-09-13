const {When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
let browser;

Given('I login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {  
    // Write code here that turns the phrase above into concrete actions
  browser = await playwright.chromium.launch({ 
    headless: false, 
    slowMo: 1000,                 // 🐌 Adds 1 second (1000ms) delay between steps so you can watch it
    args: ['--start-maximized']  // 🖥️ Makes the physical window open completely full screen
   });
  const context = await browser.newContext({
      viewport: null      
  });
  const page = await context.newPage();
  this.poManager = new POManager(page);
  const products = page.locator(".card-body");
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When('I add {string} to the cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('I verify {string} is displayed in the cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.cartPage = this.poManager.getCartPage();
  await this.cartPage.VerifyProductIsDisplayed(productName);
  await this.cartPage.Checkout();
});

When('I proceed to checkout and place the order', async function () {
  // Write code here that turns the phrase above into concrete actions
    this.ordersReviewPage = this.poManager.getOrderReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('I verify order in order history', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();

  await browser.close();
});