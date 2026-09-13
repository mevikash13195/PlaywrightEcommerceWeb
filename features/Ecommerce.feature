Feature: Ecommerce validations

Scenario: Placing the order
    Given I login to Ecommerce application with "<username>" and "<password>"
    When I add "ZARA COAT 3" to the cart
    Then I verify "ZARA COAT 3" is displayed in the cart
    When I proceed to checkout and place the order
    Then I verify order in order history

    Examples:
      | username                    | password  |
      | urmailvikas139@gmail.com    | Test@123  |