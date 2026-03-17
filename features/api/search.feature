@api
Feature: Search Product API

  @smoke @P1
  Scenario: Search product with valid keyword returns matching results
    Given I have an API request context
    When I search for a product with keyword "dress"
    Then the response status code should be 200
    And the search results should contain products matching "dress"

  @regression @negative @P2
  Scenario: Search product with missing parameter returns 400
    Given I have an API request context
    When I search for a product without providing a keyword
    Then the response status code should be 400
