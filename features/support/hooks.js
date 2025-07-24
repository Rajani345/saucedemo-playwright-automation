const playwright = require('@playwright/test')
const {Before, After, Status, BeforeStep, AfterStep, BeforeAll} = require('@cucumber/cucumber');
const {PageObjManager} = require('../../PageObjects/PageObjManager');
const { chromium } = require('@playwright/test');

BeforeAll({tags:"@Validation"}, function()
{
    console.log("Before all hook executed when validation tag is used");
})
Before(async function()
{
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    //Initialize Page Object Manager for the test
    this.poManager = new PageObjManager(this.page); 
})

BeforeStep(function()
{
    console.log('hook executed before each cucumber step');
})

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});

AfterStep( async function({result})
{
    if(result.status === Status.FAILED)
    {
       const screenshot = await this.page.screenshot({ path: `reports/screenshots/${Date.now()}.png`, fullPage: true });
       // Attach screenshot to the cucumber JSON
        this.attach(screenshot, 'image/png');
    }
})