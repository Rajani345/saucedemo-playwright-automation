Feature: Error Validation
    @Validation
  Scenario Outline: Login Validation
    Given I am logged into the application with "<Username>" and password "<Password>"
    Then Verify error messge validation

    Examples: 
    |Username     | Password   |
    |standar_user |secre_sauce |
    |error_user   |wrongpasswo |