const { expect } = require('@playwright/test');
class CartPageObj
{
    constructor(page)
    {
        this.page = page;
        this.cartTitle = page.locator('.title')
        this.checkoutButton = page.getByRole('button',{name :'Checkout'})
    }

    async verifyProductInCartAndClickCheckout(productNamesArray)
    {
        //verify the cart page
        await expect(this.cartTitle).toHaveText('Your Cart');
   
        // Loop through the expected product names and verify each one is visible in the cart
        for (const productName of productNamesArray)
        {
            //verify the product in cart page
            const cartproduct = this.page.locator('.inventory_item_name', { hasText: productName });
            await expect(cartproduct).toBeVisible();
        }       
        
        //Click on the checkout button
        await this.checkoutButton.click();
    }
}
module.exports = {CartPageObj};