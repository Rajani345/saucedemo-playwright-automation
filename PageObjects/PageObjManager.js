const { OrderConfirmationPageObj } = require('./OrderConfirmationPageObj');
const { CartPageObj } = require('./CartPageObj');
const {LoginPageObj} = require('./LoginPageObj');
const {ProductsPageObj} = require('./ProductsPageObj');
const {CustomerPageObj} = require('./CustomerPageObj');
const {OverviewPageObj} = require('./OverviewPageObj');

class PageObjManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPageObj(page);
        this.productsPage = new ProductsPageObj(page);
        this.cartPage = new CartPageObj(page);
        this.customerPage = new CustomerPageObj(page);
        this.overviewPage = new OverviewPageObj(page);
        this.orderConfirmationPage = new OrderConfirmationPageObj(page);
    }
    getloginPage()
    {
        return this.loginPage;
    }

    getproductsPage()
    {
        return this.productsPage;
    }

    getcartPage()
    {
        return this.cartPage;
    }

    getcustomerPage()
    {
        return this.customerPage;
    }

    getoverviewPage()
    {
        return this.overviewPage;
    }

    getorderConfirmationPage()
    {
        return this.orderConfirmationPage;
    }
}

module.exports = {PageObjManager};