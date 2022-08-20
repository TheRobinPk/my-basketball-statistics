Feature: Shoot Around Regression

  Scenario: Able to save a Shoot Around
    Given I wait for 1000 milliseconds
    When I tap on "floating-action-button"
    And I tap on "Add Shoot Around" text
    Given I wait for 1000 milliseconds
    When I tap on the basketball court
    And I set the "total-attempts-text-input" text input with value 10
    And I set the "made-attempts-text-input" text input with value 8
    And I tap on "Save" text
    Then I expect "Saved successfully" text is visible
    Given I wait for 1000 milliseconds
    And I tap on "go-back"

  Scenario: Able to filter in Dashboard
    Given I wait for 1000 milliseconds
    Then I expect "No result found for the selected search criteria!" text is visible
    When I tap on "Filters" text
    Given I wait for 1000 milliseconds
    When I tap on "date-range-picker"
    And I tap on "Apply" text
    And I tap on "Week" text
    And I tap on "Midrange left wing" text
    And I tap on "Filters" text
    Given I wait for 1000 milliseconds
    Then I except "android.widget.HorizontalScrollView" view type exists

  Scenario: Able to manage Shoot Arounds
    Given I wait for 1000 milliseconds
    When I tap on "menu"
    And I tap on "Shoot Arounds" text
    Given I wait for 1000 milliseconds
    Then I expect "Showing 1 - 1 of 1" text is visible
    When I tap on "delete"
    Given I wait for 1000 milliseconds
    Then I expect "Are you sure you want to delete the Shoot Around?" text is visible
    When I tap on "Cancel" text
    Given I wait for 1000 milliseconds
    When I tap on "delete"
    And I tap on "Delete" text
    Given I wait for 1000 milliseconds
    Then I expect "No results found" text is visible