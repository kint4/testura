@api @regression
Feature: Brands API

  @P2
  Scenario: Get all brands returns 200 and non-empty list
    Given I have an API request context
    When I send a GET request to the brands list
    Then the response status code should be 200
    And the brands list should not be empty

  @negative @P2
  Scenario: PUT to brandsList returns 405
    Given I have an API request context
    When I send a PUT request to the brands list
    Then the response status code should be 405
