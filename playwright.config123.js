// @ts-check
const {devices } =require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './Rajani',
  retries: 1,       // Give failing tests 1 or 2... retry attempt
  //workers: 1,       //run test using 1 workers
  timeout: 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /* Configure projects for major browsers */
  projects: [
    {
      name:'Webkit',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'on',
        ...devices['iPhone 12']
      }     
    },
    {
      name:'Chrome',
      use: {
        browserName: 'chromium',
        headless: false, //false
        screenshot: 'on', //off
        video:'retain-on-failure', //retain-on-failure, on, off, on-first-retry
        trace: 'on',      //off, on-first-retry, retain-on-failure, on-all-retries
        ignoreHttpsErrors:true, //Handles ssl certificate error
        permissions:['geolocation'] //Handles 
        //viewport: {width:1020, height:720} //browser size
      }     
    },
  ]  
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};
module.exports = config;
