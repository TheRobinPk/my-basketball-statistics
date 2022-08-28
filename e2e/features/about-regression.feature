Feature: About Regression

  Scenario: Able to navigate to About screen
    Given I wait for 1000 milliseconds
    When I tap on "menu"
    And I tap on "About" text
    Given I wait for 1000 milliseconds
    Then I expect "Privacy Policy" text is visible
    Then I expect "Terms and Conditions" text is visible
    Then I expect "Third Party Licenses" text is visible