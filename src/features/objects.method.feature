Feature: Model objects methods

  Use JSON Schema to model objects methods

  Scenario Outline: Valid schema, invalid arguments: <arguments>

    Given object is modeled as "object with method"
    And object is initialized with "object with method"
    When method is called passing <arguments>
    Then error is thrown with message "Invalid function arguments"

    Examples: Invalid arguments
      | arguments         |
      | number            |
      | string and string |
      | object            |

  Scenario Outline: Valid schema, invalid return: <object>

    Given object is modeled as "object with method"
    And object is initialized with <object>
    When method is called passing "string and number"
    Then error is thrown with message "Invalid function return value"

    Examples: Objects with methods returning invalid value
      | object                                 |
      | object with method returning number    |
      | object with method returning object    |
      | object with method returning undefined |