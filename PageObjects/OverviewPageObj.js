const { expect } = require('@playwright/test');
class OverviewPageObj
{
    constructor(page)
    {
        this.page = page;
        this.overViewTitle = page.locator('.title');
        this.finishButton = page.getByRole('button',{name :'Finish'});
        
    }
   async verifyProductinOverviewPageandClickFinish(productNamesArray)
    {
         // Verify the Checkout: Overview page title is visible
        await expect(this.overViewTitle ).toContainText('Checkout: Overview');
        
         // Verify each product is listed on the page
        for(const productName of productNamesArray)
        {
            //verify the product in  Checkout: Overview page
            const Overviewproduct = this.page.locator('.inventory_item_name', { hasText: productName });;
            await expect(Overviewproduct).toBeVisible();
        }
        // Click on the Finish button to complete
        await this.finishButton.click();
    }
 
}
module.exports = {OverviewPageObj};