Feature: Shoot Around Regression

  Scenario: Able to save a Shoot Around
    Given I wait for 2000 milliseconds
    Given I tap on "floating-action-button"
    Given I tap on "Add Shoot Around" text
    Given I wait for 2000 milliseconds
    Given I tap on the basketball court
    Given I set the "total-attempts-text-input" text input with value 10
    Given I set the "made-attempts-text-input" text input with value 8
    Given I tap on "Save" text
    Then I expect "Saved successfully" text is visible on the screen
    Given I tap on "go-back"

  Scenario: Able to filter in Dashboard
    Given I tap on "Filters" text
    Given I wait for 1000 milliseconds
    Given I tap on "date-range-picker"
    Given I tap on "Apply" text
    Given I tap on "Week" text
    Given I tap on "Midrange left wing" text
    Given I tap on "Filters" text
    Given I wait for 1000 milliseconds
    Then I except "android.widget.HorizontalScrollView" view type exists