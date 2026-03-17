@ui @regression
Feature: Shopping Cart

  @P2
  Scenario: User adds a product to the cart
    Given I am on the products page
    When I add the first product to the cart
    And I navigate to the cart
    Then the cart should contain 1 item

  @P2
  Scenario: User removes a product from the cart
    Given I am on the products page
    When I add the first product to the cart
    And I navigate to the cart
    When I remove the item from the cart
    Then the cart should be empty
