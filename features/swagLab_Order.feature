Feature: Swaglab Order Process Validation
  @Regression
  Scenario: Successful Order Creation
    Given I am logged into the application with valid credentials
     | url            | https://www.saucedemo.com/ |               
     | homePage_Title | Swag Labs                  | 
     | username       | standard_user              |
     | password       | secret_sauce               |
    When I add the following products to the cart
      | product_name      |
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    Then I should see the following products in the cart
      | product_name       |
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    When I enter the customer details
      | first_name  | Rajani   |
      | last_name   | Rithvin  |
      | postal_code | 12345    |
    Then I should see the correct products on the overview page
      | product_name       |
      | Sauce Labs Backpack |
      | Sauce Labs Bike Light |
    Then I place the order successfully
      |Order_Confirmation_Msg | Thank you for your order|
      