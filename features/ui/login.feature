@ui
Feature: User Login

  @smoke @P1
  Scenario: User logs in with valid credentials
    Given I am on the login page
    When I enter valid login credentials
    Then I should be logged in successfully

  @regression @negative @P2
  Scenario: User sees error with invalid credentials
    Given I am on the login page
    When I enter invalid login credentials
    Then I should see a login error message
