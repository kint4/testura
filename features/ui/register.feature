@ui
Feature: User Registration

  @smoke @P1
  Scenario: New user registers successfully
    Given I am on the registration page
    When I enter my name and email for signup
    And I fill in the account details
    And I submit the registration form
    Then I should see the account created confirmation
