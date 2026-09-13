const { test, expect } = require("@playwright/test");

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li"); // 'div li' accurately grabs cart list items
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.getByRole('button', { name: 'Checkout' });
    }

    async VerifyProductIsDisplayed(productName) {
        // Wait for the cart items to be rendered on the page
        await this.cartProducts.first().waitFor(); 
        
        // Clean call to your helper locator method
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async Checkout() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        // Removed async here because it just returns a locator instance natively
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}

module.exports = { CartPage };