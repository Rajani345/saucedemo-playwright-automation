const { expect } = require('@playwright/test');
class OrderConfirmationPageObj
{
    constructor(page)
    {
        this.page = page;
        this.completeTitle = page.locator('.title')
        this.confirmMessage = page.locator("h2.complete-header")
    }
    async verifyOrderConfirmMessage(Order_Confirmation_Msg)
    {
        //verify the Checkout: Complete! page
        await expect(this.completeTitle).toContainText('Checkout: Complete');
        //verify the order confirmation message
        await expect(this.confirmMessage).toContainText(Order_Confirmation_Msg);
    }
    
}
module.exports = {OrderConfirmationPageObj}