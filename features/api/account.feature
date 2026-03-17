@api @regression
Feature: Account Management API

  @P1
  Scenario: Create new account returns User created
    Given I have an API request context
    And I have new user account details
    When I create a new account via API
    Then the response status code should be 201
    And the account response message should be "User created!"

  @P1
  Scenario: Update account returns User updated
    Given I have an API request context
    And I have new user account details
    When I create a new account via API
    And I update the account via API
    Then the response status code should be 200
    And the account response message should be "User updated!"

  @P1
  Scenario: Delete account returns Account deleted
    Given I have an API request context
    And I have new user account details
    When I create a new account via API
    And I delete the account via API
    Then the response status code should be 200
    And the account response message should be "Account deleted!"

  @P1
  Scenario: Get user detail by email returns user object
    Given I have an API request context
    And I have new user account details
    When I create a new account via API
    And I request user details by email
    Then the response status code should be 200
    And the user detail response should contain the email
