const { expect } = require('@playwright/test');
class LoginPageObj
{
    //LoginPage locators
    constructor(page)
    {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginbutton = page.getByRole('button',{name: 'Login'});
    }

    // Launch the application
    async launchUrl(url)
    {
        await this.page.goto(url);
    }

    // Perform login and validate title
    async loginWithValidCredentials(homepagetitle,Username,Password)
    {           
         //verify the title of the page
        await expect(this.page).toHaveTitle(homepagetitle);

        //Enter the username
        await this.username.fill(Username);
        
        //enter the password
        await this.password.fill(Password);
        
        //Click the login button;
        await this.loginbutton.click();
    }

}
module.exports = {LoginPageObj};