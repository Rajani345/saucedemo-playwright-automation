const{Given, When, Then,setDefaultTimeout} = require('@cucumber/cucumber')
const {expect} = require('@playwright/test')
const {playwright} = require('@playwright/test')
const {PageObjManager} = require('../../PageObjects/PageObjManager');

setDefaultTimeout(100000);

Given('I am logged into the application with valid credentials',async function(dataTable)
{       
    const Credential = dataTable.rowsHash();
    // ===== Login Step =====
    const loginPage = this.poManager.getloginPage();
    await loginPage.launchUrl(Credential.url);
    await loginPage.loginWithValidCredentials(Credential.homePage_Title,Credential.username,Credential.password);
});
When('I add the following products to the cart', async function(dataTable)
{
    const product_name = dataTable.raw().slice(1).map(row => row[0].trim().replace(/"/g, ''))     // list of product names
    //dataTable.raw().slice(1).map(row => row[0].trim().replace(/"/g, ''))
     // ===== Products Page Step ===== 

        const productsPage = this.poManager.getproductsPage();
        await productsPage.searchAndAddMultipleProductsToCart(product_name);
        await productsPage.verifyAndGoToCart(product_name.length.toString());
});
Then('I should see the following products in the cart',async function(dataTable)
{
    const product_name = dataTable.raw().slice(1).map(row => row[0].trim()); // list of product names, skipping header
     // ===== Cart Page Step =====
        const cartPage = this.poManager.getcartPage();
        await cartPage.verifyProductInCartAndClickCheckout(product_name);
});
When ('I enter the customer details',async function(dataTable)
{
    const cust_Data = dataTable.rowsHash();     // list of product names
    // ===== Customer Info Step =====
        const customerPage = this.poManager.getcustomerPage();
        await customerPage.fillCustomerDetailsAndClickContinue(cust_Data.first_name,cust_Data.last_name,cust_Data.postal_code)
});
Then('I should see the correct products on the overview page', async function(dataTable)
{
     const product_name = dataTable.raw().slice(1).map(row => row[0].trim()); // list of product names, skipping header
    // ===== Overview Page Step =====
        const overviewPage = this.poManager.getoverviewPage();
        await overviewPage.verifyProductinOverviewPageandClickFinish(product_name)
});
Then('I place the order successfully',async function(dataTable)
{
    const Confirm_Data = dataTable.rowsHash();
    // ===== Order Confirmation Step =====
        const orderConfirmationPage = this.poManager.getorderConfirmationPage();
        await orderConfirmationPage.verifyOrderConfirmMessage(Confirm_Data.Order_Confirmation_Msg)
});


 Given('I am logged into the application with {string} and password {string}', async function (Username, Password) {
    this.username = this.page.getByPlaceholder('Username');
    this.password = this.page.getByPlaceholder('Password');
    this.loginbutton = this.page.getByRole('button',{name: 'Login'});
     
    await this.page.goto("https://www.saucedemo.com/");
     //verify the title of the page
    await expect(this.page).toHaveTitle("Swag Labs");

    //Enter the username
    await this.username.fill(Username);
    
    //enter the password
    await this.password.fill(Password);
    
    //Click the login button;
    await this.loginbutton.click();
});
         
Then('Verify error messge validation', async function () {
    // Write code here that turns the phrase above into concrete actions
    const erromsg = this.page.locator("[data-test='error']")
    // Wait for error message to be visible
    await erromsg.waitFor({ state: 'visible', timeout: 5000 });

    console.log(await erromsg.textContent());
    await expect(erromsg).toContainText("Username and password do not match");
});