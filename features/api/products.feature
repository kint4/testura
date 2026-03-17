@api
Feature: Products API

  @smoke @P1
  Scenario: Get all products returns 200 and non-empty list
    Given I have an API request context
    When I send a GET request to the products list
    Then the response status code should be 200
    And the products list should not be empty

  @regression @negative @P2
  Scenario: POST to productsList returns 405
    Given I have an API request context
    When I send a POST request to the products list
    Then the response status code should be 405
