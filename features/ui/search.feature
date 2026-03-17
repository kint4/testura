@ui @regression
Feature: Product Search UI

  @P2
  Scenario: User searches for a product and sees results
    Given I am on the products page
    When I search for "dress"
    Then I should see search results
    And all results should be related to "dress"
