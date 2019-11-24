Feature: Model object

  Use JSON Schema to model object

  Scenario: Undefined schema

    Given object is modeled without schema
    When object is initialized with "object"
    Then no error is thrown
    And object is returned

  Scenario Outline: Invalid object schema: <schema>

    When object is modeled as <schema>
    Then error is thrown with message "Invalid schema"

    Examples: Invalid object schemas
      | schema         |
      | invalid schema |

  Scenario Outline: Valid object schema, invalid object: <object>

    Given object is modeled as <schema>
    When object is initialized with <object>
    Then error is thrown with message "Invalid value"

    Examples: Valid object schemas, invalid objects
      | schema                               | object                           |
      | object without additional properties | object with two properties       |
      | object with required property        | object without required property |
      | object with method                   | object with wrong method         |

  Scenario Outline: Valid object schema, valid object: <object>

    Given object is modeled as <schema>
    When object is initialized with <object>
    Then no error is thrown
    And proxy is returned

    Examples: Valid object schemas, valid objects
      | schema                               | object                     |
      | object without additional properties | object                     |
      | object with required property        | object with two properties |
      | object with method                   | object with method         |