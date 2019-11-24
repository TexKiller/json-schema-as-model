Feature: Model function arguments

  Use JSON Schema to model function arguments

  Scenario: Undefined schema

    When function is modeled returning "string"
    Then no error is thrown
    And function is returned

  Scenario Outline: Invalid argument schemas: <arguments>

    When function is modeled receiving <arguments>
    Then error is thrown with message "Invalid function arguments schema"

    Examples: Invalid argument schemas
      | arguments      |
      | invalid schema |

  Scenario Outline: Valid argument schemas, invalid data: <arguments>

    Given function is modeled receiving <arguments>
    When function is called passing <values>
    Then error is thrown with message "Invalid function arguments"

    Examples: Valid argument schemas, invalid data
      | arguments                            | values                           |
      | string                               | object                           |
      | object with required property        | string and string                |
      | object without additional properties | object with two properties       |
      | object with required property        | object without required property |

  Scenario Outline: Valid argument schemas, valid data: <arguments>

    Given function is modeled receiving <arguments>
    When function is called passing <values>
    Then no error is thrown

    Examples: Valid argument schemas, valid data
      | arguments                            | values                     |
      | string                               | string                     |
      | string and number                    | string and number          |
      | object without additional properties | object                     |
      | object with required property        | object with two properties |