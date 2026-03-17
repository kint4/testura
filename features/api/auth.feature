@api
Feature: Login Verification API

  @smoke @P1
  Scenario: Verify login with valid credentials returns User exists
    Given I have an API request context
    And I have valid user credentials
    When I verify login with the provided credentials
    Then the response status code should be 200
    And the response message should be "User exists!"

  @regression @negative @P2
  Scenario: Verify login with missing email returns 400
    Given I have an API request context
    When I verify login without providing an email
    Then the response status code should be 400

  @regression @negative @P2
  Scenario: Verify login with missing password returns 400
    Given I have an API request context
    When I verify login without providing a password
    Then the response status code should be 400

  @regression @negative @P2
  Scenario: Verify login with invalid credentials returns User not found
    Given I have an API request context
    And I have invalid user credentials
    When I verify login with the provided credentials
    Then the response status code should be 404
    And the response message should be "User not found!"
