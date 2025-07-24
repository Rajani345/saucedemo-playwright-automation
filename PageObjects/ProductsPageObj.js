const { expect } = require('@playwright/test');
class ProductsPageObj
{
    constructor(page)
    {
        this.prodTitle  = page.locator('.title');
        this.prodItems  = page.locator('.inventory_item');
        this.prodNames  = page.locator('.inventory_item_name ');
        this.cartBadge  = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async searchAndAddMultipleProductsToCart(productNamesArray)
    {
        
        // Verify navigation to product page
        await expect(this.prodTitle).toHaveText('Products');
        
        //count and get all the products
        const prodCount = await this.prodItems.count();
        console.log(await this.prodNames.allTextContents());
        await console.log("Products Count; ",prodCount);
        
             // Loop through products and add the matching product
            for (let i=0;i<prodCount;i++)
            {
                //if expected product is actual prod
                const prodname  = await this.prodItems.nth(i).locator('.inventory_item_name ').textContent();
                if (productNamesArray.includes(prodname))
                {
                    //get the product price
                    const Prod_price = await this.prodItems.nth(i).locator('.inventory_item_price').textContent();
                    await console.log("Selected product price:",Prod_price)
                    //add product to cart
                    await this.prodItems.nth(i).locator("button:has-text('Add to cart')").click();
               
                }
        
            } 

    }


    async verifyAndGoToCart(expectedCount)
    {
        // Only check badge count if provided
        if (expectedCount !== undefined) {
            await expect(this.cartBadge).toHaveText(expectedCount);
        }
            //Click on the cart icon
            await this.cartLink.click();
    }
}
module.exports = {ProductsPageObj};