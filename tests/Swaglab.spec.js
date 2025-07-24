import {test,expect} from '@playwright/test';
const {PageObjManager} = require('../PageObjects/PageObjManager');
// Load test data (must be an array of objects in the JSON file)
const SwagTestData = JSON.parse(JSON.stringify(require("../Testdata/SwagTestData.json")));

//Loop over each test data object to create a data-driven test
for(const testdata of SwagTestData)
{
    test (`Swaglab Order creation for ${testdata.productNamesArray}`, async({page})=>{
        //Initialize Page Object Manager for the test
        const poManager = new PageObjManager(page); 
        
        // ===== Login Step =====
        const loginPage = poManager.getloginPage();
        await loginPage.launchUrl(testdata.url);
        await loginPage.loginWithValidCredentials(testdata.homepagetitle,testdata.Username,testdata.Password);
        
        // ===== Products Page Step ===== 
        const productsPage = poManager.getproductsPage();
        await productsPage.searchAndAddMultipleProductsToCart(testdata.productNamesArray);
        await productsPage.verifyAndGoToCart(testdata.productNamesArray.length.toString());
        
        // ===== Cart Page Step =====
        const cartPage = poManager.getcartPage();
        await cartPage.verifyProductInCartAndClickCheckout(testdata.productNamesArray);
        
        // ===== Customer Info Step =====
        const customerPage = poManager.getcustomerPage();
        await customerPage.fillCustomerDetailsAndClickContinue(testdata.FirstName,testdata.LastName,testdata.zipcode)
        
        // ===== Overview Page Step =====
        const overviewPage = poManager.getoverviewPage();
        await overviewPage.verifyProductinOverviewPageandClickFinish(testdata.productNamesArray)
        
        // ===== Order Confirmation Step =====
        const orderConfirmationPage = poManager.getorderConfirmationPage();
        await orderConfirmationPage.verifyOrderConfirmMessage(testdata.Order_Confirmation_Msg)    

    })
}