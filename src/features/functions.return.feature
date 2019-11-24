Feature: Model function return type

  Use JSON Schema to model function return types

  Scenario: Undefined schema

    When function is modeled receiving "string"
    Then no error is thrown
    And function is returned

  Scenario Outline: Invalid return schemas: <return>

    When function is modeled returning <return>
    Then error is thrown with message "Invalid function return schema"

    Examples: Invalid return schemas
      | return         |
      | invalid schema |

  Scenario Outline: Valid return schemas, invalid returned data: <value>

    Given function is modeled returning <return>
    When function is called returning <value>
    Then error is thrown with message "Invalid function return value"

    Examples: Valid return schemas, invalid returned data
      | return                               | value                            |
      | string                               | object                           |
      | object without additional properties | object with two properties       |
      | object with required property        | object without required property |

  Scenario Outline: Valid return schemas, valid returned data: <value>

    Given function is modeled returning <return>
    When function is called returning <value>
    Then no error is thrown

    Examples: Valid return schemas, valid returned data
      | return                               | value                      |
      | string                               | string                     |
      | object without additional properties | object                     |
      | object with required property        | object with two properties |