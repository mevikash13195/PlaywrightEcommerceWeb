class LoginPage{
    constructor(page){
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password){
        await this.username.type(username);
        await this.password.type(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};