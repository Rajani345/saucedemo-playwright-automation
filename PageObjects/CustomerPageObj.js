const { expect } = require('@playwright/test');
class CustomerPageObj
{
    constructor(page)
    {
        this.page = page;
        this.customerTitle = page.locator('.title');
        this.firstName = page.getByPlaceholder('First Name')
        this.lastName = page.getByPlaceholder('Last Name')
        this.zipcode = page.locator("[name='postalCode']")
        this.continueButton = page.getByRole('button',{name:'Continue'})

    }
    async fillCustomerDetailsAndClickContinue(FirstName,LastName,zipcode)
    {
        // Verify the page title
        await expect(this.customerTitle).toContainText('Checkout: Your Information');

        // Fill customer details
        await this.firstName.fill(FirstName);      
        await this.lastName.fill(LastName);
        await this.zipcode.fill(zipcode);

        //Click on Continue button
        await this.continueButton.click();
    }
}
module.exports = {CustomerPageObj};