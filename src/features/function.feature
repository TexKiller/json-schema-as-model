Feature: Model function with arguments and return

  Use JSON Schema to model function with arguments and return

  Scenario: Undefined schemas

    When function is modeled without schemas
    Then no error is thrown
    And function is returned

  Scenario Outline: Invalid argument schemas: <arguments>

    When function is modeled receiving <arguments>, returning <return>
    Then error is thrown with message "Invalid function arguments schema"

    Examples: Invalid argument schemas
      | arguments      | return |
      | invalid schema | string |

  Scenario Outline: Invalid return schema: <return>

    When function is modeled receiving <arguments>, returning <return>
    Then error is thrown with message "Invalid function return schema"

    Examples: Invalid return schema
      | arguments | return         |
      | string    | invalid schema |

  Scenario Outline: Valid schemas, invalid data: <values>

    Given function is modeled receiving <arguments>, returning <return>
    When function is called passing <values>, returning <value>
    Then error is thrown with message "<message>"

    Examples: Valid schemas, invalid data
      | arguments                            | return                               | values                           | value                            | message                       |
      | string                               | string                               | object                           | string                           | Invalid function arguments    |
      | string                               | string                               | string                           | object                           | Invalid function return value |
      | string and number                    | string                               | string and string                | string                           | Invalid function arguments    |
      | string and number                    | string                               | string and number                | object                           | Invalid function return value |
      | object without additional properties | object without additional properties | object with two properties       | object                           | Invalid function arguments    |
      | object without additional properties | object without additional properties | object                           | object with two properties       | Invalid function return value |
      | object with required property        | object with required property        | object without required property | object                           | Invalid function arguments    |
      | object with required property        | object with required property        | object                           | object without required property | Invalid function return value |

  Scenario Outline: Valid schemas, valid data: <values>

    Given function is modeled receiving <arguments>, returning <return>
    When function is called passing <values>, returning <value>
    Then no error is thrown

    Examples: Valid schemas, valid data
      | arguments                            | return                               | values            | value  |
      | string                               | string                               | string            | string |
      | string and number                    | string                               | string and number | string |
      | object without additional properties | object without additional properties | object            | object |
      | object with required property        | object with required property        | object            | object |